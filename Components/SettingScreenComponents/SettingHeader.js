import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// import native dependencies
import LottieView from "lottie-react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help Center</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    backgroundColor: "#232526",
    paddingTop: 23,
    borderBottomWidth: 0.2,
    borderBottomColor: "orange",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    color: "orange",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Header;
