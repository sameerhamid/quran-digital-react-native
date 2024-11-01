import {Image, StyleSheet} from 'react-native';
import React from 'react';

import {NavScreenTags} from '../constants/navScreenTags';
import Home from '../../screens/Home/home.screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Detail from '../../screens/Details/detail.screen';
import {RootStackParamList} from './appNavigation';
import Qubla from '../../screens/Qubla/qibla.screen';
import {Images} from '../constants/Imges';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabNamesEnums} from '../constants/Enums';
import Colors from '../constants/Color.constants';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator<RootStackParamList>();

const QuranStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={NavScreenTags.HOME_SCREEN}>
      <Stack.Screen name={NavScreenTags.HOME_SCREEN} component={Home} />
      <Stack.Screen name={NavScreenTags.DETAIL_SCREEN} component={Detail} />
    </Stack.Navigator>
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={NavScreenTags.QURAN_STACK}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.purple1,
        tabBarInactiveTintColor: Colors.grey2,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          paddingVertical: 4,
          height: 50,
        },
      }}>
      <Tab.Screen
        name={NavScreenTags.QURAN_STACK}
        component={QuranStack}
        options={{
          tabBarLabel: `${BottomTabNamesEnums.HOME}`,
          tabBarIcon: ({color}) => (
            <Image
              source={Images.Icons.Home}
              style={{tintColor: color, ...styles.icons}}
            />
          ),
        }}
      />
      <Tab.Screen
        name={NavScreenTags.QIBLA}
        component={Qubla}
        options={{
          tabBarLabel: `${BottomTabNamesEnums.QIBLA_FINDER}`,
          tabBarIcon: ({color}) => (
            <Image
              source={Images.Icons.Qibla}
              style={{tintColor: color, ...styles.icons}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  icons: {
    width: 26,
    height: 26,
  },
});
