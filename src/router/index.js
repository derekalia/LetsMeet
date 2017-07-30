import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Map from '../screens/Map';
import Chats from '../screens/Chats';
import Chat from '../screens/Chat';
import Share from '../screens/Share'

const ChatStack = StackNavigator({
  Chats: {
    screen: Chats
  },
  Chat: {
    screen: Chat
  }
});

export const Tabs = TabNavigator(
  {
    Map: {
      screen: Map,
      navigationOptions: {
        tabBarlabel: 'Map',
        tabBarIcon: ({ tintColor }) => <Icon name="map" size={30} color={tintColor} />,
      },
    },
    Messages: {
      screen: ChatStack,
      navigationOptions: {
        tabBarlabel: 'Profile',
        tabBarIcon: ({ tintColor }) => <Icon name="search" size={30} color={tintColor} />,
        tabBarVisible: true,
      }
    },
    Share: {
      screen: Share,
      navigationOptions: {
        tabBarlabel: 'Share',
        tabBarIcon: ({ tintColor }) => <Icon name="add" size={30} color={tintColor} />,
        tabBarVisible: true
      }
    },
    Friends: {
      screen: ChatStack,
      navigationOptions: {
        tabBarlabel: 'Profile',
        tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={30} color={tintColor} />,
        tabBarVisible: true,   
      }
    }
  },
  {
    swipeEnabled: true,
    animationEnabled: true
  }
);
