import React from 'react';
import { Text, View, Button, TextInput } from 'react-native';

class Share extends React.Component {
  state = {
    text: ''
  };

  render() {
    return (
      <View>
        <Text>Share</Text>
        <Button title="Coffee" onPress={() => console.log('hi')}/>
        <Button title="Running" onPress={() => console.log('hi')}/>
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
