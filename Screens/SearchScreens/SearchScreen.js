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
import ItemCard from "../../Components/SeeMoreMovieScreenComponents/MovieCard";

const SearchScreen = ({ navigation }) => {
  // get movie data
  const movieData = useSelector((state) => state.data);
  const [data, setData] = useState();

  // Get native ads data
  const adsData = useSelector((state) => state.ads);
  const [banner_4, setBanner_4] = useState();

  const [search, setSearch] = useState();
  const [searchData, setSearchData] = useState();

  useEffect(() => {
    filterAdsData(adsData);
  }, []);

  useEffect(() => {
    setData(movieData);
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
      .where("title", "==", searchText);
    await movieRef.onSnapshot((querySnapShot) => {
      let arr = [];
      querySnapShot.forEach((doc) => {
        arr.push(doc.data());
      });
      setSearchData(arr);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          သင်ရှာဖွေလိုသောဇာတ်ကားများကို ရှာဖွေနိုင်ပါသည်
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          value={search}
          style={styles.input}
          placeholder="ဇာတ်ကားအမည်ရေးရန်"
          onChangeText={(text) => {
            setSearch(text);
            setSearchData([]);
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
        <View style={styles.moviesContainer}>
          {searchData ? (
            <ItemCard
              data={searchData}
              navigation={navigation}
              ads={banner_4}
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
    color: "white",
    fontSize: 13,
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
});

export default SearchScreen;
