import React, { useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";

// import custom ads
import { BannerSize, NativeSize } from "./CustomAds";

const Width = (Dimensions.get("screen").width * 6) / 10;

const ItemCard = ({ data, navigation }) => {
  return (
    <>
      {data.map((dt, index) => {
        return (
          <View key={index}>
            <TouchableOpacity
              style={styles.movieCard}
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate("MovieDetailScreen", dt);
              }}
            >
              <Image
                source={{
                  uri: dt.image,
                }}
                style={styles.image}
              />
              <Text style={styles.movieName}>
                {dt.title.length > 20
                  ? dt.title.substring(0, 20) + "..."
                  : dt.title}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  movieCard: {
    width: Width,
    height: (Width * 12) / 16,
    backgroundColor: "#232526",
    marginHorizontal: 8,
    marginVertical: 15,
    borderRadius: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: (Width * 10) / 16,
    resizeMode: "cover",
  },
  movieName: {
    fontSize: 10,
    fontFamily: "NotoSansMyanmar-SemiBold",
    color: "white",
    marginLeft: 5,
    marginTop: 2,
  },
  bannerContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ItemCard;
