import React from "react";
import { View, Text, ActivityIndicator, FlatList, Image } from "react-native";

interface LatestProductsProps {
  title: string;
}

const LatestProducts: React.FC<LatestProductsProps> = ({ title }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "500", marginBottom: 8 }}>
        {title}
      </Text>
    </View>
  );
};

export default LatestProducts;
