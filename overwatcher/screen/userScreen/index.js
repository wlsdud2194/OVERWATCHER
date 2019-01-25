import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import MapScreen from "./MapScreen";
import NoticeScreen from "./NoticeScreen";
import ProfileScreen from "./ProfileScreen";

import { Ionicons, Feather, Entypo } from '@expo/vector-icons';

const AppRoot =  createMaterialBottomTabNavigator({
    MapScreen: {
        screen: MapScreen,
        navigationOptions: {
            title: "Map",
            tabBarColor: "#80d4ff",
            tabBarIcon: <Feather name="map-pin" size={24} color="white"/>
        }
    },
    NoticeScreen: {
        screen: NoticeScreen,
        navigationOptions: {
            title: "Notice",
            tabBarColor: "#4dc3ff",
            tabBarIcon: <Ionicons name="ios-notifications" size={24} color="white"/>
        }
    },
    ProfileScreen: {
        screen:  ProfileScreen,
        navigationOptions: {
            title: "Profile",
            tabBarColor: "#1ab2ff",
            tabBarIcon: <Entypo name="user" size={24} color="white"/>
        }
    },
  }, {
    shifting: true,
    initialRouteName: 'MapScreen',
});

const AppRootContainer = createAppContainer(AppRoot);

export default AppRootContainer;