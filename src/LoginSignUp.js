import React, {useState} from 'react';
import {dimension} from './utils';
import LinearGradient from 'react-native-linear-gradient';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const LoginSignup = () => {
  const [placeholder1, setPlaceholder1] = useState(false);
  const [placeholder2, setPlaceholder2] = useState(false);
  const [placeholder3, setPlaceholder3] = useState(false);
  const [placeholder4, setPlaceholder4] = useState(false);
  return (
    <>
      <View
        style={{
          height: dimension.height,
          width: dimension.width,
        }}>
        <LinearGradient
          colors={['#282e41', '#227880']}
          style={{
            height: dimension.height,
            width: dimension.width,
          }}>
          <View
            style={{
              height: dimension.height * 0.6,
              alignItems: 'center',
              paddingTop: dimension.height * 0.03,
            }}>
            <Text
              style={{
                fontSize: RFValue(20),
                fontWeight: 'bold',
                color: 'white',
              }}>
              SIGN UP
            </Text>
            <TextInput
              style={{
                width: dimension.width * 0.9,
                paddingLeft: 15,
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 100,
                marginTop: dimension.height * 0.02,
                color: 'white',
                borderWidth: 2,
                borderColor: placeholder1
                  ? 'rgba(22, 221, 24, 0.8)'
                  : 'rgba(22, 221, 24, 0)',
              }}
              onFocus={() => {
                setPlaceholder1(true);
              }}
              onEndEditing={() => {
                setPlaceholder1(false);
              }}
              placeholder="Name"
              placeholderTextColor="rgba(255,255,255,0.3)"
              onChangeText={val => {}}
            />
            <TextInput
              style={{
                width: dimension.width * 0.9,
                paddingLeft: 15,
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 100,
                marginTop: dimension.height * 0.02,
                color: 'white',
                borderWidth: 2,
                borderColor: placeholder2
                  ? 'rgba(22, 221, 24, 0.8)'
                  : 'rgba(22, 221, 24, 0)',
              }}
              onFocus={() => {
                setPlaceholder2(true);
              }}
              onEndEditing={() => {
                setPlaceholder2(false);
              }}
              placeholder="email"
              placeholderTextColor="rgba(255,255,255,0.3)"
              onChangeText={val => {}}
            />
            <TextInput
              style={{
                width: dimension.width * 0.9,
                paddingLeft: 15,
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 100,
                marginTop: dimension.height * 0.02,
                color: 'white',
                borderWidth: 2,
                borderColor: placeholder3
                  ? 'rgba(22, 221, 24, 0.8)'
                  : 'rgba(22, 221, 24, 0)',
              }}
              onFocus={() => {
                setPlaceholder3(true);
              }}
              onEndEditing={() => {
                setPlaceholder3(false);
              }}
              placeholder="phome no"
              placeholderTextColor="rgba(255,255,255,0.3)"
              keyboardType="number-pad"
              onChangeText={val => {}}
            />
            <TextInput
              style={{
                width: dimension.width * 0.9,
                paddingLeft: 15,
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 100,
                marginTop: dimension.height * 0.02,
                color: 'white',
                borderWidth: 2,
                borderColor: placeholder4
                  ? 'rgba(22, 221, 24, 0.8)'
                  : 'rgba(22, 221, 24, 0)',
              }}
              onFocus={() => {
                setPlaceholder4(true);
              }}
              onEndEditing={() => {
                setPlaceholder4(false);
              }}
              placeholder="password"
              placeholderTextColor="rgba(255,255,255,0.3)"
              onChangeText={val => {}}
            />
          </View>
          <View
            style={{
              height: dimension.height * 0.4,
            }}></View>
        </LinearGradient>
      </View>
    </>
  );
};

export default LoginSignup;
