import React, {useState} from 'react';

import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {dimension} from './utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';

const Home = ({navigation, route}) => {
  const [wallet, setWallet] = useState(10);
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
              onPress={() => navigation.openDrawer()}
              style={{color: 'white', alignSelf: 'center', marginLeft: '10%'}}
              name="add-circle"
              size={26}
            />
          </View>
        </View>
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
            source={require('../images/images.jpg')}
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
                AndarBahar
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
          </View>
        </View>
        <View
          style={{
            marginTop: dimension.height * 0.02,
            height: dimension.height * 0.26,
            width: dimension.width * 0.93,
            alignSelf: 'center',

            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              height: dimension.height * 0.26,
              width: dimension.width * 0.44,
              backgroundColor: '#001f26',
              borderRadius: 5,
              elevation: 10,
            }}>
            <Image
              style={{
                height: dimension.height * 0.22,
                resizeMode: 'cover',
                width: '100%',
              }}
              source={require('../images/wingo.jpg')}></Image>
          </View>
          <View
            style={{
              height: dimension.height * 0.26,
              width: dimension.width * 0.44,
              backgroundColor: '#001f26',
              borderRadius: 4,
              elevation: 10,
            }}></View>
        </View>
      </View>
    </>
  );
};

export default Home;
