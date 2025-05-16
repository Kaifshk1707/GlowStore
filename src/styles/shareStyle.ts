import { StyleSheet } from "react-native";
import { globalColor } from "./globalColors";

export const sharePaddingHorizontalStyle = (12);

export const commonStyle = StyleSheet.create({
  shadow: {
    //IOS
    shadowColor: globalColor.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    //Android
    elevation: 4,
  },
});
