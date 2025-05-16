import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  Image,
} from "react-native";
import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import { globalColor } from "../../styles/globalColors";
import { globalFontstyle } from "../../styles/fontStyle";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert("Success", "Logged in successfully");
        navigation.navigate("MainAppBottomTab");
      })
      .catch((err) => {
        console.log("Login Error:", err);
        Alert.alert("Login Error", err.message);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: globalColor.lightGray,
        justifyContent: "center",
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={globalColor.lightGray}
      />

      {/* App Logo */}
      <Image
        source={require("./../../assets/images/SignUp.png")}
        style={{
          width: 150,
          height: 150,
          alignSelf: "center",
          marginBottom: 20,
          borderRadius: 75,
        }}
        resizeMode="contain"
      />

      {/* Email Input */}
      <TextInput
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={globalColor.black}
        style={{
          height: 52,
          backgroundColor: globalColor.white,
          borderRadius: 12,
          paddingHorizontal: 16,
          fontSize: 18,
          fontFamily: globalFontstyle.regular,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: globalColor.borderColor,
        }}
      />

      {/* Password Input */}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={globalColor.black}
        style={{
          height: 52,
          backgroundColor: globalColor.white,
          borderRadius: 12,
          paddingHorizontal: 16,
          fontSize: 18,
          fontFamily: globalFontstyle.regular,
          marginBottom: 24,
          borderWidth: 1,
          borderColor: globalColor.borderColor,
        }}
      />

      {/* Sign In Button */}
      <TouchableOpacity
        onPress={handleSignIn}
        style={{
          backgroundColor: globalColor.primary,
          paddingVertical: 16,
          borderRadius: 12,
          alignItems: "center",
          shadowColor: globalColor.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Text
          style={{
            color: globalColor.white,
            fontSize: 18,
            fontFamily: globalFontstyle.semiBold,
          }}
        >
          Sign In
        </Text>
      </TouchableOpacity>

      {/* Sign Up Redirect */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 32,
        }}
      >
        <Text
          style={{
            color: globalColor.black,
            fontSize: 18,
            fontFamily: globalFontstyle.regular,
          }}
        >
          Don’t have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
          <Text
            style={{
              color: globalColor.primary,
              fontSize: 18,
              fontFamily: globalFontstyle.semiBold,
              textDecorationLine: "underline",
              textDecorationColor: globalColor.primary,
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;
