import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";

const HeaderLogo = ({ data }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.logoContainer}
        activeOpacity={1}
        onPress={async () => {
          await Linking.openURL(data);
        }}
      >
        <Text style={styles.appName}>Mr Pussy</Text>
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
    borderBottomWidth: 0.2,
    borderBottomColor: "orange",
  },
  logoContainer: {
    width: 150,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 5,
    top: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  appName: {
    fontSize: 30,
    color: "orange",
    marginLeft: 10,
    fontFamily: "DancingScript-Bold",
  },
});

export default HeaderLogo;
