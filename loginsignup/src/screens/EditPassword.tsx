import {View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native';
import {useState} from 'react';
import { updateDetailsApi } from '../constants/CONSTANTS';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const EditPassword = () => {
  const [userPassword, setUserPassword] = useState<string>('');
  const [userConfPassword, setUserConfPassword] = useState<string>('');
  const routers:any = useRoute();
  const token = routers.params.token;
  const setUserNewPassword = async()=>{
    if(userConfPassword !== userPassword) {
        ToastAndroid.show("Password Do Not Match !!!",5000);
        setUserPassword("")
        setUserConfPassword("")
    }
    try {
        const response = await axios.put(
          updateDetailsApi,
          {
            userPassword
          },
          {
            headers: {
              Authorization: token as string,
            },
          },
        );
        const data = await response.data;
        if (data.message) ToastAndroid.show(data.message, 5000);
      } catch (error) {
        console.log('Edit Details Error : ' + error);
      }
  }
  return (
    <View style={styles.centered}>
      <Text style={styles.label1}>Enter new Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={userPassword}
        onChangeText={setUserPassword}
      />
      <Text style={styles.label2}>Confirm new Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={userConfPassword}
        onChangeText={setUserConfPassword}
      />
      <TouchableOpacity 
      style={styles.button}
      onPress={setUserNewPassword}
      >
        <Text style={styles.buttonText}>Edit Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditPassword;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label1: {
    color: 'black',
    marginLeft: -175,
  },
  label2: {
    color: 'black',
    marginLeft: -150,
  },
  input: {
    backgroundColor: 'rgb(219, 219, 219)',
    padding: 10,
    borderRadius: 5,
    width: 300,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'rgb(136, 53, 240)',
    padding: 10,
    borderRadius: 5,
    width: 120,
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
  }
});
