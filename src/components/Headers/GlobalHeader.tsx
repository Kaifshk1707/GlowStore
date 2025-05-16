import React, { FC } from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { globalColor } from "../../styles/globalColors";
import { globalFontstyle } from "../../styles/fontStyle";

interface GlobalHeaderProps {
  headerTitle: string;
}

const GlobalHeader: FC<GlobalHeaderProps> = ({ headerTitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{headerTitle}</Text>
    </View>
  );
};

export default GlobalHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    borderRadius:20,
    marginBottom: 10,
    backgroundColor: globalColor.white,
    borderBottomWidth: 0.5,
    borderBottomColor: globalColor.borderColor,
    elevation: 2,
    shadowColor: globalColor.black,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontSize: 22,
    fontFamily: globalFontstyle.bold,
    color: globalColor.black,
    textAlign: "left",
    flex: 1,
  },
  iconButton: {
    padding: 6,
  },
  placeholder: {
    width: 24,
  },
});
