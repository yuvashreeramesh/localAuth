import React, { useEffect, useState } from 'react';
import { View, Text, AppState, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocalAuth from 'react-native-local-auth';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  const [appLocked, setAppLocked] = useState(false);

  useEffect(() => {
    getAppStatus();
  }, []);

  useEffect(() => {
    if (appLocked) {
      handleAuthentication();
    }
  }, [appLocked]);

  const handleAuthentication = () => {
    LocalAuth.authenticate({
      reason: 'This is a secure area, please authenticate yourself',
      fallbackToPasscode: true,
      suppressEnterPassword: true,
    })
      .then(success => {
        console.log('Authenticated Successfully');
      })
      .catch(error => {
        console.log('Authentication Failed', error.message);
      });
  };

  const saveAppStatus = async (value) => {
    try {
      await AsyncStorage.setItem('@app_lock_enabled', value.toString());
      setAppLocked(value); // Update the appLocked state with the new value
    } catch (error) {
      console.log('Error saving app lock status:', error);
    }
  };

  const getAppStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('@app_lock_enabled');
      if (value !== null) {
        setAppLocked(value === 'true');
      }
    } catch (error) {
      console.error('Error loading app lock status:', error);
    }
  };

  const handleToggle = (value) => {
    console.log('toggle', value);
    saveAppStatus(value);
  };

  return (
    
   
    <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
      <Text style={{color:"white",fontSize:15}}>Swipe to enable app lock</Text>
      <HomeScreen value={appLocked} onValueChange={handleToggle} />
    </View>
    
   
  );
};

export default App;
