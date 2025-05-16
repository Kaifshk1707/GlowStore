import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { FC } from "react";
import { Is_Adnroid } from "../../constants/Constant";
import { globalColor } from "../../styles/globalColors";

interface AppAreaViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const AppAreaView: FC<AppAreaViewProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={styles.AppAreaView}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

export default AppAreaView;

const styles = StyleSheet.create({
  AppAreaView: {
    flex: 1,
    backgroundColor: "transparent",
    paddingTop: Is_Adnroid ? StatusBar.currentHeight || 0 : 0,
  },
  container: {
    // flex: 1,
  },
});
