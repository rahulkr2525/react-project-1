import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';

import {Text, View, TouchableOpacity} from 'react-native';
import axios from 'axios';
import Home from './src/Home';
import AndarBahar from './src/AndarBahar';
import LoginSignup from './src/LoginSignUp';
import Tossgame from './src/Tossgame';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigation from './navigation/DrawerNavigation';
import BottomTabs from './navigation/BottomTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const App = () => {
  useEffect(()=> {
    checkingUser()
  },[])
 

  const checkingUser = async () => {
    try {
      const value = await AsyncStorage.getItem('email')
      
      if(value!== null) {
        setVisible(true)
      }else{
         setVisible(false)
        }
        console.log(visible)
    } 
    

    
       catch (error) {
      
      }
  }
  const [visible , setVisible] = useState()
  return (
    <NavigationContainer>
      {visible ?( <BottomTabs />):(<DrawerNavigation />) }
     
      
    </NavigationContainer>
  );
};

export default App;
