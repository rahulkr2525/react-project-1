import React, {useState, useEffect} from 'react';

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
  Animated,
} from 'react-native';
import axios from 'axios';
import {dimension} from './utils';
import {RFValue} from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import {CountUp} from 'use-count-up';

const Tossgame = () => {
  const [second, setSecond] = useState(null);
  const [minute, setMinute] = useState(null);
  const [hour, setHour] = useState(null);
  const [days, setDays] = useState(null);
  const [fivetimer, setFivetimer] = useState(5);
  const [wallet, setWallet] = useState(500);
  const [winner, setWinner] = useState(false);
  const [currentWinner, setCurrentWinner] = useState();
  const [data, setData] = useState();
  const [selectedvalue, setSelectedValue] = useState(0);
  const [selected10k, setSelected10K] = useState([
    {id: 1, selected: true},
    {id: 2, selected: true},
    {id: 3, selected: true},
    {id: 4, selected: true},
    {id: 5, selected: true},
    {id: 6, selected: true},
  ]);
  const [xValue, setXValue] = useState(new Animated.Value(0));
  const [winnerinterval, setWinnerInterval] = useState(2);
  const [randomvaluetie, setRandomValueTie] = useState(257437);
  const [randomvaluehead, setRandomValueHead] = useState(557437);
  const [randomvaluetail, setRandomValueTail] = useState(457437);
  const [lastWinners, setLastWinners] = useState([]);

  useEffect(() => {
    getfirstData();
  }, []);
  const getfirstData = async () => {
    try {
      const response = await axios.get(
        'https://andarbahar65435.herokuapp.com/api/v1/started',
      );
      setData(response.data.game);
      setRandomValueHead(response.data.game.randomvaluehead);
      setRandomValueTail(response.data.game.randomvaluetail);
      setRandomValueTie(response.data.game.randomvaluetie);

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
        dateEntered += 15 * 1000;

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
        dateEntered += 13 * 1000;

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
  const onComplete = () => {
    return {
      shouldRepeat: true,
      delay: 8,
    };
  };

  const fivesecTimerfnc = async () => {
    const depp = setInterval(() => {
      setFivetimer(lastFivetimerCount => {
        if (lastFivetimerCount <= 1) {
          clearInterval(depp);
          getfirstData();
          setFivetimer(5);
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

  const moneyPutfnc = async value => {
    if (new Date(data.depositEndTime) >= new Date(Date.now())) {
      console.log(value);

      try {
        var body = {
          amount: selectedvalue,
          placed: value,
        };

        const isPut = await axios({
          method: 'POST',
          url: 'https://andarbahar65435.herokuapp.com/api/v1/money',
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

  const selectedColor = (id, amount) => {
    const newArrData = selected10k.map((e, index) => {
      if (id == e.id) {
        setSelectedValue(amount);
        return {
          ...e,
          selected: true,
        };
      }
      return {
        ...e,
        selected: false,
      };
    });
    setSelected10K(newArrData);
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#001f26',
        }}>
        <View
          style={{
            height: dimension.height * 0.1,
            borderBottomWidth: 1,
            borderColor: 'rgba(255,255,255,0.2)',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '30%',

              alignItems: 'center',
              marginTop: dimension.height * 0.01,
            }}>
            <Text
              style={{
                fontSize: RFValue(12),
                letterSpacing: 0.1,
                color: 'white',
              }}>
              Round
            </Text>
            <View
              style={{
                width: '70%',
                height: '22%',
                elevation: -2,
                backgroundColor: '#2fed88',
                borderRadius: 100,

                marginTop: dimension.height * 0.01,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: RFValue(12),
                  letterSpacing: 0.1,
                  color: 'white',
                }}>
                {second}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '40%',

              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              top: dimension.height * 0.01,
            }}>
            <View
              style={{
                height: '80%',
                width: '30%',
                backgroundColor: 'violet',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: 'white',
              }}>
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={require('../images/fb.png')}></Image>
            </View>
            <View
              style={{
                width: '40%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  width: '80%',
                  height: '70%',
                }}
                source={require('../images/vs.png')}></Image>
            </View>
            <View
              style={{
                height: '80%',
                width: '30%',
                backgroundColor: 'violet',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: 'white',
              }}>
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={require('../images/fl.png')}></Image>
            </View>
          </View>
          <View
            style={{
              width: '30%',

              alignItems: 'center',
              marginTop: dimension.height * 0.01,
            }}>
            <View
              style={{
                height: dimension.height * 0.04,
                width: dimension.height * 0.04,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.4)',
                borderRadius: 1000,
                elevation: 2,
                zIndex: 5,
              }}></View>
            <LinearGradient
              colors={['#e0b104', 'rgba(255,255,255,0)']}
              useAngle={true}
              angle={145}
              style={{
                width: '70%',
                paddingVertical: dimension.height * 0.003,
                paddingLeft: dimension.width * 0.02,
                marginTop: dimension.height * -0.005,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: RFValue(12),
                }}>
                1000
              </Text>
            </LinearGradient>
          </View>
        </View>
        <View
          style={{
            paddingVertical: dimension.height * 0.007,
            borderWidth: 1,
            borderColor: '#2fed88',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: dimension.height * 0.02,
            borderRadius: 100,
          }}>
          <FlatList
            horizontal={true}
            data={lastWinners}
            keyExtractor={(item, index) => `key${index}`}
            renderItem={({item}) => (
              <View
                style={{
                  height: dimension.height * 0.02,
                  width: dimension.height * 0.02,
                  borderRadius: 100,
                  backgroundColor: item == 'head' ? 'red' : '#4434ba',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: dimension.width * 0.01,
                }}>
                <View
                  style={{
                    height: dimension.height * 0.02,
                    width: dimension.height * 0.02,
                    borderRadius: 100,
                    backgroundColor: item == 'tie' ? 'green' : null,
                  }}></View>
              </View>
            )}></FlatList>
        </View>
        <LinearGradient
          colors={['#038035', 'rgba(168, 203, 173, 1)', '#038035']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={{
            borderWidth: 1,
            borderColor: 'rgba(244, 214, 20, 1)',
            alignItems: 'center',

            marginTop: dimension.height * 0.02,
            borderRadius: 10,
            width: dimension.width,
            height: dimension.height * 0.2,
          }}>
          <View
            style={{
              height: '15%',
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.1)',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: '95%',
                width: '6%',
                marginLeft: '2%',
              }}
              source={require('../images/coin.png')}></Image>
            <Text
              style={{
                fontSize: RFValue(14),
                marginLeft: '2%',
                color: 'white',
              }}>
              <CountUp
                isCounting
                end={randomvaluetie}
                duration={10}
                onComplete={onComplete}
              />
            </Text>
          </View>
          <View
            style={{
              height: '85%',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: RFValue(34),
                fontWeight: 'bold',
                alignSelf: 'center',
                color: 'rgba(0,0,0,0.3)',
              }}>
              TIE
            </Text>
          </View>
        </LinearGradient>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Pressable
            onPress={() => {
              moneyPutfnc('head');
            }}>
            <LinearGradient
              colors={[
                'rgba(15, 37, 158, 1)',
                'rgba(167, 180, 248, 1)',
                'rgba(15, 37, 158, 1)',
              ]}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={{
                borderWidth: 1,
                borderColor: 'rgba(244, 214, 20, 1)',
                alignItems: 'center',
                borderBottomLeftRadius: 100,
                marginTop: dimension.height * 0.02,
                borderRadius: 10,
                width: dimension.width * 0.48,
                height: dimension.height * 0.15,
              }}>
              <View
                style={{
                  height: '15%',
                  width: '100%',
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    height: '95%',
                    width: '10%',
                    marginLeft: '2%',
                  }}
                  source={require('../images/coin.png')}></Image>
                <Text
                  style={{
                    fontSize: RFValue(14),
                    marginLeft: '2%',
                    color: 'white',
                  }}>
                  <CountUp
                    isCounting
                    end={randomvaluetail}
                    duration={10}
                    onComplete={onComplete}
                  />
                </Text>
              </View>
              <View
                style={{
                  height: '85%',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: RFValue(26),
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    color: 'rgba(0,0,0,0.3)',
                  }}>
                  Andar
                </Text>
              </View>
            </LinearGradient>
          </Pressable>
          <Pressable
            onPress={() => {
              moneyPutfnc('tail');
            }}>
            <LinearGradient
              colors={[
                'rgba(199, 61, 7, 1)',
                'rgba(244, 156, 122, 1)',
                'rgba(199, 61, 7, 1)',
              ]}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={{
                borderWidth: 1,
                borderColor: 'rgba(244, 214, 20, 1)',
                alignItems: 'center',
                borderBottomRightRadius: 100,
                marginTop: dimension.height * 0.02,
                borderRadius: 10,
                width: dimension.width * 0.48,
                height: dimension.height * 0.15,
              }}>
              <View
                style={{
                  height: '15%',
                  width: '100%',
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    height: '95%',
                    width: '10%',
                    marginLeft: '2%',
                  }}
                  source={require('../images/coin.png')}></Image>
                <Text
                  style={{
                    fontSize: RFValue(14),
                    marginLeft: '2%',
                    color: 'white',
                  }}>
                  <CountUp
                    isCounting
                    end={randomvaluehead}
                    duration={10}
                    onComplete={onComplete}
                  />
                </Text>
              </View>
              <View
                style={{
                  height: '85%',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: RFValue(26),
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    color: 'rgba(0,0,0,0.3)',
                  }}>
                  Bahar
                </Text>
              </View>
            </LinearGradient>
          </Pressable>
        </View>
        <View
          style={{
            height: dimension.height * 0.3,
            marginTop: dimension.height * 0.02,
          }}>
          <View
            style={{
              height: '40%',
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                selectedColor(1, 10000);
              }}
              style={{
                height: '80%',
                width: '20%',
              }}>
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  borderWidth: 2,
                  borderColor: selected10k[0].selected ? 'yellow' : 'white',
                  borderRadius: 100,
                }}
                source={require('../images/10k.png')}></Image>
              <Text
                style={{
                  position: 'absolute',
                  top: '35%',
                  left: '28.7%',
                  color: 'white',
                  fontSize: RFValue(18),
                }}>
                10K
              </Text>
              <View
                style={{
                  height: dimension.height * 0.07,
                  width: dimension.height * 0.07,
                  borderWidth: 2,
                  borderColor: selected10k[0].selected ? 'yellow' : 'white',
                  borderRadius: 100,
                  position: 'absolute',
                  top: '13%',
                  left: '12.7%',
                }}></View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                selectedColor(2, 1000);
              }}
              style={{
                height: '80%',
                width: '20%',
              }}>
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  borderWidth: 2,
                  borderColor: selected10k[1].selected ? 'yellow' : 'white',
                  borderRadius: 100,
                }}
                source={require('../images/1k.png')}></Image>
              <Text
                style={{
                  position: 'absolute',
                  top: '35%',
                  left: '36.7%',
                  color: 'white',
                  fontSize: RFValue(18),
                }}>
                1K
              </Text>
              <View
                style={{
                  height: dimension.height * 0.07,
                  width: dimension.height * 0.07,
                  borderWidth: 2,
                  borderColor: selected10k[1].selected ? 'yellow' : 'white',
                  borderRadius: 100,
                  position: 'absolute',
                  top: '12%',
                  left: '13.7%',
                }}></View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: '40%',
              width: '100%',

              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                selectedColor(3, 5);
              }}
              style={{
                height: '80%',
                width: '20%',
              }}>
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  borderWidth: 2,
                  borderColor: selected10k[2].selected ? 'yellow' : 'white',
                  borderRadius: 100,
                }}
                source={require('../images/5.png')}></Image>
              <Text
                style={{
                  position: 'absolute',
                  top: '35%',
                  left: '41%',
                  color: 'white',
                  fontSize: RFValue(18),
                }}>
                5
              </Text>
              <View
                style={{
                  height: dimension.height * 0.07,
                  width: dimension.height * 0.07,
                  borderWidth: 2,
                  borderColor: selected10k[2].selected ? 'yellow' : 'white',
                  borderRadius: 100,
                  position: 'absolute',
                  top: '13.6%',
                  left: '12.4%',
                }}></View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                selectedColor(4, 50);
              }}
              style={{
                height: '80%',
                width: '20%',
              }}>
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  borderWidth: 2,
                  borderColor: selected10k[3].selected ? 'yellow' : 'white',
                  borderRadius: 100,
                }}
                source={require('../images/50.png')}></Image>
              <Text
                style={{
                  position: 'absolute',
                  top: '35%',
                  color: 'white',
                  fontSize: RFValue(18),
                  left: '37.3%',
                }}>
                50
              </Text>
              <View
                style={{
                  height: dimension.height * 0.07,
                  width: dimension.height * 0.07,
                  borderWidth: 2,
                  borderColor: selected10k[3].selected ? 'yellow' : 'white',
                  borderRadius: 100,
                  position: 'absolute',
                  top: '13.6%',
                  left: '13.6%',
                }}></View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                selectedColor(5, 100);
              }}
              style={{
                height: '80%',
                width: '20%',
              }}>
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  borderWidth: 2,
                  borderColor: selected10k[4].selected ? 'yellow' : 'white',
                  borderRadius: 100,
                }}
                source={require('../images/100.png')}></Image>
              <Text
                style={{
                  position: 'absolute',
                  top: '35%',
                  color: 'white',
                  fontSize: RFValue(18),
                  left: '29.5%',
                }}>
                100
              </Text>
              <View
                style={{
                  height: dimension.height * 0.07,
                  width: dimension.height * 0.07,
                  borderWidth: 2,
                  borderColor: selected10k[4].selected ? 'yellow' : 'white',
                  borderRadius: 100,
                  position: 'absolute',
                  top: '13.6%',
                  left: '13.6%',
                }}></View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                selectedColor(6, 500);
              }}
              style={{
                height: '80%',
                width: '20%',
              }}>
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  borderWidth: 2,
                  borderColor: selected10k[5].selected ? 'yellow' : 'white',
                  borderRadius: 100,
                }}
                source={require('../images/500.png')}></Image>
              <Text
                style={{
                  position: 'absolute',
                  top: '35%',
                  color: 'white',
                  fontSize: RFValue(18),
                  left: '29.5%',
                }}>
                500
              </Text>
              <View
                style={{
                  height: dimension.height * 0.07,
                  width: dimension.height * 0.07,
                  borderWidth: 2,
                  borderColor: selected10k[5].selected ? 'yellow' : 'white',
                  borderRadius: 100,
                  position: 'absolute',
                  top: '13.6%',
                  left: '13.6%',
                }}></View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default Tossgame;
