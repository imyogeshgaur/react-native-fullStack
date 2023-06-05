import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import AdminScreen from '../screens/AdminScreen';
import EditPassword from '../screens/EditPassword';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';
import CreateByAdminScreen from '../screens/CreateByAdminScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const navigator: any = useNavigation();
  const navigateToUserCreationScreen = () => {
    navigator.navigate('Create');
  };

  const logoutUser = async () => {
    navigator.goBack();
    await AsyncStorage.removeItem('token');
  };
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'User Profile',
          headerStyle: {
            backgroundColor: 'rgb(179, 124, 247)',
          },
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity onPress={logoutUser}>
              <Icon name="logout" size={26} style={{fontWeight:"bold"}} />
            </TouchableOpacity>
          ),
          headerLeft: () => <></>,
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: 'Login Here',
          headerStyle: {
            backgroundColor: 'rgb(179, 124, 247)',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Admin"
        component={AdminScreen}
        options={{
          title: 'Admin Panel',
          headerStyle: {
            backgroundColor: 'rgb(179, 124, 247)',
          },
          headerTitleAlign: 'center',
          headerRight: () => (
            <>
              <TouchableOpacity onPress={navigateToUserCreationScreen}>
                <Icon name="user" size={30}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={logoutUser}>
                <Icon name="logout" 
                size={26} 
                style={{marginLeft:10,fontWeight:"bold"}}/>
              </TouchableOpacity>
            </>
          ),
        }}
      />
      <Stack.Screen
        name="Password"
        component={EditPassword}
        options={{
          title: 'Edit Password',
          headerStyle: {
            backgroundColor: 'rgb(179, 124, 247)',
          },
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity onPress={logoutUser}>
              <Icon name="logout" size={30} style={{fontWeight:"bold"}}/>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Create"
        component={CreateByAdminScreen}
        options={{
          title: 'Create User',
          headerStyle: {
            backgroundColor: 'rgb(179, 124, 247)',
          },
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity onPress={logoutUser}>
              <Icon name="logout" size={26} style={{fontWeight:"bold"}}/>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Login">
        <Tab.Screen
          name="Login"
          component={StackNavigator}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerTitle: 'Register Here',
            headerStyle: {
              backgroundColor: 'rgb(179, 124, 247)',
            },
            headerTitleAlign: 'center',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
