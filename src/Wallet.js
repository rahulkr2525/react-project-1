import React , {useState,useEffect} from 'react';

import {View, Text} from 'react-native';
import {dimension} from './utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFValue } from 'react-native-responsive-fontsize';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Wallet = ({navigation, route}) => {
  useEffect(()=> {
    gettingWallet()
  },[])
  const [wallets, setWallets] = useState()
const gettingWallet = async()=> {
  try {
  const value = await AsyncStorage.getItem('email')
 
  const data = {
    email: value,
  };
  const wallets = await axios({
    method: 'POST',
    url: 'https://andarbahar65435.herokuapp.com/api/v1/findUser',
    data: data,
  });
  setWallets(wallets.data[0].Wallet);
  console.log(wallets.data[0].Wallet)
} catch (error) {
    
}
}
  return (
    <>
      <View
      style={{
        height : dimension.height,
        width : dimension.width,
      }}>
        <View style={{
          height : dimension.height*0.08,
          backgroundColor :"rgba(52, 235, 131,0.5)",
          paddingLeft : dimension.width*0.04,
          alignItems :"center",
          flexDirection : "row"
        }}>
          <Icon2
            style={{color: 'black',}}
            name="chevron-back"
            size={28}
          />
          <Text
          style={{
            fontSize : RFValue(16),
            fontWeight : "bold",
            color : "black"
          }}>My Balances</Text>
        </View>
        <View
        style={{
          marginTop : dimension.height*0.02,
          width : dimension.width*0.95,
          backgroundColor : "white",
          paddingVertical : dimension.height*0.01,
          alignSelf : "center",
          alignItems : "center",
          borderRadius : 5,


        }}>
          <Text
          style={{
            color : "grey"
            
          }}>Balance</Text>
          <Text
          style={{
            color : "black",
            fontSize : RFValue(38),
            fontWeight : "bold",
            letterSpacing : 1,

          }}>₹{wallets}</Text>
          <View style={{
            height : 1,
            width : "95%",
            backgroundColor : "rgba(0,0,0,0.1)",
            marginTop : dimension.height*0.02
          }}></View>
        <TouchableOpacity
        style={{
          height : dimension.height*0.07,
          width : dimension.width*0.85,
          backgroundColor : "rgba(52, 235, 131,0.5)",
          marginTop : dimension.height*0.03,
          borderRadius : 4,
          alignItems : "center",
            justifyContent : "center"

        }}>
          <Text
          style={{
            fontSize : RFValue(14),
            fontWeight : "bold",
            letterSpacing : 1,
            color : "black",
          }}>Add Money</Text>
        </TouchableOpacity>
          <View style={{
            height : 1,
            width : "95%",
            backgroundColor : "rgba(0,0,0,0.1)",
            marginTop : dimension.height*0.02
          }}></View>
        <TouchableOpacity
        style={{
          height : dimension.height*0.07,
          width : dimension.width*0.85,
          borderWidth : 1,
          borderColor : "blue",
          marginTop : dimension.height*0.03,
          borderRadius : 4,
          alignItems : "center",
            justifyContent : "center"

        }}>
          <Text
          style={{
            fontSize : RFValue(14),
            fontWeight : "bold",
            color : "blue",
            letterSpacing : 1,
          }}>Withdraw</Text>
        </TouchableOpacity>
        </View>
        <View
       style={{
        marginTop : dimension.height*0.06,
        width : dimension.width*0.95,
        backgroundColor : "white",
        paddingVertical : dimension.height*0.03,
        alignSelf : "center",
        flexDirection :"row",
        paddingHorizontal : dimension.width*0.04,
        borderRadius : 5,
        alignItems : "center",
        justifyContent : 'space-between'


      }}>
        <Text
        style={{
          color : "grey",
          fontWeight : "800",
        }}>Transaction History</Text>
         <Icon2
            style={{color: 'grey',justifyContent : "flex-end"}}
            name="chevron-forward"
            size={28}
          />
        
      </View>
      </View>
    </>
  );
};

export default Wallet;
