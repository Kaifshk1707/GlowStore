import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import AppAreaView from "../View/safeAreaView";
import { Ionicons } from "@expo/vector-icons";
import { globalColor } from "../../styles/globalColors";
import { useNavigation } from "@react-navigation/native";

const CreatePostScreen = () => {
  const navigation = useNavigation();
  const [selectedImageURI, setSelectedImageURI] = useState("");
  const [description, setDescription] = useState("");

  const openCamera = async () => {
    try {
      const result = await launchCamera({ mediaType: "photo" });
      setSelectedImageURI(result.assets[0]?.uri);
    } catch (error) {
      console.log("Camera Error:", error);
    }
  };

  const openGallery = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: "photo" });
      setSelectedImageURI(result.assets[0]?.uri);
    } catch (error) {
      console.log("Gallery Error:", error);
    }
  };

  const createPost = ()=>{
     navigation.goBack();
     Alert.alert("Post created")
  }

  return (
    <AppAreaView style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Create New Post
      </Text>

      {selectedImageURI ? (
        <Image
          source={{ uri: selectedImageURI }}
          style={{
            width: "45%",
            height: "25%",
            borderRadius: 10,
            marginBottom: 20,
            resizeMode: "cover",
            alignSelf: "center",
          }}
        />
      ) : null}

      <ScrollView
        style={{
          borderRadius: 7,
          marginVertical: 20,
          borderColor: globalColor.gray,
          borderWidth: 1,
          padding: 5,
          marginBottom: 20,
        }}
      >
        <TextInput
          placeholder="Write description"
          value={description}
          onChangeText={setDescription}
          multiline
          style={{
            backgroundColor: globalColor.lightGray,
            borderRadius: 10,
            padding: 10,
            minHeight: 60,
            fontSize: 16,
            color: "#333",
            textAlignVertical: "top",
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "25%",
          }}
        >
          <TouchableOpacity
            onPress={openCamera}
            style={{
              padding: 12,
              borderRadius: 10,
            }}
          >
            <Ionicons name="camera" size={28} color="#1e88e5" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={openGallery}
            style={{
              padding: 12,
            }}
          >
            <Ionicons name="images" size={28} color="#d81b60" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={createPost}
        style={{
          backgroundColor: "#6200ea",
          padding: 15,
          borderRadius: 10,
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
          Post Now
        </Text>
      </TouchableOpacity>
    </AppAreaView>
  );
};

export default CreatePostScreen;
