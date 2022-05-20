import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';

import {Text, View, TouchableOpacity} from 'react-native';
import axios from 'axios';

import {NavigationContainer} from '@react-navigation/native';
import Home from '../src/Home';
import DrawerNavigation from './DrawerNavigation';
import AndarBahar from '../src/AndarBahar';
import LoginSignup from '../src/LoginSignUp';
import Tossgame from '../src/Tossgame';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginSignup"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Dashboard" component={DrawerNavigation} />
      <Stack.Screen name="AndarBahar" component={AndarBahar} />
      <Stack.Screen name="LoginSignup" component={LoginSignup} />
      <Stack.Screen name="Tossgame" component={Tossgame} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
