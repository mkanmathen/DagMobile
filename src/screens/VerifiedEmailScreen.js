import React, {Component} from 'react';
import {StyleSheet, Text, Alert, View} from 'react-native';
import Button from '../components/Button';


export default class VerifiedEmailScreen extends Component {
  
  static navigationOptions = {
    header: null
  }

  constructor(props){
    super(props);
    this.state={
      actionButtonTitle: "Control Email Verification",
      actionButtonColor: "#E6720F",
      emailVerified: false
    }
  }

  buttonControl() {
    if(!this.state.emailVerified){
      // TODO: Email verified control function will be added here. Function will control user emailVerified property. If its true function will set emailVerified, actionButtonTitle and actionButtonColor.
    } else {
      this.props.natigation.navigate('LoginScreen');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* TODO: Murat Kan will be set dynamicly. */}
        <Text style={styles.title}>Welcome Murat Kan!</Text>
        <Text style={styles.description}>We sent you a verification email. You can verify your account by clicking on the verification link in the inbox. You will be able to access the application after verification. We look forward to seeing you among us. Welcome to us now.</Text>
        <Button 
          title={this.state.actionButtonTitle}
          textColor='white'
          color={this.state.actionButtonColor}
          onPress={() => Alert.alert('Function Will Be Added')}>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    marginLeft: 22,
    marginRight: 22
  },
  title: {
    fontSize: 25,
    color: '#313131',
    alignSelf: 'center',
    marginBottom: 30
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 45
  }
});
