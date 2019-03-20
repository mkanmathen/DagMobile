import React , {Component} from 'react';
import {Text, Button, View} from 'react-native';

export default class LoginScreen extends Component {
  render() {
    return(
      <View>
        <Text>LoginScreen</Text>
        <Button title="ForgotPasswordScreen" onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}></Button>
        <Button title="SignUpScreen" onPress={() => this.props.navigation.navigate('SignUpScreen')}></Button>
        <Button title="HomeScreen" onPress={() => this.props.navigation.navigate('HomeScreen')}></Button>
      </View>
    );
  }
}