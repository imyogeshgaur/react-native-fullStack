import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {signUpApi} from '../constants/CONSTANTS';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

const CreateByAdminScreen = () => {
  const navigator: any = useNavigation();
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState<Array<any>>([
    {label: 'Admin', value: 'Admin'},
    {label: 'User', value: 'User'},
  ]);

  const signUpUser = async () => {
    try {
      const response = await axios.post(signUpApi, {
        userName,
        userEmail,
        userPassword,
        userRole:value
      });
      const data = await response.data;
      if (data.message === 'User Created Successfully !!!') {
        navigator.navigate('Login');
        ToastAndroid.show(data.message, 5000);
        setUserEmail('');
        setUserName('');
        setUserPassword('');
      } else {
        ToastAndroid.show(data.message, 5000);
        setUserEmail('');
        setUserName('');
        setUserPassword('');
      }
    } catch (error) {
      ToastAndroid.show('Network Error', 5000);
      console.log('Sign Up Error : ' + error);
    }
  };
  return (
    <>
      <View style={styles.centered}>
        <Text style={styles.label}>UserName</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
        />
        <Text style={styles.emailLabel}>Email</Text>
        <TextInput
          style={styles.input}
          value={userEmail}
          onChangeText={setUserEmail}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={userPassword}
          onChangeText={setUserPassword}
          secureTextEntry={true}
        />
        <Text style={styles.roleLabel}>Role</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={styles.inputDrop}
          multiple={true}
        />
        <TouchableOpacity style={styles.button} onPress={signUpUser}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CreateByAdminScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'black',
    marginLeft: -230,
  },
  emailLabel: {
    color: 'black',
    marginLeft: -250,
  },
  roleLabel: {
    color: 'black',
    marginLeft: -270,
  },
  input: {
    backgroundColor: 'rgb(219, 219, 219)',
    padding: 10,
    borderRadius: 5,
    width: 300,
    marginTop: 10,
    marginBottom: 10,
  },
  inputDrop: {
    backgroundColor: 'rgb(219, 219, 219)',
    padding: 10,
    borderRadius: 5,
    width: 300,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 55,
  },
  button: {
    backgroundColor: 'rgb(136, 53, 240)',
    padding: 10,
    borderRadius: 5,
    width: 100,
    marginTop: 70,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
