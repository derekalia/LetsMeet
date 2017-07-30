import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import data from './src/data';
import { Tabs } from './src/router';
import Login from './src/components/Login';
import Chat from './src/screens/Chat';
import createOrUpdateUser from './src/createOrUpdateUser'

import googleAuth from './src/googleAuth';


export default class App extends React.Component {
  state = {
    auth: null
  };

  captureAuth = async () => {
    const auth = await googleAuth();
    try {
      await createOrUpdateUser(auth.user)
      this.setState({auth: auth})
    } catch (error) {
      console.log('Error: (shit broke) ', error)
    }
  };

  render() {
    const screenProps = {
      map: {
        people: data
      },
      auth : (this.state.auth || {}).user
    };
    
    return this.state.auth ? <Tabs screenProps={screenProps} /> : <Login captureAuth={this.captureAuth} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
