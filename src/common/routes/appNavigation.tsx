import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '../utils/navigatorUtils';

import Home from '../../screens/Home/home.screen';
import Detail from '../../screens/Details/detail.screen';
import {NavScreenTags} from '../constants/navScreenTags';

export type RootStackParamList = {
  [NavScreenTags.HOME_SCREEN]: undefined;
  [NavScreenTags.DETAIL_SCREEN]: {surahNumber: number}; // Detail screen expects id and name
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const AppNavigation = () => {
  const RootStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={NavScreenTags.HOME_SCREEN} component={Home} />
        <Stack.Screen name={NavScreenTags.DETAIL_SCREEN} component={Detail} />
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack />
    </NavigationContainer>
  );
};

export default AppNavigation;
