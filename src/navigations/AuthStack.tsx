import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../components/Auth/SignInScreen";
import SignUpScreen from "../components/Auth/SignUpScreen";


const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
