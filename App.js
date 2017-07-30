import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import data from './src/data';
import { Tabs } from './src/router';
import Login from './src/components/Login';
import Chat from './src/screens/Chat';
import createOrUpdateUser from './src/createOrUpdateUser'

import googleAuth from './src/googleAuth';

import rapidClient from './src/rapid';


export default class App extends React.Component {
  state = {
    auth: null, 
    activeUsers: null,
    user: null
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
    if(this.state.auth) {

      rapidClient.collection('users')
        .filter({isActive: true})
        .subscribe(users => {
          const activeUsers = users.map(user => {
            return user.body
          })
          this.setState({activeUsers})
        }, error => {
          console.log('Error: ', error)
        })

        console.log(this.state.auth.id)
         rapidClient.collection('users')
        .filter({id: this.state.auth.user.id})
        .subscribe(users => {
          console.log('users',users)
          const userData = users.map(user => {
            return user.body
          })
          const auth = {
            user: userData[0]
          }
          console.log('State Reset!!', this.state.auth)
          this.setState({auth})
          
        }, error => {
          console.log('Error: ', error)
        })
    }
    
    const screenProps = {
        map: {
          people: this.state.activeUsers
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
