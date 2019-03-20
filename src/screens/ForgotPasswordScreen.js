import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import LinkButton from '../components/LinkButton';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import firebase from 'react-native-firebase';
import { StackActions, NavigationActions } from 'react-navigation';

const resetPasswordNavigation = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })],
});

export default class ForgotPasswordScreen extends Component {
  
  static navigationOptions = {
    header: null
  }

  constructor(props){
    super(props);
    this.state={
      email: '',
      emailValidation: null,
      errorMessage: ''
    }
  }

  handleEmail(text) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(reg.test(text) === false){
      this.setState({email:text, emailValidation: false})
    }
    else {
      this.setState({email:text, emailValidation: true})
    }
  }

  resetPassword(email) {
    this.setState({errorMessage: ''});
    firebase.auth().sendPasswordResetEmail(email)
    .then(response => {
        Alert.alert(
        'Email Send',
        'Please check your email.',
        [
          {
            text: 'OK', 
            onPress: () => this.props.navigation.dispatch(resetPasswordNavigation)
          },
        ],
        {cancelable: false},
      );

    })
    .catch(error => {
      switch(error.code) {
        case 'auth/invalid-email':
        this.setState({errorMessage: 'Invalid email adress.'});
        break;
        case 'auth/user-not-found':
        this.setState({errorMessage: 'User not found.'});
        break;
      }
    });
  }

  displayPostMessage(){
    return <Text>{this.state.errorMessage}</Text>;
  }

  render() {
    return(
      <KeyboardAvoidingView
        behavior={'padding'}
        style={styles.container}
      >
        <View style={styles.componentContainer}>
          <Text style={styles.title}>Type Your Email Adress</Text>
          <TextBox style={[{marginBottom: 40}, this.state.emailValidation ? {borderColor: 'green', borderWidth: 2} : {borderColor: 'red', borderWidth: 2}]}
            placeholder={'Email'}
            value={this.state.email}
            handleChange={(text) => this.handleEmail(text)}
          />
          <View>
            <Text style={styles.postMessage}>{this.displayPostMessage()}</Text>
          </View>
          <Button
            title={'Send Reset Mail'}
            textColor='white'
            disabled={!this.state.email || !this.state.emailValidation ? true : false}
            onPress={() => this.resetPassword(this.state.email)}
          />
        </View>
        <View style={styles.bottomLine}>
          <LinkButton 
            title={'Back To Log In'} 
            color={'#E6720F'} 
            onPress={() => this.props.navigation.navigate('LoginScreen')} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
  title: {
    fontSize: 25,
    color: '#313131',
    alignSelf: 'center',
    marginBottom: 35
  },
  bottomLine: {
    borderTopWidth: 0.5,
    borderColor: '#BCBCBC',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  componentContainer: {
    marginLeft: 22,
    marginRight: 22
  },
  postMessage: {
    marginBottom: 10,
    color: 'red'
  }
});