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
} from 'react-native';
import axios from 'axios';
import {dimension, widthToDp} from './utils';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {color} from 'react-native-reanimated';
const Parity = () => {
  const [lastWinners, setLastWinners] = useState([
    {color: 'R', number: 1},
    {color: 'R', number: 1},
    {color: 'VR', number: 1},
    {color: 'G', number: 1},
    {color: 'R', number: 1},
    {color: 'G', number: 1},
    {color: 'R', number: 1},
    {color: 'R', number: 1},
  ]);
  const [winnerColor, setWinnerColor] = useState();
  const [selectedValue, setSelectedValue] = useState();
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [modalVisible, setModalVisible] = useState(true);
  useEffect(() => {
    getfirstData();
  }, []);
  const getfirstData = async () => {
    try {
      const response = await axios.get(
        'https://andarbahar65435.herokuapp.com/api/v1/paritystarted',
      );
      setData(response.data.game);

      //console.log(winner.data);
      console.log(response.data.game.lastWinners);
      // const ss = new Date(Date.now());
      // console.log(ss.toDateString(), ss.toTimeString());
      //timeBetweenDates();
      var timer = setInterval(function () {
        timeBetweenDates();
      }, 1000);
      var winnerTimer = setInterval(function () {
        winnerLogic();
      }, 1000);

      const timeBetweenDates = async toDate => {
        var dateEntered = new Date(response.data.game.currentRound).getTime();
        dateEntered += 2 * 60 * 1000;
        dateEntered += 30 * 1000;

        //console.log(new Date(dateEntered).toTimeString());

        var now = new Date(Date.now());
        // console.log(now);
        var difference = new Date(dateEntered).getTime() - now.getTime();

        //console.log(new Date(difference).toTimeString());

        if (difference <= 0) {
          setLastWinners(response.data.game.lastWinners);
          setWinner(true);
          const deppt = setInterval(() => {
            setWinnerInterval(lastWinnerIntervalCount => {
              if (lastWinnerIntervalCount <= 1) {
                setWinner(false);
                clearInterval(deppt);
                setWinnerInterval(2);
              }

              return lastWinnerIntervalCount - 1;
            });
          }, 1000);
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
        var dateEntered = new Date(response.data.game.currentRound).getTime();
        dateEntered += 2 * 60 * 1000;

        //console.log(new Date(dateEntered).toTimeString());

        var now = new Date(Date.now());
        // console.log(now);
        var difference = new Date(dateEntered).getTime() - now.getTime();

        //console.log(new Date(difference).toTimeString());

        if (difference <= 0) {
          // Timer done
          clearInterval(winnerTimer);
          const winner = await axios.get(
            'https://andarbahar65435.herokuapp.com/api/v1/winnerdata',
          );
          setCurrentWinner(winner.data);

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
    const depp = setInterval(() => {
      setFivetimer(lastFivetimerCount => {
        if (lastFivetimerCount <= 1) {
          clearInterval(depp);
          getfirstData();
        }

        return lastFivetimerCount - 1;
      });
    }, 1000);
  };
  const ffiivvee = () => {
    if (fivetimer <= 0) {
      clearInterval(depp);
    } else {
      setFivetimer(fivetimer - 1);
      console.log(fivetimer);
    }
  };

  const moneyPutfnc = async (value, money) => {
    if (new Date(data.depositEndTime) >= new Date(Date.now())) {
      console.log(value);

      try {
        var body = {
          amount: money,
          placed: value,
        };

        const isPut = await axios({
          method: 'POST',
          url: 'https://andarbahar65435.herokuapp.com/api/v1/paritymoney',
          data: body,
        });
        console.log(isPut);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('deposit time went');
      console.log(data.depositEndTime);
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
                  q
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
              ₹100
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
                  2
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
                  3
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
                  0
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
          <Icon
            style={{
              color: 'rgba(125, 130, 130,0.7)',
              marginTop: dimension.height * 0.01,
            }}
            name="ios-trophy-sharp"
            size={24}
          />
          <Text
            style={{
              fontSize: RFValue(15),
              fontWeight: '800',
              width: dimension.width,
              paddingBottom: dimension.height * 0.01,
              borderBottomColor: 'blue',
              borderBottomWidth: 2,
              color: 'rgba(125, 130, 130,0.7)',
              textAlign: 'center',
              letterSpacing: 0.1,
            }}>
            Parity Record
          </Text>
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
                Price
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
                Number
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
            data={lastWinners}
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
                        backgroundColor: item.color == 'VG' ? 'violet' : null,
                      }}></View>
                  </View>
                </View>
              </View>
            )}></FlatList>
        </View>
      </View>
    </>
  );
};

export default Parity;
