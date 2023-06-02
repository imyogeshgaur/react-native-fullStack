import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {getDetailsApi, updateDetailsApi} from '../constants/CONSTANTS';

const HomeScreen = () => {
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('');
  const navigator: any = useNavigation();
  const routers: any = useRoute();
  const token = routers.params.tokenParam;
  useEffect(() => {
    if (token) {
      axios
        .get(getDetailsApi, {
          headers: {
            Authorization: token as string,
          },
        })
        .then(res => {
          setUserName(res.data.user.userName);
          setUserEmail(res.data.user.userEmail);
          setUserPassword(res.data.user.userPassword);
          setUserRole(res.data.user.userRole);
        })
        .catch(err => console.log(err));
    }
  }, []);

  const editUserDetails = async () => {
    try {
      const response = await axios.put(
        updateDetailsApi,
        {
          userName,
          userEmail,
          userPassword,
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
  };

  const navigateToSeeUser = ()=>{
    navigator.navigate("Admin",{tokenData:token})
  }

  const logoutUser = async () => {
    navigator.goBack();
    await AsyncStorage.removeItem('token');
  };
  return (
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
        secureTextEntry={true}
        value={userPassword}
        onChangeText={setUserPassword}
      />
      <View style={styles.btnContainer}>
        {userRole === 'Admin' ? (
          <>
            <TouchableOpacity
              style={styles.seeDetailsButton}
              onPress={navigateToSeeUser}>
              <Text style={styles.buttonText}>Get Users</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={editUserDetails}>
              <Text style={styles.buttonText}>Edit Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={logoutUser}>
              <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={editUserDetails}>
              <Text style={styles.buttonText}>Edit Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={logoutUser}>
              <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

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
  btnContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
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
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: 100,
    marginTop: 10,
  },
  seeDetailsButton: {
    backgroundColor: 'rgb(245, 214, 42)',
    padding: 10,
    borderRadius: 5,
    width: 100,
    marginTop: 10,
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
