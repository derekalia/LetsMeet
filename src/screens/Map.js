import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Button, TouchableHighlight } from 'react-native';
import getLocation from '../userLocation';
import { Constants, Location, Permissions, MapView } from 'expo';
import createOrUpdateUser from '../createOrUpdateUser';
import rapidClient from '../rapid';

export default class Map extends React.Component {
  state = {
    location: null,
    errorMessage: null,
    activeUsers: null,
    auth: {}
  };

  componentWillMount = async () => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      });
    } else {
      try {
        const location = await getLocation();
        this.setState({ location });

        this.setState({ auth: this.props.screenProps });

        rapidClient.collection('users').filter({ isActive: true }).subscribe(
          users => {
            const activeUsers = users.map(user => {
              return user.body;
            });
            console.log('activeUsers in map', activeUsers);
            this.setState({ activeUsers });
          },
          error => {
            console.log('Error: ', error);
          }
        );

       rapidClient.collection('users').filter({ id: this.state.auth.id }).subscribe(
          users => {
            console.log('users', users);
            const userData = users.map(user => {
              return user.body;
            });
            this.setState({ auth: userData[0] });
            console.log('State Reset!! in map', this.state.auth);
          },
          error => {
            console.log('Error: ', error);
          }
        );
        
      } catch (error) {
        this.setState({
          errorMessage: error.message
        });


         
      }
    }
  };

  stopSharing = () => {
    console.log('stopSharing', this.state);
    createOrUpdateUser({ id: this.state.auth.id, isActive: false, activity: null });
  };

  // getMarkers = () => {
  //   const { people } = this.props
  //   // console.log(people);
  //   const markers = (people || [])
  //     .map(person =>
  //       <MapView.Marker
  //         key={person.id}
  //         coordinate={person.coords}
  //         title={person.name}
  //         description={person.activity}
  //         image={{ uri: person.avatar }}
  //       />
  //     );
  //   console.log(markers);
  //   return markers;
  // };

  render() {
    console.log('this.props', this.props);
    console.log('the state', this.state);
    console.log(!!this.state.auth.isActive)
    let button = this.state.auth.isActive
      ?  <Button style={{ backgroundColor: 'pink' }} onPress={() => this.stopSharing()} title="Remove" />
      :  <Button style={{ backgroundColor: 'pink' }} title="Its gone" />;
    
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.774929,
          longitude: -122.419416,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04
        }}
      >
        {button}
        {this.state.activeUsers &&
          this.state.activeUsers.map(marker =>
            <MapView.Marker
              coordinate={marker.coords}
              title={marker.name}
              key={marker.id}
              description={marker.activity}
            />
          )}
        {this.state.location &&
          <MapView.Marker coordinate={this.state.location.coords} title="Me" description="Hacking" />}
      </MapView>
    );
  }
}
