import 'react-native-gesture-handler';
import React , {useEffect,useState} from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {DrawerContent} from './Drawercontent';

import BottomTabs from './BottomTabs';

import Tossgame from '../src/Tossgame';
import Parity from '../src/Parity';
import LoginSignup from '../src/LoginSignUp';
import Wallet from '../src/Wallet';


const Drawer = createDrawerNavigator();

const DrawerNavigation = ({navigation, route}) => {
  
  return (
    <Drawer.Navigator

      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <DrawerContent navigation {...props} />}>
        <Drawer.Screen name="Wallet" component={Wallet} />
        <Drawer.Screen name="Dashboard" component={BottomTabs} />
      <Drawer.Screen name="Parity" component={Parity} />
      <Drawer.Screen name="Tossgame" component={Tossgame} />
      
      
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
