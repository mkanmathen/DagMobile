import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class HomeScreen extends Component {
  
  static navigationOptions = {
    header: null
  }
  
  render() {
    return (
      <View>
        <Text>HomeScreen</Text>
      </View>
    )
  }
}