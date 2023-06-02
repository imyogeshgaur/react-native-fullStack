import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import {NavigationContainer} from '@react-navigation/native';
import AdminScreen from '../screens/AdminScreen';
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
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
          title: 'Users Data',
          headerStyle: {
            backgroundColor: 'rgb(179, 124, 247)',
          },
          headerTitleAlign: 'center',
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
