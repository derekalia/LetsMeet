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
    auth: null,
    activeUsers: true,
    user: null,
    screenProps: null
  };

  // getActive = async() => {
  //   console.log('getActive');    
  //   return await rapidClient.collection('users').filter({ isActive: true }).fetch()    
  // };

  getAuth = async() => {
     return await rapidClient.collection('users').filter({ id: this.state.auth.id }).fetch();
  };

  captureAuth = async () => {
    const UserAuth = await googleAuth();
    try {      
      this.setState({auth:UserAuth.user})
      await createOrUpdateUser(UserAuth.user);      
     
      // let active = await this.getActive();
      // this.setState({activeUsers:active})
     
      let auth = await this.getAuth();
      this.setState({auth:auth[0].body})
      console.log(this.state.auth)
    
    } catch (error) {
      console.log('Error: (shit broke) ', error);
    }
     
     
      if(this.state.auth && this.state.activeUsers){
      // activeUsers = this.state.activeUsers;
      auth = this.state.auth;
       const screenProps = {
          people: this.state.activeUsers,
          auth: this.state.auth
        };
      this.setState({screenProps})
    }


      // rapidClient.collection('users')
      //   .filter({id: this.state.auth.id})
      //   .subscribe(users => {
      //     console.log('users',users)
      //     const userData = users.map(user => {
      //       return user.body
      //     })
      //     const auth = {
      //       user: userData[0]
      //     }
      //     this.setState({auth})
      //     console.log('State Reset!!', this.state.auth)

          
      //   }, error => {
      //     console.log('Error: ', error)
      //   })
        


        //  rapidClient.collection('users')
        // .filter({isActive: true})
        // .subscribe(users => {
        //   const activeUsers = users.map(user => {
        //     return user.body
        //   })
        //   this.setState({activeUsers})
        //   console.log('active users in app',this.state.activeUsers)
        // }, error => {
        //   console.log('Error: ', error)
        // })



  };

  render() {

    console.log('this.state.screenProps in map', this.state.screenProps);
    return this.state.screenProps
      ? <Tabs screenProps={this.state.screenProps} />
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
