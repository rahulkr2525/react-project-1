import React, {useState,useEffect} from 'react';

import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {dimension} from './utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation, route}) => {
  useEffect(()=> {
    walletMoney()
    
  },[])
  const [wallet, setWallet] = useState(10);
  const walletMoney= async()=> {
    const value = await AsyncStorage.getItem('wallet')
    console.log(value)
    setWallet(value)
  }
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#001f26',
        }}>
        <View
          style={{
            height: dimension.height * 0.08,
            elevation: 5,
            backgroundColor: '#001f26',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: dimension.width * 0.02,
            borderBottomWidth: 1,
            borderColor: 'rgba(255,255,255,0.1)',
          }}>
          <Icon
            onPress={() => navigation.openDrawer()}
            style={{color: '#2fed88', alignSelf: 'center'}}
            name="menu"
            size={28}
          />
          <View
            style={{
              backgroundColor: '#2fed88',
              flexDirection: 'row',
              alignItems: 'center',

              borderRadius: 100,
              justifyContent: 'flex-end',
              paddingRight: '1%',

              paddingVertical: dimension.height * 0.003,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              ₹{wallet}
            </Text>
            <Icon
              onPress={() => navigation.navigate("Wallet")}
              style={{color: 'white', alignSelf: 'center', marginLeft: '10%'}}
              name="add-circle"
              size={26}
            />
          </View>
        </View>
        <ScrollView>
          <View
            style={{
              backgroundColor: '#001f26',
              height: dimension.height * 0.4,
              width: dimension.width * 0.93,
              alignSelf: 'center',
              marginTop: dimension.height * 0.02,
              borderRadius: 5,
              elevation: 10,
              overflow: 'hidden',
            }}>
            <Image
              source={require('../images/unnamed1.png')}
              style={{
                height: dimension.height * 0.3,
                resizeMode: 'cover',
                width: '100%',
              }}></Image>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                height: dimension.height * 0.1,
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: dimension.width * 0.03,
              }}>
              <View
                style={{
                  justifyContent: 'center',

                  height: '100%',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'rgba(255,255,255,0.7)',
                    letterSpacing: 1,
                  }}>
                  Parity
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.7)',
                    letterSpacing: 0.5,
                  }}>
                  classic AndarBahar in 15sec
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Parity');
                }}>
                <View
                  style={{
                    borderRadius: 100,
                    paddingHorizontal: dimension.width * 0.07,
                    height: dimension.height * 0.05,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#2fed88',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.7)',
                      fontWeight: 'bold',
                      letterSpacing: 0.5,
                    }}>
                    Play Now
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginTop: dimension.height * 0.02,
              height: dimension.height * 0.28,
              width: dimension.width * 0.93,
              alignSelf: 'center',

              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                height: dimension.height * 0.28,
                width: dimension.width * 0.44,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.2)',
                backgroundColor: '#001f26',
                borderRadius: 5,
                elevation: 10,
                overflow: 'hidden',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  height: dimension.height * 0.15,
                  marginTop: dimension.height * 0.01,
                  resizeMode: 'cover',
                  width: '90%',
                  borderRadius: 5,
                }}
                source={require('../images/andarbahar.png')}></Image>
              <View
                style={{
                  height: dimension.height * 0.1,

                  width: '100%',
                  paddingLeft: dimension.width * 0.015,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: 'rgba(255,255,255,0.7)',
                    letterSpacing: 0.5,
                    marginTop: dimension.height * 0.009,
                    paddingLeft: 3,
                  }}>
                  AndarBahar
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.5)',
                    letterSpacing: 0.5,
                    paddingLeft: 3,
                  }}>
                  hit and win big
                </Text>
                <TouchableOpacity onPress={()=> navigation.navigate("Tossgame")}>
                <View
                  style={{
                    height: dimension.height * 0.04,
                    backgroundColor: '#2fed88',
                    width: '90%',
                    borderRadius: 100,
                    marginTop: dimension.height * 0.009,
                    paddingLeft: dimension.width * 0.015,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.5)',
                      fontWeight: 'bold',
                      letterSpacing: 0.5,
                    }}>
                    Play Now
                  </Text>
                </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                height: dimension.height * 0.28,
                width: dimension.width * 0.44,
                backgroundColor: '#001f26',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.2)',
                borderRadius: 5,
                elevation: 10,
                overflow: 'hidden',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  height: dimension.height * 0.15,
                  marginTop: dimension.height * 0.01,
                  resizeMode: 'cover',
                  width: '90%',
                  borderRadius: 5,
                }}
                source={require('../images/wingo.jpg')}></Image>
              <View
                style={{
                  height: dimension.height * 0.1,

                  width: '100%',
                  paddingLeft: dimension.width * 0.015,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: 'rgba(255,255,255,0.7)',
                    paddingLeft: 3,
                    letterSpacing: 0.5,
                    marginTop: dimension.height * 0.009,
                  }}>
                  Win Go
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.5)',
                    letterSpacing: 0.5,
                    paddingLeft: 3,
                  }}>
                  hit and win big
                </Text>
                <View
                  style={{
                    height: dimension.height * 0.04,
                    backgroundColor: '#2fed88',
                    width: '90%',
                    borderRadius: 100,
                    marginTop: dimension.height * 0.009,
                    paddingLeft: dimension.width * 0.015,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.5)',
                      fontWeight: 'bold',
                      letterSpacing: 0.5,
                    }}>
                    Play Now
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Home;
