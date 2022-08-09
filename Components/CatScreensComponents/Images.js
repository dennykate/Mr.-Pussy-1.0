import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ToastAndroid,
} from "react-native";

const width = Dimensions.get("screen").width;

const Images = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          ToastAndroid.show("Cute Cat", ToastAndroid.BOTTOM);
        }}
      >
        <Image
          source={require("../../assets/photos/cat_photos/cat_photo_1.jpg")}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          ToastAndroid.show("Cute Cat", ToastAndroid.BOTTOM);
        }}
      >
        <Image
          source={require("../../assets/photos/cat_photos/cat_photo_2.jpg")}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          ToastAndroid.show("Cute Cat", ToastAndroid.BOTTOM);
        }}
      >
        <Image
          source={require("../../assets/photos/cat_photos/cat_photo_3.jpg")}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          ToastAndroid.show("Cute Cat", ToastAndroid.BOTTOM);
        }}
      >
        <Image
          source={require("../../assets/photos/cat_photos/cat_photo_4.jpg")}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          ToastAndroid.show("Cute Cat", ToastAndroid.BOTTOM);
        }}
      >
        <Image
          source={require("../../assets/photos/cat_photos/cat_photo_5.jpg")}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          ToastAndroid.show("Cute Cat", ToastAndroid.BOTTOM);
        }}
      >
        <Image
          source={require("../../assets/photos/cat_photos/cat_photo_6.jpg")}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          ToastAndroid.show("Cute Cat", ToastAndroid.BOTTOM);
        }}
      >
        <Image
          source={require("../../assets/photos/cat_photos/cat_photo_7.jpg")}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          ToastAndroid.show("Cute Cat", ToastAndroid.BOTTOM);
        }}
      >
        <Image
          source={require("../../assets/photos/cat_photos/cat_photo_8.jpg")}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          ToastAndroid.show("Cute Cat", ToastAndroid.BOTTOM);
        }}
      >
        <Image
          source={require("../../assets/photos/cat_photos/cat_photo_9.jpg")}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          ToastAndroid.show("Cute Cat", ToastAndroid.BOTTOM);
        }}
      >
        <Image
          source={require("../../assets/photos/cat_photos/cat_photo_10.jpg")}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    alignSelf: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 40,
    paddingBottom: 30,
  },
  image: {
    width: width - 230,
    height: width - 230,
    resizeMode: "cover",
    marginBottom: 20,
  },
});

export default Images;
