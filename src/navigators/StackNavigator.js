import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import VerifiedEmailScreen from "../screens/VerifiedEmailScreen";

const AppNavigator = createStackNavigator({
  LoginScreen: LoginScreen,
  SignUpScreen: SignUpScreen,
  ForgotPasswordScreen: ForgotPasswordScreen,
  HomeScreen: HomeScreen,
  VerifiedEmailScreen: VerifiedEmailScreen
});

export default createAppContainer(AppNavigator);