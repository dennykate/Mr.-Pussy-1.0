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

// import admob ads dependenncies
import { AdMobBanner } from "expo-ads-admob";

const Images = ({ adsCode }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          ToastAndroid.show("Cute Cat", ToastAndroid.BOTTOM);
        }}
      >
        <Image
          source={{ uri: "https://i.postimg.cc/76KpWLRP/cat-photo-1.jpg" }}
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
          source={{ uri: "https://i.postimg.cc/HnGPK72g/cat-photo-2.jpg" }}
          style={styles.image}
        />
      </TouchableOpacity>

      {adsCode.banner.length > 0 && (
        <View style={styles.adsContainer}>
          <AdMobBanner
            bannerSize="smartBannerLandscape"
            adUnitID={adsCode.banner}
            servePersonalizedAds
          />
        </View>
      )}

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          ToastAndroid.show("Cute Cat", ToastAndroid.BOTTOM);
        }}
      >
        <Image
          source={{ uri: "https://i.postimg.cc/J7bT00xs/cat-photo-3.jpg" }}
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
          source={{ uri: "https://i.postimg.cc/15BJ0dLP/cat-photo-4.jpg" }}
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
          source={{ uri: "https://i.postimg.cc/m2my1HHg/cat-photo-5.jpg" }}
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
          source={{ uri: "https://i.postimg.cc/NFpmX3Lz/cat-photo-7.jpg" }}
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
          source={{ uri: "https://i.postimg.cc/Jzg3PCKw/cat-photo-6.jpg" }}
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
          source={{ uri: "https://i.postimg.cc/rsnRs5P6/cat-photo-8.jpg" }}
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
          source={{ uri: "https://i.postimg.cc/HsN7C4MX/cat-photo-9.jpg" }}
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
          source={{ uri: "https://i.postimg.cc/8zrfkJd3/cat-photo-10.jpg" }}
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
    borderRadius: 5,
  },
  adsContainer: {
    width: "100%",
    marginBottom: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Images;
