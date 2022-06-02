import React, {useState, useEffect} from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
  Animated,
  Modal,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {dimension, widthToDp} from './utils';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import Snackbar from 'react-native-snackbar';
import R2 from '../images/R2.png';
import R4 from '../images/R4.png';
import R6 from '../images/R6.png';
import R8 from '../images/R8.png';
import G1 from '../images/G1.png';
import G3 from '../images/G3.png';
import G7 from '../images/G7.png';
import G9 from '../images/G9.png';
import Icon from 'react-native-vector-icons/Ionicons';
import {color} from 'react-native-reanimated';

const Parity = () => {
  const [lastWinners, setLastWinners] = useState([]);
  const [roundid, setRoundID] = useState();
  const [selectedValue, setSelectedValue] = useState();
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [second, setSecond] = useState(null);
  const [fivetimer, setFivetimer] = useState(5);
  const [minute, setMinute] = useState(null);
  const [hour, setHour] = useState(null);
  const [winnerinterval, setWinnerInterval] = useState(2);
  const [days, setDays] = useState(null);
  const [data, setData] = useState();
  const [winner, setWinner] = useState(false);
  const [winnerPhoto, setWinnerPhoto] = useState();
  const [winnerModal, setwinnerModal] = useState(false);
  const [wallet, setWallet] = useState(0);
  const [newWinner, setNewWinner] = useState();
  const [myParityRecord, setMyParityRecord] = useState([]);
  const [recordSelected, setRecordSelected] = useState(true);
  const [depositEndTime, setDepositEndTime] = useState();

  useEffect(() => {
    getfirstData();
  }, []);

  const getfirstData = async () => {
    try {
      const data = {
        email: 'rahulbisht683@gmail.com',
      };
      const wallets = await axios({
        method: 'POST',
        url: 'https://andarbahar65435.herokuapp.com/api/v1/findUser',
        data: data,
      });
      setWallet(wallets.data[0].Wallet);
      console.log(wallet);
      setMyParityRecord(wallets.data[0].ParityRecord);
      
      //console.log('ddeeewwsddwescacac', wallets.data[0].ParityRecord);

      const response = await axios.get(
        'https://andarbahar65435.herokuapp.com/api/v1/paritystarted',
      );
      //setData(response.data.game);
      //console.log('data', response.data.game.lastWinners[1]);

      //console.log('haa mai hi hoo', winnerPhoto);
      //console.log(winner.data);
      //console.log(response.data.game.lastWinners);
      // const ss = new Date(Date.now());
      // console.log(ss.toDateString(), ss.toTimeString());
      //timeBetweenDates();
      setDepositEndTime(response.data.game.depositEndTime);
      setRoundID(response.data.game.roundid);
      var timer = setInterval(function () {
        timeBetweenDates();
      }, 1000);
      var winnerTimer = setInterval(function () {
        winnerLogic();
      }, 1000);

      const timeBetweenDates = async toDate => {
        var dateEntered = await new Date(
          response.data.game.currentRound,
        ).getTime();
        dateEntered += 2 * 60 * 1000;
        dateEntered += 35 * 1000;

        //console.log(new Date(dateEntered).toTimeString());

        var now = new Date(Date.now());
        // console.log(now);
        var difference =
          (await new Date(dateEntered).getTime()) - now.getTime();

        //console.log(new Date(difference).toTimeString());

        if (difference <= 0) {
          
          // setLastWinners({
          //   color: 'R',
          //   number: 6,
          //   url: 'https://res.cloudinary.com/dxwtomfzt/image/upload/v1653766842/game/red…',
          // });
          // setLastWinners([
          //   {
          //     color: 'R',
          //     number: 8,
          //     url: 'https://res.cloudinary.com/dxwtomfzt/image/upload/v1653766847/game/red…',
          //   },
          // ]);
          setLastWinners(response.data.game.lastWinners);
          console.log(lastWinners)
          // for (i = 0; i <= 15; i++) {
          //   setLastWinners(prevState => [
          //     ...prevState,
          //     response.data.game.lastWinners[i],
          //   ]);
          // }
          //console.log(lastWinners);

          // Timer done
          clearInterval(timer);
          fivesecTimerfnc();

          //Result Timer
        } else {
          var seconds = Math.floor(difference / 1000);
          var minutes = Math.floor(seconds / 60);
          var hours = Math.floor(minutes / 60);
          var days = Math.floor(hours / 24);

          hours %= 24;
          99;
          minutes %= 60;
          seconds %= 60;
          setSecond(seconds);
          setMinute(minutes);
          setHour(hours);
          setDays(days);
        }
      };

      const winnerLogic = async toDate => {
        var dateEntered = await new Date(
          response.data.game.currentRound,
        ).getTime();
        dateEntered += 2 * 60 * 1000;

        //console.log(new Date(dateEntered).toTimeString());

        var now = new Date(Date.now());
        // console.log(now);
        var difference =
          (await new Date(dateEntered).getTime()) - now.getTime();

        //console.log(new Date(difference).toTimeString());

        if (difference <= 0) {
          clearInterval(winnerTimer);
          // Timer done
          try {
            const winner = await axios.get(
              'https://andarbahar65435.herokuapp.com/api/v1/paritywinnerdata',
            );
            setWinnerPhoto(winner.data[0].url);
            setNewWinner(winner.data[0]);

            console.log('dddddddddddddddddggtteefvddddd', winner.data[0].color);
          } catch (error) {
            console.log(error);
          }

          // const dummystring = currentWinner.color + currentWinner.number;
          // dummystring.replace(/[{()}]/g, '');
          // setWinnerPhoto(dummystring);
          console.log(winnerPhoto);

          //Result Timer
        } else {
          var seconds = Math.floor(difference / 1000);
          var minutes = Math.floor(seconds / 60);
          var hours = Math.floor(minutes / 60);
          var days = Math.floor(hours / 24);

          hours %= 24;
          99;
          minutes %= 60;
          seconds %= 60;
          // setSecond(seconds);
          // setMinute(minutes);
          // setHour(hours);
          // setDays(days);
        }
      };
    } catch (error) {
      console.log(error);
    }
  };
  //   const onComplete = () => {
  //     return {
  //       shouldRepeat: true,
  //       delay: 8,
  //     };
  //   };

  const fivesecTimerfnc = async () => {
    setwinnerModal(true);
    setTimeout(() => {
      setwinnerModal(false)
      getfirstData()
    }, 5000);
  };
  // const ffiivvee = () => {
  //   if (fivetimer <= 0) {
  //     clearInterval(depp);
  //   } else {
  //     setFivetimer(fivetimer - 1);
  //     console.log(fivetimer);
  //   }
  // };

  const moneyPutfnc = async (value, money) => {
    if (new Date(depositEndTime) >= new Date(Date.now())) {
      console.log(value);

      try {
        var body = {
          amount: money,
          placed: value,
        };
        if(wallet >= money) {
        const isPut = await axios({
          method: 'POST',
          url: 'https://andarbahar65435.herokuapp.com/api/v1/paritymoney',
          data: body,
        });

        if (isPut.data == 'ok') {
          var body = {
            email: 'rahulbisht683@gmail.com',
            roundid: roundid,
            placed: selectedValue,
            amount: selectedAmount,
          };
          const save = await axios({
            method: 'POST',
            url: 'https://andarbahar65435.herokuapp.com/api/v1/setmoney',
            data: body,
          });
          setWallet(wallet - money);
          
        }
         setTimeout(()=>{
          Snackbar.show({
            text: "Amount Placed",
            duration: Snackbar.LENGTH_LONG,
          })
        }, 200)
        console.log(isPut.data);
      }else {
        setTimeout(()=>{
          Snackbar.show({
            text: "Low Wallet Balance",
            duration: Snackbar.LENGTH_LONG,
          })
        }, 1000)
      }
      } catch (error) {
        //console.log(error);
      }
    } else {
      console.log('deposit time went');
      // console.log(data.depositEndTime);
      setTimeout(()=>{
        Snackbar.show({
          text: "Wait for next round",
          duration: Snackbar.LENGTH_LONG,
        })
      }, 1000)
    }
  
  };

  //   const selectedColor = (id, amount) => {
  //     const newArrData = selected10k.map((e, index) => {
  //       if (id == e.id) {
  //         setSelectedValue(amount);
  //         return {
  //           ...e,
  //           selected: true,
  //         };
  //       }
  //       return {
  //         ...e,
  //         selected: false,
  //       };
  //     });
  //     setSelected10K(newArrData);
  //   };

  return (
    <>
      <View
        style={{
          flex: 1,
        }}>
        <Modal visible={winnerModal} transparent={true} animationType={'fade'}>
          <View
            style={{
              height: dimension.height,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.2)',
            }}>
            <View
              style={{
                backgroundColor: 'rgba(47, 87, 222,0.2)',
                height: dimension.height * 0.3,
                width: dimension.height * 0.3,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 400,
              }}>
              <View
                style={{
                  backgroundColor: 'rgba(47, 87, 222,0.2)',
                  height: dimension.height * 0.25,
                  width: dimension.height * 0.25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 400,
                }}>
                <View
                  style={{
                    backgroundColor: 'rgba(47, 87, 222,0.2)',
                    height: dimension.height * 0.2,
                    width: dimension.height * 0.2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 400,
                  }}>
                  <Image
                    source={{uri: winnerPhoto}}
                    style={{
                      height: dimension.height * 0.2,
                      width: dimension.width * 0.4,
                    }}></Image>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <Modal visible={modalVisible} transparent={true}>
          <View
            style={{
              height: dimension.height,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.2)',
            }}>
            <View
              style={{
                height: dimension.height * 0.4,
                width: dimension.width * 0.85,
                backgroundColor: 'white',
                borderRadius: 5,
              }}>
              <View
                style={{
                  height: dimension.height * 0.08,
                  backgroundColor:
                    selectedValue == 'VIOLET' ? 'violet' : '#397eed',
                }}>
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: selectedValue == 'RED' ? 'red' : null,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      backgroundColor:
                        selectedValue == 'GREEN' ? 'green' : null,
                    }}>
                    <Text
                      style={{
                        fontSize: RFValue(20),
                        letterSpacing: 0.5,
                        color: 'white',
                        paddingLeft: dimension.width * 0.04,
                      }}>
                      Join {selectedValue}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: dimension.width * 0.06,
                }}>
                <Text
                  style={{
                    marginTop: dimension.height * 0.02,
                    color: 'black',
                  }}>
                  Contract Money
                </Text>
                <View
                  style={{
                    width: dimension.width * 0.5,
                    alignSelf: 'center',
                    paddingVertical: dimension.height * 0.01,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    borderRadius: 5,
                    marginTop: dimension.height * 0.01,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                    }}>
                    {selectedAmount}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: dimension.height * 0.03,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedAmount(selectedAmount + 10);
                    }}
                    style={{
                      width: dimension.width * 0.13,
                      paddingVertical: dimension.height * 0.007,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                      elevation: 2,
                    }}>
                    <Text>10</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedAmount(selectedAmount + 100);
                    }}
                    style={{
                      width: dimension.width * 0.13,
                      paddingVertical: dimension.height * 0.007,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                      elevation: 2,
                    }}>
                    <Text>100</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedAmount(selectedAmount + 1000);
                    }}
                    style={{
                      width: dimension.width * 0.13,
                      paddingVertical: dimension.height * 0.007,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                      elevation: 2,
                    }}>
                    <Text>1000</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedAmount(selectedAmount + 10000);
                    }}
                    style={{
                      width: dimension.width * 0.13,
                      paddingVertical: dimension.height * 0.007,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                      elevation: 2,
                    }}>
                    <Text>10000</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedAmount(0);
                  }}
                  style={{
                    width: dimension.width * 0.4,
                    paddingVertical: dimension.height * 0.007,
                    marginTop: dimension.height * 0.02,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    elevation: 2,
                    alignSelf: 'center',
                  }}>
                  <Text>Reset Amount to 0</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',

                  marginTop: dimension.height * 0.04,
                  justifyContent: 'flex-end',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(16),
                      color: 'black',
                    }}>
                    Cancle
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    moneyPutfnc(selectedValue, selectedAmount);
                    setModalVisible(false);
                  }}
                  style={{
                    marginLeft: dimension.width * 0.04,
                    marginRight: dimension.width * 0.06,
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(16),
                      color: 'blue',
                    }}>
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View
          style={{
            height: dimension.height * 0.07,
            backgroundColor: 'rgb(45, 173, 169)',
            justifyContent: 'center',
            paddingLeft: dimension.width * 0.03,
          }}>
          <View
            style={{
              height: dimension.height * 0.05,
              width: dimension.width * 0.3,
              alignItems: 'center',
              paddingLeft: dimension.width * 0.02,
              backgroundColor: 'rgba(255,255,255,0.4)',
              borderRadius: 10,
              flexDirection: 'row',
            }}>
            <Icon
              style={{
                color: 'white',
              }}
              name="wallet"
              size={28}
            />
            <Text
              style={{
                fontSize: RFValue(14),
                fontWeight: 'bold',
                paddingLeft: dimension.width * 0.01,
                color: 'white',
              }}>
              {wallet}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: dimension.height * 0.35,

            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: RFValue(17),
              fontWeight: '400',
              color: 'black',
              paddingVertical: dimension.height * 0.01,
              width: dimension.width,
              backgroundColor: 'white',
              textAlign: 'center',
              letterSpacing: 1,
              borderBottomColor: 'rgba(57, 204, 199,0.5)',
              borderBottomWidth: 2,
            }}>
            Parity
          </Text>
          <View
            style={{
              height: dimension.height * 0.11,
              width: dimension.width,
              marginTop: dimension.height * 0.02,
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: dimension.width * 0.55,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: dimension.width * 0.01,
                }}>
                <Icon
                  style={{
                    color: 'rgba(125, 130, 130,0.7)',
                  }}
                  name="ios-trophy-sharp"
                  size={24}
                />
                <Text
                  style={{
                    fontSize: RFValue(18),
                    fontWeight: '400',
                    paddingLeft: dimension.width * 0.01,
                    letterSpacing: 1,
                    color: 'rgba(125, 130, 130,0.7)',
                  }}>
                  Period
                </Text>
              </View>
              <Text
                style={{
                  fontSize: RFValue(23),
                  fontWeight: '400',
                  paddingLeft: dimension.width * 0.03,
                  marginTop: dimension.height * 0.02,

                  letterSpacing: 0.3,
                  color: 'rgba(125, 130, 130,0.7)',
                }}>
                456778669
              </Text>
            </View>
            <View
              style={{
                width: dimension.width * 0.45,
                alignItems: 'flex-end',
                paddingRight: dimension.width * 0.02,
              }}>
              <Text
                style={{
                  fontSize: RFValue(18),
                  fontWeight: '400',
                  paddingLeft: dimension.width * 0.01,
                  letterSpacing: 1,
                  color: 'rgba(125, 130, 130,0.7)',
                }}>
                Count Down
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: RFValue(23),
                    fontWeight: '400',
                    paddingHorizontal: 2,
                    marginTop: dimension.height * 0.02,
                    textAlign: 'center',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    borderRadius: 5,
                    color: 'black',
                  }}>
                  0
                </Text>
                <Text
                  style={{
                    fontSize: RFValue(23),
                    fontWeight: '400',
                    paddingHorizontal: 2,
                    marginTop: dimension.height * 0.02,
                    textAlign: 'center',
                    marginLeft: dimension.width * 0.01,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    borderRadius: 5,
                    color: 'black',
                  }}>
                  {minute}
                </Text>
                <Text
                  style={{
                    fontSize: RFValue(23),
                    fontWeight: '400',
                    paddingHorizontal: 2,
                    marginTop: dimension.height * 0.02,
                    textAlign: 'center',
                    marginLeft: dimension.width * 0.01,
                    color: 'black',
                  }}>
                  :
                </Text>
                <Text
                  style={{
                    fontSize: RFValue(23),
                    fontWeight: '400',
                    paddingHorizontal: 2,
                    marginTop: dimension.height * 0.02,
                    textAlign: 'center',
                    marginLeft: dimension.width * 0.01,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    borderRadius: 5,
                    color: 'black',
                  }}>
                  {second}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              height: dimension.height * 0.17,
              width: dimension.width,
              paddingHorizontal: dimension.width * 0.02,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedValue('RED');
                  setModalVisible(true);
                }}>
                <View
                  style={{
                    height: dimension.height * 0.04,
                    width: dimension.width * 0.25,
                    backgroundColor: 'red',
                    borderRadius: 2,
                    elevation: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    Join Red
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedValue('GREEN');
                  setModalVisible(true);
                }}>
                <View
                  style={{
                    height: dimension.height * 0.04,
                    width: dimension.width * 0.25,
                    backgroundColor: 'green',
                    borderRadius: 2,
                    elevation: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    Join Green
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedValue('VIOLET');
                  setModalVisible(true);
                }}>
                <View
                  style={{
                    height: dimension.height * 0.04,
                    width: dimension.width * 0.25,
                    backgroundColor: 'violet',
                    borderRadius: 2,
                    elevation: 5,

                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    Join Violet
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: dimension.height * 0.01,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedValue('0');
                  setModalVisible(true);
                }}>
                <View
                  style={{
                    height: dimension.height * 0.04,
                    width: dimension.width * 0.14,
                    backgroundColor: '#397eed',
                    borderRadius: 2,
                    elevation: 5,

                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    0
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedValue('1');
                  setModalVisible(true);
                }}>
                <View
                  style={{
                    height: dimension.height * 0.04,
                    width: dimension.width * 0.14,
                    backgroundColor: '#397eed',
                    borderRadius: 2,
                    elevation: 5,

                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    1
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedValue('2');
                  setModalVisible(true);
                }}>
                <View
                  style={{
                    height: dimension.height * 0.04,
                    width: dimension.width * 0.14,
                    backgroundColor: '#397eed',
                    borderRadius: 2,
                    elevation: 5,

                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    2
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedValue('3');
                  setModalVisible(true);
                }}>
                <View
                  style={{
                    height: dimension.height * 0.04,
                    width: dimension.width * 0.14,
                    backgroundColor: '#397eed',
                    borderRadius: 2,
                    elevation: 5,

                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    3
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedValue('4');
                  setModalVisible(true);
                }}>
                <View
                  style={{
                    height: dimension.height * 0.04,
                    width: dimension.width * 0.14,
                    backgroundColor: '#397eed',
                    borderRadius: 2,
                    elevation: 5,

                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    4
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: dimension.height * 0.01,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedValue('5');
                  setModalVisible(true);
                }}>
                <View
                  style={{
                    height: dimension.height * 0.04,
                    width: dimension.width * 0.14,
                    backgroundColor: '#397eed',
                    borderRadius: 2,
                    elevation: 5,

                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    5
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedValue('6');
                  setModalVisible(true);
                }}>
                <View
                  style={{
                    height: dimension.height * 0.04,
                    width: dimension.width * 0.14,
                    backgroundColor: '#397eed',
                    borderRadius: 2,
                    elevation: 5,

                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    6
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedValue('7');
                  setModalVisible(true);
                }}>
                <View
                  style={{
                    height: dimension.height * 0.04,
                    width: dimension.width * 0.14,
                    backgroundColor: '#397eed',
                    borderRadius: 2,
                    elevation: 5,

                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    7
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedValue('8');
                  setModalVisible(true);
                }}>
                <View
                  style={{
                    height: dimension.height * 0.04,
                    width: dimension.width * 0.14,
                    backgroundColor: '#397eed',
                    borderRadius: 2,
                    elevation: 5,

                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    8
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedValue('9');
                  setModalVisible(true);
                }}>
                <View
                  style={{
                    height: dimension.height * 0.04,
                    width: dimension.width * 0.14,
                    backgroundColor: '#397eed',
                    borderRadius: 2,
                    elevation: 5,

                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    9
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            height: dimension.height * 0.6,
            backgroundColor: 'white',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setRecordSelected(true);
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: dimension.width * 0.5,
              }}>
              <Icon
                style={{
                  color: recordSelected ? 'blue' : 'rgba(125, 130, 130,0.7)',
                  marginTop: dimension.height * 0.01,
                }}
                name="ios-trophy-sharp"
                size={24}
              />
              <Text
                style={{
                  fontSize: RFValue(15),
                  fontWeight: '800',
                  width: '100%',
                  paddingBottom: dimension.height * 0.01,
                  borderBottomColor: 'blue',
                  borderBottomWidth: 2,
                  color: 'rgba(125, 130, 130,0.7)',
                  textAlign: 'center',
                  letterSpacing: 0.1,
                }}>
                Parity Record
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRecordSelected(false);
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: dimension.width * 0.5,
              }}>
              <Icon
                style={{
                  color: recordSelected ? 'rgba(125, 130, 130,0.7)' : 'blue',
                  marginTop: dimension.height * 0.01,
                }}
                name="ios-trophy-sharp"
                size={24}
              />
              <Text
                style={{
                  fontSize: RFValue(15),
                  fontWeight: '800',
                  width: '100%',
                  paddingBottom: dimension.height * 0.01,
                  borderBottomColor: 'blue',
                  borderBottomWidth: 2,
                  color: 'rgba(125, 130, 130,0.7)',
                  textAlign: 'center',
                  letterSpacing: 0.1,
                }}>
                My Parity Record
              </Text>
            </TouchableOpacity>
          </View>
          {recordSelected ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: dimension.width * 0.04,

                  paddingVertical: dimension.height * 0.02,
                  width: dimension.width,
                  borderBottomColor: 'rgba(125, 130, 130,0.5)',
                  borderBottomWidth: 1,
                }}>
                <View
                  style={{
                    width: dimension.width * 0.25,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(12),
                      color: 'rgba(125, 130, 130,0.7)',
                    }}>
                    Period
                  </Text>
                </View>
                <View
                  style={{
                    width: dimension.width * 0.22,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(12),
                      color: 'rgba(125, 130, 130,0.7)',
                    }}>
                    Price
                  </Text>
                </View>
                <View
                  style={{
                    width: dimension.width * 0.22,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(12),
                      color: 'rgba(125, 130, 130,0.7)',
                    }}>
                    Number
                  </Text>
                </View>
                <View
                  style={{
                    width: dimension.width * 0.22,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(12),
                      color: 'rgba(125, 130, 130,0.7)',
                    }}>
                    Result
                  </Text>
                </View>
              </View>

              <FlatList
                data={lastWinners}
                maxToRenderPerBatch={10}
                keyExtractor={(item, index) => `key${index}`}
                renderItem={({item}) => (
                  <View
                    style={{
                      width: dimension.width,
                      paddingHorizontal: dimension.width * 0.04,
                      paddingVertical: dimension.height * 0.02,
                      borderBottomColor: 'rgba(125, 130, 130,0.7)',
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                    }}>
                    <Text
                      style={{
                        width: dimension.width * 0.25,
                        textAlign: 'center',
                        fontSize: RFValue(10),
                        height: '100%',
                        color: 'black',
                      }}>
                      {lastWinners.indexOf(item) + 1}
                    </Text>
                    <Text
                      style={{
                        width: dimension.width * 0.22,
                        textAlign: 'center',

                        height: '100%',
                        color: 'black',
                      }}>
                      1000
                    </Text>
                    <Text
                      style={{
                        width: dimension.width * 0.22,
                        textAlign: 'center',

                        height: '100%',
                        color: item.color == 'R' ? 'red' : 'green',
                      }}>
                      {item.number}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: dimension.width * 0.22,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          height: dimension.height * 0.02,
                          width: dimension.height * 0.02,
                          borderRadius: 100,
                          backgroundColor: item.color == 'R' ? 'red' : 'green',
                        }}></View>
                      <View
                        style={{
                          height: dimension.height * 0.02,
                          width: dimension.height * 0.02,
                          borderRadius: 100,
                          backgroundColor: item.color == 'VR' ? 'violet' : null,
                        }}>
                        <View
                          style={{
                            height: dimension.height * 0.02,
                            width: dimension.height * 0.02,
                            borderRadius: 100,
                            backgroundColor:
                              item.color == 'VG' ? 'violet' : null,
                          }}></View>
                      </View>
                    </View>
                  </View>
                )}></FlatList>
            </>
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: dimension.width * 0.04,

                  paddingVertical: dimension.height * 0.02,
                  width: dimension.width,
                  borderBottomColor: 'rgba(125, 130, 130,0.5)',
                  borderTopColor: 'rgba(125, 130, 130,0.5)',
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                }}>
                <View
                  style={{
                    width: dimension.width * 0.25,
                    alignItems: 'center',
                    height: '100%',
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(12),
                      color: 'rgba(125, 130, 130,0.7)',
                    }}>
                    Period
                  </Text>
                </View>
                <View
                  style={{
                    width: dimension.width * 0.22,
                    alignItems: 'center',
                    height: '100%',
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(12),
                      color: 'rgba(125, 130, 130,0.7)',
                    }}>
                    Amount
                  </Text>
                </View>
                <View
                  style={{
                    width: dimension.width * 0.22,
                    alignItems: 'center',
                    height: '100%',
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(12),
                      color: 'rgba(125, 130, 130,0.7)',
                    }}>
                    Status
                  </Text>
                </View>
                <View
                  style={{
                    width: dimension.width * 0.22,
                    alignItems: 'center',
                    height: '100%',
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(12),
                      color: 'rgba(125, 130, 130,0.7)',
                    }}>
                    Result
                  </Text>
                </View>
              </View>
              <FlatList
                data={myParityRecord}
                keyExtractor={(item, index) => `key${index}`}
                renderItem={({item}) => (
                  <View
                    style={{
                      width: dimension.width,
                      paddingHorizontal: dimension.width * 0.04,
                      paddingVertical: dimension.height * 0.02,
                      borderBottomColor: 'rgba(125, 130, 130,0.7)',
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                    }}>
                    <Text
                      style={{
                        width: dimension.width * 0.25,
                        textAlign: 'center',
                        fontSize: RFValue(10),
                        height: '100%',
                        color: 'black',
                      }}>
                      {item.roundid}
                    </Text>
                    <Text
                      style={{
                        width: dimension.width * 0.22,
                        textAlign: 'center',

                        height: '100%',
                        color: 'black',
                      }}>
                      {item.amount}
                    </Text>
                    <Text
                      style={{
                        width: dimension.width * 0.22,
                        textAlign: 'center',

                        height: '100%',
                        color: 'black',
                      }}>
                      {item.status ? item.status : '-' + item.amount}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: dimension.width * 0.22,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          height: dimension.height * 0.02,
                          width: dimension.height * 0.02,
                          borderRadius: 100,
                          backgroundColor:
                            item.placed == 'RED' ? 'red' : 'green',
                        }}></View>
                      <View
                        style={{
                          height: dimension.height * 0.02,
                          width: dimension.height * 0.02,
                          borderRadius: 100,
                          backgroundColor:
                            item.placed == 'VIOLET' ? 'violet' : null,
                        }}></View>
                    </View>
                  </View>
                )}></FlatList>
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default Parity;
