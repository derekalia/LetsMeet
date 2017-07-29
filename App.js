import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import rapidClient from './src/rapid';
import MapScreen from './src/components/MapScreen';
import UserLocation from './src/components/UserLocation'
import data from './src/data'

export default class App extends React.Component {
  render() {
    const toDos = rapidClient.collection('my-todo-list');
    const toDo1 = toDos.document('todoItem');
    const newToDo = toDos.newDocument();
    toDos.subscribe(toDos => {      
      console.log('Hello');
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
    // <MapScreen />      
    return (
      <MapScreen people={data} />        
      // <View>
      //   <UserLocation/>

      // </View>  

    );
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
