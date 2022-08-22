import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  BackHandler,
  Alert,
  ToastAndroid,
} from "react-native";

// import expo dependencies
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as Network from "expo-network";

// import components
import HeaderLogo from "../../Components/HomeScreenComponents/HeaderLogo";
import SwiperImage from "../../Components/HomeScreenComponents/SwiperImage";
import Category from "../../Components/HomeScreenComponents/Category";

// import redux
import { useDispatch, useSelector } from "react-redux";

// import firebase database
import { db } from "../../Helper/Config";

// import Helper
import IntroNoticeCard from "../../Helper/IntroNoticeCard";
import ConnectionLose from "../../Helper/ConnectionLose";

const HomeScreen = ({ navigation }) => {
  const checkIntroNativeCode = useSelector((state) => state.introNativeCode);

  useEffect(() => {
    fetchSocialAccDataFromFirebase();
    fetchSliderImageDataFromFirebase();
    fetchAdsDataFromFirebase();
    fetchAdmobAdsDataFromFirebase();
    fetchCategoriesDataFromFirebase();
    checkConnection();
    setIntroCodeFunc();
  }, []);

  const checkConnection = async () => {
    let connection = await Network.getNetworkStateAsync();
    if (!connection.isConnected) {
      setConnectionFail(true);
    } else {
      setConnectionFail(false);
    }
  };

  const fetchSocialAccDataFromFirebase = async () => {
    const socialRef = await db.firestore().collection("socials");
    await socialRef.onSnapshot((querySnapshot) => {
      let arr;
      querySnapshot.forEach((doc) => {
        arr = doc.data();
      });
      setSocialData(arr);
      setFacebookPage(arr.fb_page);
    });
  };

  const fetchSliderImageDataFromFirebase = async () => {
    const sliderImageRef = await db.firestore().collection("slider_image");
    await sliderImageRef.onSnapshot((querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setSliderImageData(arr);
    });
  };

  const fetchAdsDataFromFirebase = async () => {
    const adsRef = await db.firestore().collection("ads");
    await adsRef.onSnapshot((querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        const { gif, url } = doc.data();
        arr.push({
          id: doc.id,
          GIF: gif,
          URL: url,
        });
      });
      setAdsData(arr);
      filterAdsData(arr);
    });
  };

  const fetchAdmobAdsDataFromFirebase = async () => {
    const admobAdsRef = await db.firestore().collection("admob_ads");
    await admobAdsRef.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setAdmobAdsData(doc.data());
      });
    });
  };

  const fetchCategoriesDataFromFirebase = async () => {
    const categoryRef = db
      .firestore()
      .collection("categories")
      .orderBy("id", "asc");

    await categoryRef.onSnapshot((querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setCategories(arr);
    });
  };

  const dispatch = useDispatch();
  const setSocialData = (data) => {
    dispatch({
      type: "Add Socials",
      payload: data,
    });
  };

  const setAdsData = (data) => {
    dispatch({
      type: "Add Ads",
      payload: data,
    });
  };

  const setAdmobAdsData = (data) => {
    dispatch({
      type: "Add Admob Ads",
      payload: data,
    });
  };

  const filterAdsData = (data) => {
    data.filter((dt) => {
      if (dt.id == 1) {
        setNativeAds(dt);
      } else if (dt.id == 2) {
        setBanner_1(dt);
      } else if (dt.id == 3) {
        setBanner_2(dt);
      }
    });
  };

  const setIntroCodeFunc = () => {
    setTimeout(() => {
      dispatch({
        type: "Add Intro Native Code",
        payload: 1,
      });
    }, 15000);
  };

  const [categories, setCategories] = useState();

  const [sliderImageData, setSliderImageData] = useState([]); // for slider image

  const [nativeAds, setNativeAds] = useState(); // for ads
  const [banner_1, setBanner_1] = useState();
  const [banner_2, setBanner_2] = useState();

  const [facebookPage, setFacebookPage] = useState();

  const [connectionFail, setConnectionFail] = useState(false); // for connection fail

  const manageMovieData = (param) => {
    let myanmarData = [];
    let internationalData = [];
    let topRateData = [];

    for (let i = 0; i < param.length; i++) {
      if (param[i].category == "Myanmar") {
        myanmarData.push(param[i]);
      }
      if (param[i].category == "International") {
        internationalData.push(param[i]);
      }
      if (param[i].top_rate == 1) {
        topRateData.push(param[i]);
      }
    }

    setMyanmarMovie(myanmarData);
    setInternationalMovie(internationalData);
    setTopRateMovie(topRateData);
  };

  const [loaded] = useFonts({
    "NotoSansMyanmar-SemiBold": require("../../assets/fonts/NotoSansMyanmar-SemiBold.ttf"),
    "NotoSansMyanmar-Bold": require("../../assets/fonts/NotoSansMyanmar-Bold.ttf"),
    "DancingScript-Regular": require("../../assets/fonts/DancingScript-Regular.ttf"),
    "DancingScript-Bold": require("../../assets/fonts/DancingScript-Bold.ttf"),
    "NotoSansMyanmar-Thin": require("../../assets/fonts/NotoSansMyanmar-Thin.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {connectionFail && <ConnectionLose />}

      {checkIntroNativeCode == 0 ? (
        nativeAds && <IntroNoticeCard data={nativeAds} />
      ) : (
        <></>
      )}

      {facebookPage && <HeaderLogo data={facebookPage} />}

      <ScrollView>
        {sliderImageData.length > 0 && (
          <SwiperImage navigation={navigation} data={sliderImageData} />
        )}

        {categories && (
          <Category
            firstAdsCode={banner_1}
            secondAdsCode={banner_2}
            categories={categories}
            navigation={navigation}
          />
        )}
      </ScrollView>

      <StatusBar hidden={false} />
    </View>
  );
};

export default HomeScreen;
