import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

//import expo dependencies
import * as ScreenOrientation from "expo-screen-orientation";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

// import components
import DetailHeader from "../../Components/MovieDetailScreenComponents/DetailHeader";
import DetailBody from "../../Components/MovieDetailScreenComponents/DetailBody";
import RelatedMovies from "../../Components/MovieDetailScreenComponents/RelatedMovies";

// import redux
import { useSelector } from "react-redux";

// import helper
import PageLoadAnimation from "../../Helper/PageLoadAnimation";

// import custom ads
import CustomAds from "../../Helper/CustomAds";

const MovieDetailScreen = ({ navigation, route }) => {
  const data = route.params;

  // Get native ads data
  const adsData = useSelector((state) => state.ads);
  const [nativeAds, setNativeAds] = useState();
  const [banner_4, setBanner_4] = useState();
  useEffect(() => {
    filterAdsData(adsData);
  }, []);

  const filterAdsData = (data) => {
    data.filter((dt) => {
      if (dt.id == 1) {
        setNativeAds(dt);
      } else if (dt.id == 4) {
        setBanner_4(dt);
      }
    });
  };

  // Scroll to Top And Animation
  useEffect(() => {
    setAnimation(true);
    scrollToTopAndAnimation();
  }, [data.title]);

  // Get Related Data
  const movieData = useSelector((state) => state.data);
  const [relatedData, setRelatedData] = useState([]);

  useEffect(() => {
    let dataArr = [];
    for (let i = 0; i < 5; i++) {
      dataArr.push(
        movieData[Math.floor(Math.random() * (movieData.length - 1))]
      );
    }
    setRelatedData(dataArr);
  }, [data.title]);

  // Scroll to Top And Animation
  const scrollRef = useRef();
  const [animation, setAnimation] = useState(false);
  const scrollToTopAndAnimation = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: false,
    });
    setTimeout(() => {
      setAnimation(false);
    }, 2500);
  };

  // get admob ads data
  const admobAdsCode = useSelector((state) => state.admobAds);

  // Get Fonts
  const [loaded] = useFonts({
    "NotoSansMyanmar-SemiBold": require("../../assets/fonts/NotoSansMyanmar-SemiBold.ttf"),
    "NotoSansMyanmar-Bold": require("../../assets/fonts/NotoSansMyanmar-Bold.ttf"),
    "DancingScript-Regular": require("../../assets/fonts/DancingScript-Regular.ttf"),
    "NotoSansMyanmar-Thin": require("../../assets/fonts/NotoSansMyanmar-Thin.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {animation ? <PageLoadAnimation /> : <></>}

      <DetailHeader navigation={navigation} />

      <ScrollView ref={scrollRef}>
        <DetailBody
          navigation={navigation}
          data={data}
          admobAdsCode={admobAdsCode}
        />

        {nativeAds && <CustomAds type={"Native"} adsCode={nativeAds} />}

        {relatedData.length > 0 && (
          <RelatedMovies navigation={navigation} relatedData={relatedData} />
        )}

        {banner_4 && (
          <View styles={styles.bannerContainer}>
            <CustomAds type={"Banner_4"} adsCode={banner_4} />
          </View>
        )}
      </ScrollView>

      <StatusBar hidden={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#000",
    minHeight: "100%",
  },
  bannerContainer: {
    marginBottom: 80,
  },
});

export default MovieDetailScreen;
