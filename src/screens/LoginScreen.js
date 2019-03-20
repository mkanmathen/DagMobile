import React, {Component} from 'react';
import {StyleSheet, Text, Alert, KeyboardAvoidingView, View} from 'react-native';
import Button from '../components/Button';
import TextBox from '../components/TextBox';
import LinkButton from '../components/LinkButton';
import firebase from 'react-native-firebase';
import { StackActions, NavigationActions } from 'react-navigation';


const loginWithVerifiedEmailNavigation = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })],
});

const loginWithoutVerifiedEmailNavigation = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'VerifiedEmailScreen' })],
});
export default class LoginScreen extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    }
  }

  handleEmail(text) {
    this.setState({email: text});
  }

  handlePassword(text) {
    this.setState({password: text});
  }

  login(email, password) {
    this.setState({errorMessage: ""});
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(response => {
      if(response.user.emailVerified) {
        this.props.navigation.dispatch(loginWithVerifiedEmailNavigation);
      } else {
        this.props.navigation.dispatch(loginWithoutVerifiedEmailNavigation);
      }
    })
    .catch(error => {
      switch(error.code) {
        case 'auth/invalid-email':
          this.setState({errorMessage: "Invalid email adress."});
          break;
        case 'auth/user-disabled':
          this.setState({errorMessage: "User disabled."});
          break;
        case 'auth/user-not-found':
          this.setState({errorMessage: "User not found."});
          break;
        case 'auth/wrong-password':
          this.setState({errorMessage: "Wrong password."});
          break;
      }
    });   
  }

  displayPostMessage(){
    return <Text>{this.state.errorMessage}</Text>;
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={'padding'}
        style={styles.container}
      >
        <View style={styles.componentContainer}>
          <Text style={styles.title}>
            Dag Mobile
          </Text>
          <TextBox style={{marginBottom: 10}}
            value={this.state.email}
            placeholder={'Email'}
            handleChange={(text) => this.handleEmail(text)}
          />
          <TextBox style={{marginBottom: 10}}
            placeholder={'Password'}
            value={this.state.password}
            handleChange={(text) => this.handlePassword(text)}
            isSecure={true}
          />
          <LinkButton
            style={{marginBottom: 35}}
            title={'Forgot Password?'}
            color={'#E6720F'}
            align={'flex-end'}
            onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}
          />
          <View>
            <Text style={styles.postMessage}>{this.displayPostMessage()}</Text>
          </View>
          <Button
            title={'Log In'}
            textColor='white'
            disabled={!this.state.email || !this.state.password ? true : false}
            onPress={() => this.login(this.state.email, this.state.password)}
          />
        </View>
        <View style={styles.bottomLine}>
          <Text style={{color: '#BCBCBC'}}>Don’t have an account? </Text>
          <LinkButton 
            title={'Sign Up.'} 
            color={'#E6720F'} 
            onPress={() => this.props.navigation.navigate('SignUpScreen')} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 35,
    color: '#E6720F',
    alignSelf: 'center',
    fontWeight: 'bold',
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
