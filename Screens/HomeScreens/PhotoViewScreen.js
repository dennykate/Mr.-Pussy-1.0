import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ToastAndroid,
} from "react-native";

// import expo dependencies
import { StatusBar } from "expo-status-bar";

// import helper
import { DownloadPhoto } from "../../Helper/SystemFunction";

const PhotoViewScreen = ({ route }) => {
  const { IMAGE } = route.params;
  const FILE_NAME = IMAGE.split("?")[0];

  return (
    <View style={styles.container}>
      <Image source={{ uri: IMAGE }} style={styles.image} />

      <View style={styles.downloadBtnContainer}>
        <View style={styles.line}></View>
        <View style={styles.line}></View>
        <View style={styles.line}></View>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.5}
          onPress={() => {
            ToastAndroid.show(
              "ဒေါင်းလုဒ်လုပ်ခြင်း စတင်ပါပြီ !",
              ToastAndroid.SHORT
            );
            DownloadPhoto(FILE_NAME);
          }}
        >
          <Text style={styles.btnText}>‌ဒေါင်းလုဒ်လုပ်မယ်</Text>
        </TouchableOpacity>
      </View>
      <StatusBar hidden={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: Dimensions.get("screen").height - 200,
    resizeMode: "cover",
  },
  downloadBtnContainer: {
    backgroundColor: "black",
    width: "100%",
    height: 250,
    transform: [{ translateY: -50 }],
    borderRadius: 50,
    alignItems: "center",
    paddingTop: 15,
  },
  line: {
    width: 50,
    height: 6,
    borderRadius: 3,
    backgroundColor: "red",
    marginVertical: 2,
  },
  btn: {
    width: 150,
    height: 50,
    borderRadius: 25,
    marginTop: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  btnText: {
    color: "white",
    fontFamily: "NotoSansMyanmar-SemiBold",
  },
});

export default PhotoViewScreen;
