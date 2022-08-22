import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

const testAds = "https://i.postimg.cc/kGmTS9Wz/animation-3.gif";

// import dependencies
import Ionicons from "react-native-vector-icons/Ionicons";

// import redux
import { useSelector } from "react-redux";

// import firebase database
import { db } from "../../Helper/Config";

// import components
import MovieCard from "../../Components/SearchMovieScreenComponents/MovieCard";

// import admob ads dependenncies
import { AdMobBanner } from "expo-ads-admob";

const SearchScreen = ({ navigation }) => {
  // Get ads data
  const adsData = useSelector((state) => state.ads);
  const admobAdsData = useSelector((state) => state.admobAds);

  const [banner_4, setBanner_4] = useState();

  const [search, setSearch] = useState();
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    filterAdsData(adsData);
  }, []);

  const filterAdsData = (data) => {
    data.filter((dt) => {
      if (dt.id == 4) {
        setBanner_4(dt);
      }
    });
  };

  const searchMovieData = async (text) => {
    const searchText = text.trim();

    const movieRef = db
      .firestore()
      .collection("movies")
      .where("code", "==", searchText);
    await movieRef.onSnapshot((querySnapShot) => {
      let arr = [];
      querySnapShot.forEach((doc) => {
        arr.push(doc.data());
      });
      setSearchData(arr);
      console.log(arr.length);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Search Your Movie Here </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          value={search}
          style={styles.input}
          placeholder="Movie Code... MP-001"
          onChangeText={(text) => {
            setSearch(text);
            setSearchData([]);
          }}
          onSubmitEditing={() => {
            searchMovieData(search);
            setSearch("");
          }}
        />
        <TouchableOpacity
          style={styles.searchBtnContainer}
          activeOpacity={0.8}
          onPress={() => {
            if (search) {
              searchMovieData(search);
              setSearch("");
            }
          }}
        >
          <Ionicons name="search" size={25} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {admobAdsData.banner.length > 0 && (
          <View style={styles.bannerContainer}>
            <AdMobBanner
              bannerSize="banner"
              adUnitID={admobAdsData.banner}
              servePersonalizedAds
            />
          </View>
        )}

        <View style={styles.moviesContainer}>
          {searchData.length > 0 ? (
            <MovieCard
              dt={searchData[0]}
              navigation={navigation}
              type={"poster"}
            />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  header: {
    width: "100%",
    height: 100,
    backgroundColor: "#232526",
    paddingTop: 23,
    borderBottomWidth: 0.2,
    borderBottomColor: "orange",
  },
  headerText: {
    marginTop: 30,
    marginLeft: 20,
    color: "orange",
    fontSize: 18,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f5f5f5",
    height: 40,
    width: "80%",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginTop: 10,
    paddingHorizontal: 15,
    letterSpacing: 0.8,
  },
  searchBtnContainer: {
    width: "20%",
    height: 40,
    backgroundColor: "red",
    marginTop: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
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
  bannerContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
});

export default SearchScreen;
