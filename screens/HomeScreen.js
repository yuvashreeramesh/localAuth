import React, { useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, Alert } from 'react-native';
import LocalAuth from 'react-native-local-auth';

const HomeScreen= () => {
  const [authenticated, setAuthenticated] = useState(false);

  const _pressHandler = () => {
    LocalAuth.authenticate({
      reason: 'please authenticate yourself',
      fallbackToPasscode: true,
      suppressEnterPassword: true,
    })
      .then(success => {
        console.log('Authenticated Successfully');
        setAuthenticated(true);
      })
      .catch(error => {
        console.log('Authentication Failed', error.message);
        setAuthenticated(false);
      });
  };

  useEffect(() => {
    _pressHandler();
  }, []);

  return (
    <View>
     
      {authenticated ? (
        <Text style={{ fontSize: 20, color: 'black' }}>Hi, you are authenticated!</Text>
      ) : (
        <Text style={{ fontSize: 20, color: 'black' }}>
          To continue, authenticate yourself
        </Text>
      )}
    </View>
  );
};

export default HomeScreen;
