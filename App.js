import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import rapidClient from './src/rapid';

import data from './src/data';
import { Tabs } from './src/router';
import Login from './src/components/Login';
import Chat from './src/screens/Chat';

import googleAuth from './src/googleAuth';


export default class App extends React.Component {
  state = {
    auth: null
  };

  captureAuth = async () => {
    let auth = await googleAuth();
    this.setState({ auth });
  };

  render() {
    const toDos = rapidClient.collection('my-todo-list');
    const toDo1 = toDos.document('todoItem');
    const newToDo = toDos.newDocument();
    toDos.subscribe(toDos => {      
      console.log(toDos);
    });

    toDo1.mutate({
      text: 'hello world'
    });

    toDo1
      .merge({
        completed: true, // set completed to true
        completionDate: Date.now() // add a completion date
      })
      .then(() => console.log('Mutated!!'));
    
    const screenProps = {
      map: {
        people: data
      },
      auth : this.state.auth
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
