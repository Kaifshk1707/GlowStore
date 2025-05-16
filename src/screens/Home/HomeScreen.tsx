import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import AppAreaView from "../../components/View/safeAreaView";
import LatestProducts from "../../components/DashBoard/LatestProducts";
import { globalColor } from "../../styles/globalColors";
import { globalFontstyle } from "../../styles/fontStyle";
import GlobalHeader from "../../components/Headers/GlobalHeader";

type Category = {
  key: string;
  title: string;
  description: string;
  primaryImageUrl?: string;
  quantity?: number;
};

type TrendingProduct = {
  key: string;
  title: string;
  description: string;
  primaryImageUrl: string;
  price: number;
};

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [trendingProduct, setTrendingProduct] = useState<TrendingProduct[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [primaryImageUrl, setPrimaryImageUrl] = useState("");
  const [price, setPrice] = useState("");
  

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("categories")
      .onSnapshot((querySnapshot) => {
        const categoryList: Category[] = [];
        querySnapshot.forEach((doc) => {
          categoryList.push({ ...doc.data(), key: doc.id });
        });
        setCategories(categoryList);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("trendingProducts")
      .onSnapshot((querySnapshot) => {
        const trendingList: TrendingProduct[] = [];
        querySnapshot.forEach((doc) => {
          trendingList.push({
            ...(doc.data() as TrendingProduct),
            key: doc.id,
          });
        });
        setTrendingProduct(trendingList);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  const addTrending = () => {
    firestore()
      .collection("trendingProducts")
      .add({
        title: title,
        description: description,
        primaryImageUrl: primaryImageUrl,
        price: price,
      })
      .then(() => {
        Alert.alert("Trending product added successfully!");
      })
      .catch((error) => {
        console.error("Error adding product: ", error);
      });
  };

  const removeTrendingProduct = (id: string) => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            firestore()
              .collection("trendingProducts")
              .doc(id)
              .delete()
              .then(() => {
                Alert.alert("Product removed successfully!");
              })
              .catch((error) => {
                console.error("Error removing product: ", error);
              });
          },
        },
      ]
    );
  };

  const removeCategory = (id: string) => {
    Alert.alert(
      "Delete Category",
      "Are you sure you want to delete this category?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            firestore()
              .collection("categories")
              .doc(id)
              .delete()
              .then(() => {
                Alert.alert("Category removed successfully!");
              })
              .catch((error) => {
                console.error("Error removing category: ", error);
              });
          },
        },
      ]
    );
  };
  
  

  const renderProductItem = ({ item }: { item: TrendingProduct }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.primaryImageUrl }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>₹{item.price}</Text>

      {/* Remove Button */}
      <TouchableOpacity
        onPress={() => removeTrendingProduct(item.key)}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={globalColor.primary} />
      </View>
    );
  }

  return (
    <AppAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <GlobalHeader headerTitle="GlowStore" />

        {/* Categories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest Products</Text>
            <TouchableOpacity onPress={() => navigation.navigate("AddOrder")}>
              <Text style={styles.linkText}>+ Add Category</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.key}
            contentContainerStyle={styles.horizontalList}
            renderItem={({ item }) => (
              <View style={styles.categoryCard}>
                <Image
                  source={{ uri: item.primaryImageUrl }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryTitle}>{item.title}</Text>
                <Text numberOfLines={2} style={styles.categoryDescription}>
                  {item.description}
                </Text>
                <Text style={styles.categoryQty}>Qty: {item.quantity}</Text>

                <TouchableOpacity
                  onPress={() => removeCategory(item.key)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* Trending Products Section */}
        {/* Add Trending Product Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Trending Product</Text>

          <TextInput
            placeholder="Product Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
          <TextInput
            placeholder="Image URL"
            value={primaryImageUrl}
            onChangeText={setPrimaryImageUrl}
            style={styles.input}
          />
          <TextInput
            placeholder="Price"
            value={price}
            onChangeText={(text) => setPrice(text)}
            keyboardType="numeric"
            style={styles.input}
          />

          <TouchableOpacity onPress={addTrending} style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add Product</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Products</Text>
            <TouchableOpacity onPress={addTrending}>
              <Text style={styles.linkText}>+ Add Product</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={trendingProduct}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.key}
            contentContainerStyle={styles.verticalList}
          />
        </View>
      </ScrollView>
    </AppAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  screenTitle: {
    fontSize: 24,
    fontFamily: globalFontstyle.bold,
    color: globalColor.black,
    marginBottom: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: globalFontstyle.semiBold,
    color: globalColor.darkGray,
  },
  linkText: {
    color: globalColor.primary,
    fontFamily: globalFontstyle.medium,
    fontSize: 18,
  },
  horizontalList: {
    paddingBottom: 12,
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: globalFontstyle.medium,
  },

  verticalList: {
    paddingTop: 8,
  },
  categoryCard: {
    backgroundColor: globalColor.white,
    borderRadius: 12,
    padding: 12,
    marginRight: 16,
    shadowColor: globalColor.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    width: 220,
  },
  categoryImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  categoryTitle: {
    fontFamily: globalFontstyle.bold,
    fontSize: 18,
    color: globalColor.black,
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 16,
    fontFamily: globalFontstyle.regular,
    color: globalColor.gray,
  },
  categoryQty: {
    marginTop: 4,
    fontSize: 14,
    fontFamily: globalFontstyle.light,
    color: globalColor.medGray,
  },
  card: {
    backgroundColor: globalColor.white,
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    elevation: 2,
    shadowColor: globalColor.black,
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  image: {
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
  },
  title: {
    fontFamily: globalFontstyle.bold,
    fontSize: 16,
    color: globalColor.black,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontFamily: globalFontstyle.regular,
    color: globalColor.gray,
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontFamily: globalFontstyle.semiBold,
    color: globalColor.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: globalColor.white,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
    fontFamily: globalFontstyle.regular,
  },

  addButton: {
    backgroundColor: globalColor.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: globalFontstyle.semiBold,
  },
  
});
