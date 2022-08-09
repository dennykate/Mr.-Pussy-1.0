import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

const Items = ({ data, navigation, category }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.title}>
        {category == "Top Rated" ? <TopRated /> : category}
      </Text>
      <View style={styles.container}>
        <ScrollView horizontal={true} decelerationRate={0.5}>
          {data.map((dt, index) => {
            if (index >= 10) return;
            return (
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.8}
                key={index}
                onPress={() => navigation.navigate("MovieDetailScreen", dt)}
              >
                <Image
                  source={{
                    uri: dt.image,
                  }}
                  style={styles.image}
                />
                <Text style={styles.movieName}>
                  {dt.title.length > 25
                    ? dt.title.substring(0, 25) + "..."
                    : dt.title}
                </Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={styles.seeMoreContainer}
            activeOpacity={0.3}
            onPress={() =>
              navigation.navigate("SeeMoreMoviesScreen", {
                Data: data,
                Category: category,
                RefreshCode: 0,
              })
            }
          >
            <View style={styles.seeMoreBtn}>
              <Text style={styles.seeMore_1}>အားလုံး</Text>
              <Text style={styles.seeMore_2}>ကြည့်မယ်</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
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
    height: 220,
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    color: "orange",
    marginLeft: 10,
    marginBottom: 20,
    fontFamily: "NotoSansMyanmar-Bold",
  },
  card: {
    marginHorizontal: 5,
    width: 150,
    height: 210,
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#232526",
    borderRadius: 3,
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  movieName: {
    fontSize: 9,
    color: "white",
    marginTop: 5,
    fontFamily: "NotoSansMyanmar-SemiBold",
    marginLeft: 5,
    letterSpacing: 0.5,
  },
  seeMoreContainer: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 180,
  },
  seeMoreBtn: {
    width: 80,
    height: 80,
    backgroundColor: "#232526",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "red",
  },
  seeMore_1: {
    fontSize: 10,
    color: "orange",
    fontFamily: "NotoSansMyanmar-SemiBold",
  },
  seeMore_2: {
    fontSize: 12,
    color: "orange",
    fontFamily: "NotoSansMyanmar-SemiBold",
  },
  star: {
    transform: [{ translateX: 0 }, { translateY: 1 }],
  },
});

export default Items;
