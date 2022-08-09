import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";

//import dependencies
import Ionicons from "react-native-vector-icons/Ionicons";

// ignore log
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
]);

const DetailHeader = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backKey}
        activeOpacity={0.5}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="chevron-back-outline" size={38} color="orange" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    backgroundColor: "#232526",
    paddingTop: 23,
    borderBottomWidth: 0.5,
    borderBottomColor: "orange",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backKey: {
    margin: 20,
    flexDirection: "row",
  },
  backText: {
    fontSize: 15,
    marginTop: 9,
    color: "orange",
    transform: [{ translateX: -3 }],
    fontWeight: "bold",
  },
});

export default DetailHeader;
