import React from 'react';
import { Text, View,Button } from 'react-native';

class Chats extends React.Component {
  
  goToChat = () => {
    this.props.navigation.navigate('Chat');
  };

  render() {
    return (
      <View>
        <Text>Chats</Text>
        <Button title='Chat with Koi' onPress={this.goToChat} />
      </View>
    );
  }
}

export default Chats;
