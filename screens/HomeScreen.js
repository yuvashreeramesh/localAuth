import React, { useState,useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({value,onValueChange}) => {
 
  return(
      <Switch
      value={value}
      onValueChange={onValueChange}/>
     )
}
export default HomeScreen;
