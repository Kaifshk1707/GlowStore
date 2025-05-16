import React from "react";
import { View, Text, ActivityIndicator, FlatList, Image } from "react-native";

interface TrendingProductsProps {
  title: string;
}

const TrendingProducts: React.FC<TrendingProductsProps> = ({ title }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "500", marginBottom: 8 }}>
        {title}
      </Text>
    </View>
  );
};

export default TrendingProducts;
