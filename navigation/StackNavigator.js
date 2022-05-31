import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';

import {Text, View, TouchableOpacity} from 'react-native';
import axios from 'axios';

import {NavigationContainer} from '@react-navigation/native';

import AndarBahar from '../src/AndarBahar';
import LoginSignup from '../src/LoginSignUp';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginSignup"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AndarBahar" component={AndarBahar} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
