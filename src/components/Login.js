import React from 'react';
import { Text, Button, TextInput,View } from 'react-native';


export default class Login extends React.Component {
  state = {
    email: '',
    password: '',    
  };


  render() {      
    return (
      <View>        
         <Button title="Login With Google" onPress={this.props.captureAuth} />         
      </View>
    );
  }
}
