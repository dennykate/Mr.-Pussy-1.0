import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

// import helper
import { categories } from "../../Helper/Categories";

// import custom ads
import CustomAds from "../../Helper/CustomAds";

const width = Dimensions.get("screen").width - 20;

const Category = ({ categories, firstAdsCode, secondAdsCode, navigation }) => {
  return (
    <View style={styles.container}>
      {categories.map((data, index) => {
        return (
          <View style={styles.section} key={index}>
            <Text style={styles.title}>
              {data.name == "Top Rated" ? <TopRated /> : data.name}
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate("SeeMoreMoviesScreen", {
                  Category: data.name,
                  Total: data.total,
                  Type: data.type,
                });
              }}
            >
              <Image source={{ uri: data.image }} style={styles.image} />
            </TouchableOpacity>

            <View style={styles.adsContainer}>
              {index < categories.length / 2 ? (
                <CustomAds type={"Banner_1"} adsCode={firstAdsCode} />
              ) : (
                <CustomAds type={"Banner_1"} adsCode={secondAdsCode} />
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const TopRated = () => (
  <Text style={styles.title}>
    Top Rated{" "}
    <View style={styles.star}>
      <Text>⭐</Text>
    </View>
  </Text>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  section: {
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    color: "orange",
    marginLeft: 10,
    marginBottom: 10,
    fontFamily: "NotoSansMyanmar-Bold",
  },
  star: {
    transform: [{ translateX: 0 }, { translateY: 1 }],
  },
  image: {
    alignSelf: "center",
    width: width,
    height: (width * 55) / 100,
    borderRadius: 5,
  },
  adsContainer: {
    width: "100%",
    marginTop: 40,
    height: 80,
  },
});

export default Category;
