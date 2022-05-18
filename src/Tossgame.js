import React, {useState, useEffect} from 'react';

import {Text, View, TouchableOpacity} from 'react-native';
import axios from 'axios';

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
  const [winnerinterval, setWinnerInterval] = useState(2);
  const [lastWinners, setLastWinners] = useState(['a', 'b', 'c']);

  useEffect(() => {
    getfirstData();
    // setLastWinners(lastWinners.slice(1));
  }, []);
  const getfirstData = async () => {
    try {
      const response = await axios.get(
        'http://192.168.0.103:4000/api/v1/started',
      );
      setData(response.data.game);

      //console.log(winner.data);
      console.log(response.data.game.currentRound);
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
            'http://192.168.0.103:4000/api/v1/winner',
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

  const moneyPutfnc = async value => {
    if (new Date(data.depositEndTime) >= new Date(Date.now())) {
      console.log(value);

      try {
        var body = {
          amount: 100,
          placed: value,
        };

        const isPut = await axios({
          method: 'POST',
          url: 'http://192.168.0.103:4000/api/v1/money',
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

  return (
    <>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            backgroundColor: 'red',
            justifyContent: 'space-around',

            height: '10%',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, color: 'white'}}>Wallet</Text>
          <Text>{wallet} </Text>
        </View>
        <View
          style={{
            height: '20%',
            backgroundColor: 'pink',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 20, color: 'black'}}>
            {minute} {second}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'blue',
            justifyContent: 'space-around',
            flexDirection: 'row',
            height: '50%',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: '40%',
              width: '35%',
              backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              moneyPutfnc('head');
            }}>
            <View
              style={{
                height: '40%',
                width: '35%',
                backgroundColor: 'black',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 20, color: 'white'}}>Head</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: '40%',
              width: '35%',
              backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              moneyPutfnc('tail');
            }}>
            <View
              style={{
                height: '40%',
                width: '35%',
                backgroundColor: 'black',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 20, color: 'white'}}>Tail</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: 'red',
            justifyContent: 'space-around',

            height: '10%',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, color: 'white'}}>Winner</Text>
          <Text>{lastWinners.join(' ')} </Text>
        </View>
        {winner ? (
          <>
            <View
              style={{
                backgroundColor: 'green',
                justifyContent: 'space-around',

                height: '10%',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 20, color: 'white'}}>Winner</Text>
              <Text>{currentWinner} </Text>
            </View>
          </>
        ) : null}
      </View>
    </>
  );
};

export default Tossgame;
