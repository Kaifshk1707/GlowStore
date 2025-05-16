import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import firestore from "@react-native-firebase/firestore";

const AddOrder = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [primaryImageUrl, setPrimaryImageUrl] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description || !primaryImageUrl || !quantity) {
      Alert.alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await firestore()
        .collection("categories")
        .add({
          title,
          description,
          primaryImageUrl,
          quantity: parseInt(quantity),
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      Alert.alert("✅ Order Added Successfully!");
      setTitle("");
      setDescription("");
      setPrimaryImageUrl("");
      setQuantity("");
      navigation.goBack();
    } catch (error) {
      console.error("Firestore Error:", error);
      Alert.alert("❌ Failed to add order", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
        padding: 20,
      }}
    >
      <View
        style={{
          width: "100%",
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 12,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
            color: "#333",
          }}
        >
          Add New Order
        </Text>

        <TextInput
          placeholder="Enter Title"
          value={title}
          onChangeText={setTitle}
          style={inputStyle}
        />
        <TextInput
          placeholder="Enter Description"
          value={description}
          onChangeText={setDescription}
          style={[inputStyle, { height: 100 }]}
          multiline
        />
        <TextInput
          placeholder="Enter Image URL"
          value={primaryImageUrl}
          onChangeText={setPrimaryImageUrl}
          style={inputStyle}
        />
        <TextInput
          placeholder="Enter Quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          style={inputStyle}
        />

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          style={{
            backgroundColor: "#4A90E2",
            paddingVertical: 14,
            borderRadius: 8,
            marginTop: 20,
            alignItems: "center",
          }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
              Submit Order
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const inputStyle = {
  borderWidth: 1,
  borderColor: "#ccc",
  padding: 12,
  marginVertical: 10,
  borderRadius: 8,
  backgroundColor: "#f9f9f9",
  fontSize: 16,
};

export default AddOrder;
