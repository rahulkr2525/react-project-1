import React, {useState, useEffect} from 'react';
import {dimension} from './utils';
import LinearGradient from 'react-native-linear-gradient';
import {View, Text, TextInput, TouchableOpacity, Pressable,Modal} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import axios from 'axios';
import Sprinkle from "react-native-spinkit"
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginSignup = ({navigation, route}) => {
 
  const [placeholder1, setPlaceholder1] = useState(false);
  const [placeholder2, setPlaceholder2] = useState(false);
  const [placeholder3, setPlaceholder3] = useState(false);
  const [placeholder4, setPlaceholder4] = useState(false);
  const [termsColor, setTermsColor] = useState(true);
  const [signupScreen, setSignupScreen] = useState(true);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phoneno, setPhoneNo] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const logIn = async () => {
   
    setLoading(true)
    try {
      var datas = {
        email,
        password,
      };
      console.log(datas);

      const response = await axios({
        method: 'POST',
        url: 'https://andarbahar65435.herokuapp.com/api/v1/login',
        data: datas,
      })
      
      if (response.data.token) {
        const amount = (response.data.result.Wallet)
        var wallet = amount.toString()
        await AsyncStorage.setItem('email', response.data.result.email)
        await AsyncStorage.setItem('wallet', wallet)
        console.log(wallet)
        
        navigation.navigate('Dashboard');
        setLoading(false)
      }
      
      console.log('gg', response.data.result.email);
    } catch (response) {
      console.log(response);
     
      setLoading(false)
        setTimeout(()=>{
          Snackbar.show({
            text: "Username or password dosen't match",
            duration: Snackbar.LENGTH_LONG,
          })
        }, 1000);
        
        
        
    }
  };

  const signup = async () => {
    setLoading(true)
    try {
      var data = {
        name,
        email,
        phoneno,
        password,
      };
      console.log(data);

      const response = await axios({
        method: 'POST',
        url: 'https://andarbahar65435.herokuapp.com/api/v1/signup',
        data: data,
      });
      if (response.data.token) {
        await AsyncStorage.setItem('email', response.data.user.email)
        await AsyncStorage.setItem('wallet', response.data.user.Wallet)
        navigation.navigate('Dashboard');
        setLoading(false)
      }
      console.log(response);
      
    } catch (error) {
      console.log(error);
      setLoading(false)
      setTimeout(()=>{
        Snackbar.show({
          text: "please check your details",
          duration: Snackbar.LENGTH_LONG,
        })
      }, 1000);
      
    }
  };
  

  return (
    <>
      <View
        style={{
          height: dimension.height,
          width: dimension.width,
        }}>
          <Modal transparent = {true}
          visible = {loading}
          style={{
           padding : 1,
          alignItems : "center",
          justifyContent : "center",
            
          }}>
            <View
            style={{
              height :dimension.height,
              width : dimension.width,
              alignItems : "center",
          justifyContent : "center",
          backgroundColor : "rgba(0,0,0,0.6)"
            
            }}>
<Sprinkle isVisible={loading} color={'rgba(14, 207, 104,1)'} size={37} type={"Circle"} />
<Text
style={{
  color : "rgba(255,255,255,0.5)",
  fontSize : RFValue(12)
}}>Loading</Text>
</View>
          </Modal>
         
        <LinearGradient
          colors={['#282e41', '#227880']}
          style={{
            height: dimension.height,
            width: dimension.width,
          }}>
          {signupScreen ? (
            <View
              style={{
                height: dimension.height,
                alignItems: 'center',
                paddingTop: dimension.height * 0.03,
              }}>
              <Text
                style={{
                  fontSize: RFValue(24),
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                SIGN UP
              </Text>
              <TextInput
                style={{
                  width: dimension.width * 0.97,
                  height: dimension.height * 0.06,
                  paddingLeft: 15,
                  fontSize: RFValue(17),

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
                onChangeText={val => {
                  setName(val);
                }}
              />
              <TextInput
                style={{
                  width: dimension.width * 0.97,
                  fontSize: RFValue(17),
                  height: dimension.height * 0.06,
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
                onChangeText={val => {
                  setEmail(val);
                }}
              />
              <TextInput
                style={{
                  width: dimension.width * 0.97,
                  fontSize: RFValue(17),
                  height: dimension.height * 0.06,
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
                placeholder="phone no"
                placeholderTextColor="rgba(255,255,255,0.3)"
                keyboardType="number-pad"
                onChangeText={val => {
                  setPhoneNo(val);
                }}
              />
              <TextInput
                style={{
                  width: dimension.width * 0.97,
                  height: dimension.height * 0.06,
                  fontSize: RFValue(17),
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
                onChangeText={val => {
                  setPassword(val);
                }}
              />
              <View
                style={{
                  height: dimension.height * 0.05,

                  width: dimension.width * 0.97,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: dimension.height * 0.02,
                }}>
                <Pressable
                  onPress={() => {
                    if (termsColor == true) {
                      setTermsColor(false);
                    } else {
                      setTermsColor(true);
                    }
                  }}>
                  <View
                    style={{
                      height: dimension.height * 0.02,
                      backgroundColor: termsColor ? 'green' : 'white',
                      width: dimension.height * 0.021,
                      borderRadius: 1000,
                      borderWidth: 1,
                      borderColor: 'white',
                    }}></View>
                </Pressable>
                <Text
                  style={{
                    color: 'white',
                    width: dimension.width * 0.9,
                    fontSize: RFValue(13),
                  }}>
                  I agree to the Terms and acknowledge that I have reached the
                  age of 18
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  signup();
                }}>
                <View
                  style={{
                    height: dimension.height * 0.05,
                    width: dimension.width * 0.95,
                    backgroundColor: '#cf4c0e',
                    borderRadius: 1000,
                    marginTop: dimension.height * 0.02,
                  }}>
                  <LinearGradient
                    colors={['#f5d442', '#e67825']}
                    style={{
                      height: dimension.height * 0.046,
                      width: dimension.width * 0.95,
                      backgroundColor: 'black',
                      borderRadius: 1000,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: RFValue(18),
                      }}>
                      SIGN UP
                    </Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  height: dimension.height * 0.2,
                  width: dimension.width * 0.95,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  borderRadius: 10,
                  marginTop: dimension.height * 0.02,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'rgba(255,255,255,0.4)',

                    fontSize: RFValue(18),
                  }}>
                  Promotion
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: RFValue(16),

                    textAlign: 'center',
                  }}>
                  Have an account?{' '}
                </Text>
                <Pressable
                  onPress={() => {
                    setSignupScreen(false);
                  }}>
                  <Text
                    style={{
                      color: 'rgba(14, 207, 104,0.7)',
                      fontWeight: 'bold',
                      fontSize: RFValue(16),
                      textAlign: 'center',
                    }}>
                    Sign In
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View
              style={{
                height: dimension.height,
                alignItems: 'center',
                paddingTop: dimension.height * 0.03,
              }}>
              <Text
                style={{
                  fontSize: RFValue(24),
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                LOG IN
              </Text>

              <TextInput
                style={{
                  width: dimension.width * 0.97,
                  fontSize: RFValue(17),
                  height: dimension.height * 0.06,
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
                onChangeText={val => {
                  setEmail(val);
                }}
              />

              <TextInput
                style={{
                  width: dimension.width * 0.97,
                  height: dimension.height * 0.06,
                  fontSize: RFValue(17),
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
                onChangeText={val => {
                  setPassword(val);
                }}
              />

              <TouchableOpacity
                onPress={() => {
                  logIn();
                }}>
                <View
                  style={{
                    height: dimension.height * 0.05,
                    width: dimension.width * 0.95,
                    backgroundColor: '#04bf5c',
                    borderRadius: 1000,
                    marginTop: dimension.height * 0.02,
                  }}>
                  <LinearGradient
                    colors={['#a4edc6', '#2fed88']}
                    style={{
                      height: dimension.height * 0.046,
                      width: dimension.width * 0.95,
                      backgroundColor: 'black',
                      borderRadius: 1000,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: RFValue(18),
                      }}>
                      LOG IN
                    </Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
              <Pressable
                style={{
                  marginTop: dimension.height * 0.02,
                }}
                onPress={() => {
                  setSignupScreen(true);
                }}>
                <Text
                  style={{
                    color: 'rgba(14, 207, 104,0.7)',
                    fontWeight: 'bold',
                    fontSize: RFValue(16),
                    textAlign: 'center',
                  }}>
                  Forgot the password?
                </Text>
              </Pressable>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  flexDirection: 'row',
                  marginTop: dimension.height * 0.02,
                }}>
                <Text
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: RFValue(16),

                    textAlign: 'center',
                  }}>
                  Don't have an account?{' '}
                </Text>
                <Pressable
                  onPress={() => {
                    setSignupScreen(true);
                  }}>
                  <Text
                    style={{
                      color: 'rgba(14, 207, 104,0.7)',
                      fontWeight: 'bold',
                      fontSize: RFValue(16),
                      textAlign: 'center',
                    }}>
                    Sign Up
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </LinearGradient>
      </View>
    </>
  );
};

export default LoginSignup;

