import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import getLocation from '../userLocation';
import { Constants, Location, Permissions, MapView } from 'expo';

export default class Map extends React.Component {
  state = {
    location: null,
    errorMessage: null
  };

  componentWillMount = async () => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      });
    } else {
      try {        
        const location = await getLocation();
        console.log('Location? ', location);
        this.setState({
          location
        });
      } catch (error) {
        this.setState({
          errorMessage: error.message
        });
      }
    }
  };

  render() {
    const { people } = this.props.screenProps.map;
    const markers = (people || []).map(person =>
      <MapView.Marker
        key={person.name + person.activity}
        coordinate={person.coords}
        title={person.name}
        description={person.activity}
        image={{ uri: person.avatar }}
      />
    );

    if (this.state.location) {
      console.log(this.state.location.coords);

      text = JSON.stringify(this.state.location);
    }
    return this.state.location
      ? <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04
          }}
        >
          {markers}
          <MapView.Marker coordinate={this.state.location.coords} title="Me" description="Hacking" />
        </MapView>
      : null;
  }
}