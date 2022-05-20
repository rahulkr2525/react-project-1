import 'react-native-gesture-handler';
import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {DrawerContent} from './Drawercontent';
import Wallet from '../src/Wallet';
import BottomTabs from './BottomTabs';

const Drawer = createDrawerNavigator();

const DrawerNavigation = ({navigation, route}) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <DrawerContent navigation {...props} />}>
      <Drawer.Screen name="Tabs" component={BottomTabs} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
