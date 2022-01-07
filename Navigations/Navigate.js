import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AntDesign } from '@expo/vector-icons';

import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import ForgotPassword from '../screens/ForgotPassword';
import Loading from '../screens/Loading';
import Home from '../screens/Home';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Profile from '../screens/Profile';
import OrderDetails from '../screens/OrderDetails';
import OrderScreen from '../screens/OrderScreen';
import UploadProducts from '../screens/UploadProducts';

const Stack1 = createStackNavigator();

const OrderStack = () => { 
  return (
    <Stack1.Navigator screenOptions={{ headerShown: false }}>
      <Stack1.Screen name="OrderScreen" component={OrderScreen} />
      <Stack1.Screen name="OrderDetails" component={OrderDetails} />
    </Stack1.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();

const TabContent = () => {
  return (
    <Tab.Navigator
    initialRouteName="Home" 
  activeColor="#f0edf6"
  inactiveColor="#3e2465" 
  labeled={true}
  barStyle={{ backgroundColor: '#EB8430' }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            return <Ionicons name={'home'} size={20} color={color} />;
          } else if (route.name === 'OrderScreen') {
            iconName = focused ? 'information' : 'information-outline'; 
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'UploadProducts') {
            return <AntDesign name="pluscircleo" size={20} color={color} />
          }

          return <Ionicons name={iconName} size={20} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
      />
      <Tab.Screen
        name="UploadProducts" 
        component={UploadProducts}
      />
      <Tab.Screen
        name="OrderScreen"
        component={OrderStack}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen
        name="Loading"
        component={Loading}
        options={{ headerShown: false }}
      /> 
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
        <Stack.Screen 
        name="Home"
        component={TabContent}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;

