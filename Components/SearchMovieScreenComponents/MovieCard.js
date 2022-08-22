import React from "react";
import {
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Button,
  Dimensions,
} from "react-native";

const Width = Dimensions.get("screen").width - 50;

const MovieCard = ({ dt, navigation, type }) => {
  return (
    <TouchableOpacity
      style={styles.movieCard}
      activeOpacity={0.5}
      onPress={() => {
        navigation.navigate("MovieDetailScreen", {
          dt: dt,
          type: type,
          searchPage: 1,
        });
      }}
    >
      <Image
        source={{
          uri: dt.image,
        }}
        style={styles.image}
      />
      <Text style={styles.movieName}>
        {dt.title.length > 30 ? dt.title.substring(0, 30) + "..." : dt.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  movieCard: {
    width: Width,
    height: (Width * 12) / 16,
    backgroundColor: "#232526",
    marginHorizontal: 3,
    marginVertical: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: (Width * 10) / 16,
    resizeMode: "cover",
  },
  movieName: {
    fontSize: 15,
    fontFamily: "NotoSansMyanmar-SemiBold",
    color: "white",
    marginLeft: 5,
    marginTop: 5,
  },
});

export default MovieCard;
