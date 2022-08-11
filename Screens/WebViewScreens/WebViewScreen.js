import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  BackHandler,
  ToastAndroid,
} from "react-native";

// import react native dependencies
import { WebView } from "react-native-webview";
import LottieView from "lottie-react-native";

// import custom ads
import CustomAds from "../../Helper/CustomAds";

// import redux
import { useSelector, useDispatch } from "react-redux";

// import admob ads dependenncies
import { AdMobBanner } from "expo-ads-admob";

// import download movie
import { DownloadMovie } from "../../Helper/SystemFunction";

// import admob ads
import { rewardInterstitial, interstitial } from "../../Helper/AdmobAds";

const WebViewScreen = ({ navigation, route }) => {
  const { MOVIE_URL, TYPE, TOP_RATE, NAME, IMAGE } = route.params;
  const admobAdsData = useSelector((state) => state.admobAds);

  const downloadPercent = useSelector((state) => state.donwloadPercent);
  const [progressBar, setProgressBar] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    setProgressBar(downloadPercent + "%");
  }, [downloadPercent]);

  useEffect(() => {
    requestInterstitialAds();
  }, []);

  const requestInterstitialAds = () => {
    if (admobAdsData.interstitial && admobAdsData.interstitial_video) {
      if (TOP_RATE == 1) {
        rewardInterstitial(admobAdsData.interstitial_video);
      } else {
        interstitial(admobAdsData.interstitial);
      }
    }
  };

  // frontend encryted code
  const webRef = useRef();
  const [touch, setTouch] = useState(false);
  const [link, setLink] = useState();
  const jsCode =
    'window.ReactNativeWebView.postMessage(document.querySelector("#btn-preview").click())';

  useEffect(() => {
    checkTypeAndGetMovieData();
  }, [touch]);

  const checkTypeAndGetMovieData = () => {
    if (touch) {
      if (TYPE == 1) {
        setTimeout(() => {
          webRef.current.injectJavaScript(
            'window.ReactNativeWebView.postMessage(document.querySelector(".play").click())'
          );
          webRef.current.injectJavaScript(
            'window.ReactNativeWebView.postMessage(document.querySelector("source").getAttribute("src"))'
          );
        }, 3000);
      } else if (TYPE == 2) {
        setTimeout(() => {
          webRef.current.injectJavaScript(
            'window.ReactNativeWebView.postMessage(document.querySelector("source").getAttribute("src"))'
          );
          webRef.current.injectJavaScript(
            'window.ReactNativeWebView.postMessage(document.querySelector(".icon-little-thin-left-arrow").style.display = "none")'
          );
        }, 3000);
      } else if (TYPE == 3) {
        setTimeout(() => {
          webRef.current.injectJavaScript(
            'window.ReactNativeWebView.postMessage(document.querySelector("source").getAttribute("src"))'
          );
        }, 3000);
      }
    }
  };

  // Get native ads data
  const adsData = useSelector((state) => state.ads);
  const [nativeAds, setNativeAds] = useState();
  const [banner_5, setBanner_5] = useState();
  useEffect(() => {
    filterAdsData(adsData);
  }, []);

  const filterAdsData = (data) => {
    data.filter((dt) => {
      if (dt.id == 1) {
        setNativeAds(dt);
      } else if (dt.id == 5) {
        setBanner_5(dt);
      }
    });
  };

  const downloadInWebview = (param, type) => {
    if (type == 1) {
      const linkArr = param.split("?");
      const downloadLink = linkArr[0] + "?download=true&" + linkArr[1];
      navigation.navigate("WebViewDownloadScreen", {
        DOWNLOAD_LINK: downloadLink,
      });
    } else {
      navigation.navigate("WebViewDownloadScreen", {
        DOWNLOAD_LINK: param,
      });
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webRef}
        source={{
          uri: MOVIE_URL,
        }}
        injectedJavaScript={jsCode}
        style={styles.webViewContainer}
        onNavigationStateChange={(state) => {
          if (!state.loading) {
            setTouch(!touch);
          }
        }}
        onMessage={(mess) => {
          if (typeof mess !== "undefined") {
            if (
              mess.nativeEvent.data !== "undefined" &&
              mess.nativeEvent.data !== "none"
            ) {
              setLink(mess.nativeEvent.data);
            }
          }
        }}
      />

      <ImageBackground
        style={styles.funcContainer}
        source={require("../../assets/photos/car-kissing.jpg")}
        resizeMode="stretch"
      >
        {admobAdsData.native ? (
          <View style={styles.nativeAdsContainer_2}>
            <AdMobBanner
              bannerSize="mediumRectangle"
              adUnitID={admobAdsData.native}
              servePersonalizedAds
            />
          </View>
        ) : (
          <View style={styles.nativeAdsContainer}>
            {nativeAds && <CustomAds type={"Native"} adsCode={nativeAds} />}
          </View>
        )}

        {link ? (
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "red" }]}
              onPress={() => {
                if (TYPE != 3) {
                  downloadInWebview(link, TYPE);
                } else {
                  if (downloadPercent > 0 && downloadPercent != 100) {
                    ToastAndroid.show(
                      "Still Downloading. Please Wait",
                      ToastAndroid.SHORT
                    );
                  } else {
                    DownloadMovie(link, NAME, dispatch, IMAGE);
                  }
                }
              }}
            >
              <Text style={styles.btnText}>Download Movie</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "green" }]}
              onPress={() => {
                navigation.navigate("MovieViewScreen", {
                  MOVIE_URL: link,
                });
              }}
            >
              <Text style={styles.btnText}>Watch Movie</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.btnContainer}>
            <View>
              <LottieView
                source={require("../../assets/animations/loading-letter_2.json")}
                autoPlay
                loop
                style={styles.lottie}
              />
            </View>
          </View>
        )}

        {TYPE == 3 && downloadPercent > 0 && downloadPercent != 100 && (
          <View style={styles.downloadPercentContainer}>
            <Text style={styles.downloadPercentText}>
              Downloading... {downloadPercent}%
            </Text>
            <View style={[styles.progressBar, { width: progressBar }]}></View>
          </View>
        )}

        {admobAdsData.banner ? (
          <View style={styles.bannerContainer}>
            <AdMobBanner
              bannerSize="banner"
              adUnitID={admobAdsData.banner}
              servePersonalizedAds
            />
          </View>
        ) : (
          <>{banner_5 && <CustomAds type={"Banner_1"} adsCode={banner_5} />}</>
        )}
      </ImageBackground>
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
  webViewContainer: {
    width: "100%",
    height: "100%",
    opacity: 0,
  },
  funcContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },
  nativeAdsContainer: {
    width: Dimensions.get("screen").width - 28,
    height: Dimensions.get("screen").width - 28,
    borderWidth: 1,
    borderColor: "grey",
    overflow: "hidden",
    marginBottom: 130,
    marginTop: 70,
  },
  nativeAdsContainer_2: {
    width: Dimensions.get("screen").width - 28,
    height: Dimensions.get("screen").width - 28,
    marginBottom: 130,
    marginTop: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    width: "100%",
    height: 100,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5,
  },
  btn: {
    width: 130,
    height: 50,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 13,
  },
  lottie: {
    width: 120,
    height: 350,
    backgroundColor: "transparent",
  },
  bannerContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  downloadPercentContainer: {
    width: 200,
    height: 50,
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparant",
    borderWidth: 0.5,
    borderColor: "white",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#512DA8",
    zIndex: -1,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  downloadPercentText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default WebViewScreen;
