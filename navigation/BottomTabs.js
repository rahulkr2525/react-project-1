import 'react-native-gesture-handler';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/Feather';
import Home from '../src/Home';
import Profile from '../src/Profile';
import ReferEarn from '../src/Refer&Earn';
import {color} from 'react-native-reanimated';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: '#001f26',
        tabBarInactiveBackgroundColor: '#001f26',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={({navigation}) => {
          return {
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <Icon3
                name="home"
                size={focused ? 27 : 24}
                style={{color: focused ? '#4cd4ca' : 'grey'}}
              />
            ),
          };
        }}
      />
      <Tab.Screen
        name="ReferEarn"
        component={ReferEarn}
        options={({navigation}) => {
          return {
            tabBarIcon: ({focused}) => (
              <Icon2
                name="slideshare"
                size={focused ? 27 : 24}
                style={{color: focused ? '#4cd4ca' : 'grey'}}
              />
            ),
          };
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={({navigation}) => {
          return {
            tabBarIcon: ({focused}) => (
              <Icon3
                name="user"
                size={focused ? 27 : 24}
                style={{color: focused ? '#4cd4ca' : 'grey'}}
              />
            ),
          };
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
