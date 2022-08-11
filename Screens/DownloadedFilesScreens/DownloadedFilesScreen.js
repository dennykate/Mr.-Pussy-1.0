import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";

// import async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// import redux
import { useSelector } from "react-redux";

// import admob ads dependenncies
import { AdMobBanner } from "expo-ads-admob";

// import components
import DonwloadedMovieCard from "../../Components/DownloadedFIlesScreenComponent/DownloadedMovieCard";

const DownloadedFilesScreen = ({ navigation }) => {
  const admobAdsData = useSelector((state) => state.admobAds);

  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      getItems();
    });
    return focusHandler;
  }, [navigation]);

  useEffect(() => {
    getItems();
  }, [navigation]);

  const [items, setItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getItems = async () => {
    let keys = [];
    let items = [];

    try {
      keys = await AsyncStorage.getAllKeys();
      if (keys.length > 0) {
        items = await AsyncStorage.multiGet(keys);
        if (items) {
          setItemsFunc(items);
          setRefreshing(false);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const setItemsFunc = (data) => {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      arr.push(JSON.parse(data[i][1]));
    }
    setItems(arr);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Downloaded Videos</Text>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getItems} />
        }
      >
        {items.length > 0 &&
          items.reverse().map((data, index) => {
            if (!(index % 3) && index != 0) {
              return (
                <View key={index}>
                  {admobAdsData.banner.length > 0 && (
                    <View style={styles.bannerContainer}>
                      <AdMobBanner
                        bannerSize="banner"
                        adUnitID={admobAdsData.banner}
                        servePersonalizedAds
                      />
                    </View>
                  )}

                  <DonwloadedMovieCard data={data} navigation={navigation} />
                </View>
              );
            } else {
              return (
                <DonwloadedMovieCard
                  data={data}
                  navigation={navigation}
                  key={index}
                />
              );
            }
          })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  bannerContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 2,
  },
});

export default DownloadedFilesScreen;
