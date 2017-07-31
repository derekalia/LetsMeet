import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import data from './src/data';
import { Tabs } from './src/router';
import Login from './src/components/Login';
import Chat from './src/screens/Chat';
import createOrUpdateUser from './src/createOrUpdateUser';

import googleAuth from './src/googleAuth';

import rapidClient from './src/rapid';

export default class App extends React.Component {
  state = {
    deets: null,
    auth: null,
  };

  getAuth = async() => {
     return await rapidClient.collection('users').filter({ id: this.state.deets.id }).fetch();
  };

  captureAuth = async () => {
    const UserAuth = await googleAuth();
    try {      
      this.setState({deets:UserAuth.user})
      await createOrUpdateUser(UserAuth.user);      
     
      let auth = await this.getAuth();
      this.setState({auth:auth[0].body})  
      console.log('auth obj ', auth)   
    
    } catch (error) {
      console.log('Error: (shit broke) ', error);
    }
        
  };

  render() {    
    console.log('this is the auth in app', this.state)
    return this.state.auth
      ? <Tabs screenProps={this.state.auth} />
      : <Login captureAuth={this.captureAuth} />;
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
