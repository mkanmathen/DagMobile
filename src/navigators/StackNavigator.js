import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPassword";
import HomeScreen from "../screens/HomeScreen";

const AppNavigator = createStackNavigator({
  LoginScreen: LoginScreen,
  SignUpScreen: SignUpScreen,
  ForgotPasswordScreen: ForgotPasswordScreen,
  HomeScreen: HomeScreen
});

export default createAppContainer(AppNavigator);