import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';

import {Text, View, TouchableOpacity} from 'react-native';
import axios from 'axios';

import {NavigationContainer} from '@react-navigation/native';

import AndarBahar from '../src/AndarBahar';
import LoginSignup from '../src/LoginSignUp';
import Parity from '../src/Parity';
import Tossgame from '../src/Tossgame';
import BottomTabs from './BottomTabs';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginSignup"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AndarBahar" component={AndarBahar} />
      <Drawer.Screen name="Parity" component={Parity} />
      <Drawer.Screen name="Tossgame" component={Tossgame} />
      <Drawer.Screen name="Dashboard" component={BottomTabs} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
