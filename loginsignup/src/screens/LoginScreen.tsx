import {useNavigation} from '@react-navigation/native';
import {useState,useEffect} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import {loginApi} from '../constants/CONSTANTS';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigator: any = useNavigation();
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  
  const signInUser = async () => {
    try {
      const response = await axios.post(loginApi, {
        userEmail,
        userPassword,
      });
      const data = await response.data;
      if (data.token) {
        const val = await AsyncStorage.getItem("token");
        if(val==null){
          AsyncStorage.setItem('token', data.token);
        }
        navigator.navigate('Home',{tokenParam:data.token});
        setUserEmail("")
        setUserPassword("")
      } else if(data.message){
        ToastAndroid.show(data.message,5000)
        navigator.navigate('Login');
      }
    } catch (error) {
      ToastAndroid.show("Invalid Credentials !!!",5000);
      console.log('Error Of Sign In : ' + error);
    }
  };
  return (
    <>
      <View style={styles.centered}>
        <Text style={styles.emailLabel}>Email or User Name</Text>
        <TextInput
          style={styles.input}
          value={userEmail}
          onChangeText={setUserEmail}
        />
        <Text style={styles.passwordLabel}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={userPassword}
          onChangeText={setUserPassword}
        />
        <TouchableOpacity style={styles.button} onPress={signInUser}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.link}>
          New Here ?<> </>
          <Text onPress={() => navigator.navigate('SignUp')}>Sign Up Here</Text>
        </Text>
      </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailLabel: {
    color: 'black',
    marginLeft: -170,
  },
  passwordLabel: {
    color: 'black',
    marginLeft: -230,
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
