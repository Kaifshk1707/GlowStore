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

const SignUpScreen = ({ navigation }) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert("Success", "User has been created. Please log in now.");
        navigation.navigate("SignInScreen");
      })
      .catch((err) => {
        Alert.alert("Sign Up Error", "Please enter a valid email address");
      });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 24,
        // backgroundColor: "#f2f5f9",
        backgroundColor: globalColor.lightGray,
        justifyContent: "center",
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f2f5f9" />

      {/* Title Image */}
      <Image
        source={require("./../../assets/images/SignUp.png")}
        style={{
          width: 150,
          height: 150,
          alignSelf: "center",
          marginBottom: 20,
          borderRadius: 75,
        }}
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
          marginBottom: 16,
          borderWidth: 1,
          borderColor: globalColor.borderColor,
          fontFamily: globalFontstyle.regular,
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
          marginBottom: 16,
          borderWidth: 1,
          borderColor: globalColor.borderColor,
          fontFamily: globalFontstyle.regular,
        }}
      />

      {/* Confirm Password Input */}
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholderTextColor={globalColor.black}
        style={{
          height: 52,
          backgroundColor: globalColor.white,
          borderRadius: 12,
          paddingHorizontal: 16,
          fontSize: 18,
          marginBottom: 24,
          borderWidth: 1,
          borderColor: globalColor.borderColor,
          fontFamily: globalFontstyle.regular,
        }}
      />

      {/* Sign Up Button */}
      <TouchableOpacity
        onPress={handleSignUp}
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
          Sign Up
        </Text>
      </TouchableOpacity>

      {/* Sign In Redirect */}
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
            fontFamily: globalFontstyle.semiBold,
          }}
        >
          Already have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
          <Text
            style={{
              color: globalColor.primary,
              fontSize: 18,
              fontFamily: globalFontstyle.semiBold,
              textDecorationLine: "underline",
              textDecorationColor: globalColor.primary,
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;
