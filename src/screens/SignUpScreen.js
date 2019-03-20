import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import firebase from 'react-native-firebase';
import LinkButton from '../components/LinkButton';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import { StackActions, NavigationActions } from 'react-navigation';

const loginWithoutVerifiedEmailNavigation = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'VerifiedEmailScreen' })],
});
export default class SignUpScreen extends Component {
  
  static navigationOptions = {
    header: null
  }

  constructor(props){
    super(props);
    this.state={
      email: '',
      password: '',
      confirmPassword: '',
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

  handlePassword(text) {
    this.setState({password: text});
  }

  handleConfirmPassword(text) {
    this.setState({confirmPassword: text});
  }

  displayValidationMessage(){
    if (this.state.password == "" || this.state.confirmPassword == ""){
      return null;
    } else if (this.state.password == this.state.confirmPassword) {
      return <Text style={{color: 'green'}}>Passwords matched.</Text>;
    } else
      return <Text style={{color: 'red'}}>Passwords did not matched.</Text>;
  }

  displayPostMessage(){
    return <Text>{this.state.errorMessage}</Text>;
  }

  createUser(email, password){
    this.setState({errorMessage: ""});
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
    .then(response => {
      response.user.sendEmailVerification();
      this.props.navigation.dispatch(loginWithoutVerifiedEmailNavigation);
    })
    .catch(error => {
      switch(error.code) {
        case 'auth/email-already-in-use':
          this.setState({errorMessage: "Email already in use."});              
          break;
        case 'auth/invalid-email':
          this.setState({errorMessage: "Invalid email adress."});              
          break;
        case 'auth/operation-not-allowed':
          this.setState({errorMessage: "Oparation not allowed."});            
          break;
        case 'auth/weak-password':
          this.setState({errorMessage: "Weak password."});
          break;
      }
    });
  }  

  render() {
    return (
      <KeyboardAvoidingView
        behavior={'padding'}
        style={styles.container}
      >
        <View style={styles.componentContainer}>
          <Text style={styles.title}>Type Your Credentials</Text>
          <TextBox style={[{marginBottom: 10}, this.state.emailValidation ? {borderColor: 'green', borderWidth: 2} : {borderColor: 'red', borderWidth: 2}]}
            placeholder={'Email'}
            value={this.state.email}
            handleChange={(text) => this.handleEmail(text)}
          />     
          <TextBox style={{marginBottom: 10}}
            placeholder={'Password'}
            value={this.state.password}
            handleChange={(text) => this.handlePassword(text)}
            isSecure={true}
          />          
          <TextBox style={{marginBottom: 10}}
            placeholder={'Confirm Password'}
            value={this.state.confirmPassword}
            handleChange={(text) => this.handleConfirmPassword(text)}
            isSecure={true}
          />
          <View style={styles.validationMessage}>
            {this.displayValidationMessage()}
          </View>
          <View>
            <Text style={styles.postMessage}>{this.displayPostMessage()}</Text>
          </View>
          <Button
            title={'Create'}
            textColor='white'
            disabled={((!this.state.email || !this.state.password || !this.state.confirmPassword) || (this.state.password !== this.state.confirmPassword) || (!this.state.emailValidation)) ? true : false}
            onPress={() => this.createUser(this.state.email, this.state.password)}
          />
        </View>
        <View style={styles.bottomLine}>
          <Text style={{color: '#BCBCBC'}}>Already have an account? </Text>
          <LinkButton 
            title={'Sign In.'} 
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
  validationMessage: {
    marginBottom: 40
  },
  postMessage: {
    marginBottom: 10,
    color: 'red'
  }
});