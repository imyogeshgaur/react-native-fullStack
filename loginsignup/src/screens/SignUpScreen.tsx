import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {signUpApi} from '../constants/CONSTANTS';

const SignUpScreen = () => {
  const navigator: any = useNavigation();
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  const signUpUser = async () => {
    try {
      const response = await axios.post(signUpApi, {
        userName,
        userEmail,
        userPassword,
      });
      const data = await response.data;
      if (data.message) {
        navigator.navigate("Login")
        ToastAndroid.show(data.message, 5000);
        setUserEmail("")
        setUserName("")
        setUserPassword("")
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
        <TouchableOpacity 
        style={styles.button}
        onPress={signUpUser}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.link}>
          Already Registered ? <> </>
          <Text onPress={() => navigator.navigate('Login')}>Login Here</Text>
        </Text>
      </View>
    </>
  );
};

export default SignUpScreen;

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
  input: {
    backgroundColor: 'rgb(219, 219, 219)',
    padding: 10,
    borderRadius: 5,
    width: 300,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'rgb(136, 53, 240)',
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  link: {
    marginTop: 10,
    marginBottom: 10,
  },
});
