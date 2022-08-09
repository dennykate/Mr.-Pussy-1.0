import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";

const CustomAds = ({ type, adsCode = "" }) => {
  switch (type) {
    case "Banner_1":
      return <BannerSize data={adsCode} />;
    case "Banner_2":
      return <BannerSize data={adsCode} />;
    case "Banner_3":
      return <BannerSize data={adsCode} />;
    case "Banner_4":
      return <BannerSize data={adsCode} />;
    case "Native":
      return <NativeSize data={adsCode} />;
  }
};

const BannerSize = ({ data }) => {
  return (
    <View style={styles.bannerContainer}>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(data.URL);
        }}
        activeOpacity={1}
      >
        <Image
          style={styles.bannerGif}
          source={{
            uri: data.GIF,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const NativeSize = ({ data }) => {
  return (
    <View style={styles.nativeContainer}>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(data.URL);
        }}
        activeOpacity={1}
      >
        <Image
          source={{
            uri: data.GIF,
          }}
          style={styles.nativeGif}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomAds;

const styles = StyleSheet.create({
  bannerContainer: {
    width: Dimensions.get("screen").width - 5,
    height: 100,
    backgroundColor: "transparent",
    marginBottom: 20,
    alignSelf: "center",
  },
  bannerGif: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  nativeContainer: {
    width: Dimensions.get("screen").width - 30,
    height: Dimensions.get("screen").width - 30,
    alignSelf: "center",
    marginBottom: 20,
  },
  nativeGif: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
