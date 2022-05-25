import 'react-native-gesture-handler';
import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {DrawerContent} from './Drawercontent';
import Wallet from '../src/Wallet';
import BottomTabs from './BottomTabs';
import StackNavigator from './StackNavigator';
import Tossgame from '../src/Tossgame';
import Parity from '../src/Parity';

const Drawer = createDrawerNavigator();

const DrawerNavigation = ({navigation, route}) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <DrawerContent navigation {...props} />}>
      <Drawer.Screen name="Parity" component={Parity} />
      <Drawer.Screen name="Tabs" component={BottomTabs} />
      <Drawer.Screen name="StackNavigator" component={StackNavigator} />
      <Drawer.Screen name="Tossgame" component={Tossgame} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
