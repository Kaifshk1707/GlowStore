import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import MainAppBottomTab from "./MainBottomTab";
import ChatListScreen from "../components/Chats/ChatListScreen";
import ChatScreen from "../components/Chats/ChatScreen";
import CreatePostScreen from "../components/Posts/CreatePostScreen";
import StoryView from "../components/Headers/StoryView";
import AddOrder from "../components/DashBoard/AddOrder";

const Stack = createStackNavigator();

const MainAppStack = () => {
  return (
    <Stack.Navigator
      // initialRouteName={"AuthStack"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="MainAppBottomTab" component={MainAppBottomTab} />
      <Stack.Screen name="AddOrder" component={AddOrder} />
    </Stack.Navigator>
  );
};
export default MainAppStack;
