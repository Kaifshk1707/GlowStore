import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "../screens/Home/HomeScreen";
import CartScreen from "../screens/Cart/CartScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import { globalColor } from "../styles/globalColors";

const Tab = createBottomTabNavigator();

const MainAppBottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          type RouteName = 'Home' | 'Cart' | 'Profile';
          type IoniconName = React.ComponentProps<typeof Ionicons>['name'];
          const icons: Record<RouteName, IoniconName> = {
            Home: focused ? "home" : "home-outline",
            Cart: focused ? "cart" : "cart-outline",
            Profile: focused ? "person" : "person-outline",
          };

          return <Ionicons name={icons[route.name as RouteName]} size={30} color={color} />;
        },
        tabBarActiveTintColor: globalColor.primary,
        tabBarInactiveTintColor: globalColor.darkGray,
        tabBarStyle: {
          backgroundColor: globalColor.white,
          borderTopWidth: 0.5,
          borderTopColor: "black",
          height: 50,
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="Cart" component={CartScreen} /> */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainAppBottomTab;
