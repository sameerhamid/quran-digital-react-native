import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '../utils/navigatorUtils';
import {NavScreenTags} from '../constants/NavScreenTags';
import Home from '../../screens/home.screen';
import Detail from '../../screens/detail.screen';

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  const RootStack = () => {
    return (
      <Stack.Navigator>
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
