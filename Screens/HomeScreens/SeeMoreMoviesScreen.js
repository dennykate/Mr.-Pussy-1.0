import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

// import firebase database
import { db } from "../../Helper/Config";

// import components
import ItemCard from "../../Components/SeeMoreMovieScreenComponents/MovieCard";

// import redux
import { useSelector, useDispatch } from "react-redux";

const SeeMoreMovies = ({ navigation, route }) => {
  const { Total: total } = route.params;
  const { Category: category } = route.params;
  const { Type: type } = route.params;

  // fetch movie data
  const [movieData, setMovieData] = useState();
  const [limitMovie, setLimitMovie] = useState(10);

  useEffect(() => {
    if (category == "Top Rated") {
      fetchTopRatedMovieDataFromFirebase();
    } else {
      fetchMovieDataFromFirebase(category);
    }
  }, [limitMovie]);

  const fetchMovieDataFromFirebase = async (category) => {
    const moviesRef = await db
      .firestore()
      .collection("movies")
      .where("category", "==", category)
      .orderBy("id", "desc")
      .limit(limitMovie);
    await moviesRef.onSnapshot((querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setMovieData(arr);
      addMovieData(arr);
    });
  };

  const fetchTopRatedMovieDataFromFirebase = async () => {
    const moviesRef = await db
      .firestore()
      .collection("movies")
      .where("top_rate", "==", "1")
      .orderBy("id", "desc")
      .limit(limitMovie);
    await moviesRef.onSnapshot((querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });

      setMovieData(arr);
      addMovieData(arr);
    });
  };

  const dispatch = useDispatch();
  const addMovieData = (data) => {
    dispatch({
      type: "Add Movie",
      payload: data,
    });
  };

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
          {category} [ {total}+ ]
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.moviesContainer}>
          {movieData && (
            <ItemCard
              data={movieData}
              navigation={navigation}
              ads={banner_6}
              limitAmount={limitMovie}
              type={type}
            />
          )}
        </View>

        {limitMovie < total && (
          <TouchableOpacity
            onPress={() => {
              setLimitMovie(limitMovie + 10);
            }}
            style={styles.addMore}
          >
            <Text style={styles.addMoreText}>More</Text>
          </TouchableOpacity>
        )}
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
    paddingVertical: 15,
    flexDirection: "row",
    paddingBottom: 80,
  },
  addMore: {
    width: 120,
    height: 60,
    borderRadius: 30,
    backgroundColor: "red",
    position: "absolute",
    bottom: 5,
    left: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addMoreText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SeeMoreMovies;
