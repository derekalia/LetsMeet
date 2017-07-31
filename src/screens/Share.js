import React from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import createOrUpdateUser from '../createOrUpdateUser';
import Location from '../userLocation';

class Share extends React.Component {
  state = {
    text: ''
  };

  //change the activity to whatever is clicked and set active to true
  upDateActivity = async(act) => {  
    let location = await Location();
    let user = {
        ...this.props.screenProps,
        activity: act,
        isActive: true,
        coords: location.coords

    }
    console.log('user ',user)
    createOrUpdateUser(user)
  }
  

  render() {
    return (
      <View>
        <Text>Share</Text>
        <Button title="Coffee" onPress={()=>this.upDateActivity('coffee')}/>
        <Button title="Running" onPress={() => this.upDateActivity('running')}/>
        <Button title="Movie" onPress={() => console.log('hi')}/>
        <Button title="Food" onPress={() => console.log('hi')}/>
        <Button title="Drinks" onPress={() => console.log('hi')}/>
        <Button title="Sports" onPress={() => console.log('hi')}/>

        <TextInput placeholder='Enter something else' onChangeText={text => this.setState({ text })} value={this.state.text} />
        <Button title='Submit' onPress={() => console.log('hi')}/>
            
      </View>
    );
  }
}

export default Share;
