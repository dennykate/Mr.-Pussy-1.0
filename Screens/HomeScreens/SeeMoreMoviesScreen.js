import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

// import components
import ItemCard from "../../Components/SeeMoreMovieScreenComponents/MovieCard";

// import redux
import { useSelector } from "react-redux";

const SeeMoreMovies = ({ navigation, route }) => {
  const { Data: relatedData } = route.params;
  const { Category: category } = route.params;

  // Get native ads data
  const adsData = useSelector((state) => state.ads);
  useEffect(() => {
    filterAdsData(adsData);
  }, []);

  const filterAdsData = (data) => {
    data.filter((dt) => {
      if (dt.id == 6) {
        setBanner_6(dt);
      }
    });
  };

  const [banner_6, setBanner_6] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {category} [ {relatedData.length}+ ]
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.moviesContainer}>
          <ItemCard data={relatedData} navigation={navigation} ads={banner_6} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    width: "100%",
  },
  titleContainer: {
    width: "100%",
    height: 90,
    backgroundColor: "#232526",
    borderBottomWidth: 0.5,
    borderBottomColor: "orange",
  },
  title: {
    color: "orange",
    position: "absolute",
    bottom: 7,
    fontSize: 22,
    marginLeft: 25,
    fontFamily: "NotoSansMyanmar-Bold",
  },
  moviesContainer: {
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 7,
    paddingVertical: 15,
    flexDirection: "row",
    minHeight: 200,
    paddingBottom: 80,
  },
});

export default SeeMoreMovies;
