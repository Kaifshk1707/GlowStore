import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { globalColor } from "../../styles/globalColors";
import { globalFontstyle } from "../../styles/fontStyle";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  const handleSignOut = () => {
    if (!user) {
      Alert.alert("Error", "No user currently signed in.");
      return;
    }

    auth()
      .signOut()
      .then(() => {
        Alert.alert("Success", "Logged out successfully");
        navigation.replace("SignInScreen");
      })
      .catch((error) => {
        console.log("Logout Error:", error);
        Alert.alert("Logout Error", error.message);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header Section */}
        <View
          style={{
            backgroundColor: "#fff",
            padding: 20,
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#ddd",
            top:"10%"
          }}
        >
          <Image
            source={require("./../../assets/images/SignUp.png")}
            style={{
              width: 150,
              height: 150,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>IdeaMagix</Text>
          <Text style={{ color: "#555", fontSize: 18, fontWeight: "bold" }}>
            {user?.email ?? "Not signed in"}
          </Text>
        </View>

        {/* Other content here if needed */}

        <View style={{ flex: 1 }} />
        {/* Empty view to push logout button to bottom */}

        {/* Logout Button */}
        <View
          style={{
            padding: 16,
            backgroundColor: "#F5F5F5",
          }}
        >
          <TouchableOpacity
            onPress={handleSignOut}
            style={{
              backgroundColor: globalColor.primary,
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: globalColor.white,
                fontSize: 16,
                fontFamily: globalFontstyle.semiBold,
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
