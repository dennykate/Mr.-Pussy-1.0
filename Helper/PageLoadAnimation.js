import React from "react";
import { View, StyleSheet } from "react-native";

// import expo dependencies
import { StatusBar } from "expo-status-bar";

// import lottie
import LottieView from "lottie-react-native";

const PageLoadAnimation = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/animations/loading-circle.json")}
        autoPlay
        loop
        style={styles.lottie}
      />
      <StatusBar hidden={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000e4",
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  lottie: {
    width: 150,
    height: 150,
    backgroundColor: "transparent",
  },
  lottieLetter: {
    width: 150,
    height: 100,
  },
});

export default PageLoadAnimation;
