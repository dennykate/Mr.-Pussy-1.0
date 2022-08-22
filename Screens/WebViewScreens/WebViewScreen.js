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
import Ionicons from "react-native-vector-icons/Ionicons";

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

// import dummy data
import { colors, icons } from "../../Helper/DummyData";

const WebViewScreen = ({ navigation, route }) => {
  const { MOVIE_URL, TYPE, TOP_RATE, NAME, IMAGE, HD } = route.params;
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
  const jsCode_2 =
    'window.ReactNativeWebView.postMessage(document.querySelector(".fp-play").click())';

  useEffect(() => {
    checkTypeAndGetMovieData();
  }, [touch]);

  const checkTypeAndGetMovieData = () => {
    if (touch) {
      if (TYPE == 1) {
        webRef.current.injectJavaScript(
          'window.ReactNativeWebView.postMessage(document.querySelector(".play").click())'
        );
        webRef.current.injectJavaScript(
          'window.ReactNativeWebView.postMessage(document.querySelector("source").getAttribute("src"))'
        );
      } else if (TYPE == 2) {
        webRef.current.injectJavaScript(
          'window.ReactNativeWebView.postMessage(document.querySelector("source").getAttribute("src"))'
        );
        webRef.current.injectJavaScript(
          'window.ReactNativeWebView.postMessage(document.querySelector(".icon-little-thin-left-arrow").style.display = "none")'
        );
      } else if (TYPE == 3) {
        webRef.current.injectJavaScript(
          'window.ReactNativeWebView.postMessage(document.querySelector("video").getAttribute("src"))'
        );
      } else if (TYPE == 4) {
        webRef.current.injectJavaScript(
          'window.ReactNativeWebView.postMessage(document.querySelector("source").getAttribute("src"))'
        );
      } else if (TYPE == 5) {
        webRef.current.injectJavaScript(
          'window.ReactNativeWebView.postMessage(document.querySelector("video").getAttribute("src"))'
        );
      } else if (TYPE == 8) {
        webRef.current.injectJavaScript(
          'window.ReactNativeWebView.postMessage(document.querySelector("#overlay").click())'
        );

        webRef.current.injectJavaScript(
          'window.ReactNativeWebView.postMessage(document.querySelector("video").getAttribute("src"))'
        );
      }
    } else if (TYPE == 6) {
      fetchXvideosUrlFromApi(MOVIE_URL);
    } else if (TYPE == 7) {
      fetchRedtubeUrlFromApi(MOVIE_URL);
    }
  };

  const fetchXvideosUrlFromApi = async (api) => {
    const data = await fetch(
      "https://appsdev.cyou/xv-ph-rt/api/?site_id=xvideos&video_id=" + api
    );
    const json = await data.json();

    if (json) {
      setTimeout(() => {
        if (json.mp4.high.length > 0) {
          setLink(json.mp4.high);
        } else {
          setLink(json.mp4.low);
        }
      }, 3000);
    }
  };

  const fetchRedtubeUrlFromApi = async (api) => {
    const data = await fetch(
      "https://appsdev.cyou/xv-ph-rt/api/?site_id=redtube&video_id=" + api
    );
    const json = await data.json();

    if (json) {
      setTimeout(() => {
        if (HD == 1) {
          setLink(json.mp4["1080p"]);
        } else {
          if (json.mp4["720p"].length > 0) {
            setLink(json.mp4["720p"]);
          } else if (json.mp4["480p"].length > 0) {
            setLink(json.mp4["480p"]);
          } else if (json.mp4["240p"].length > 0) {
            setLink(json.mp4["240p"]);
          }
        }
      }, 3000);
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
      {TYPE != 6 && TYPE != 7 && (
        <WebView
          ref={webRef}
          source={{
            uri: MOVIE_URL,
          }}
          injectedJavaScript={TYPE == 5 ? jsCode_2 : jsCode}
          style={styles.webViewContainer}
          onNavigationStateChange={(state) => {
            console.log(state);
            if (!state.loading) {
              setTouch(true);
            }
          }}
          onMessage={(mess) => {
            console.log(mess);

            if (typeof mess !== "undefined") {
              if (
                mess.nativeEvent.data !== "undefined" &&
                mess.nativeEvent.data !== "none"
              ) {
                if (mess.nativeEvent.data == null) setTouch(true);

                if (TYPE == 8) {
                  setLink(mess.nativeEvent.data);
                  return;
                }
                setTimeout(() => {
                  setLink(mess.nativeEvent.data);
                }, 3000);
              } else {
                setTouch(!touch);
              }
            } else {
              setTouch(!touch);
            }
          }}
        />
      )}

      <View style={styles.screenContainer}>
        {admobAdsData.banner ? (
          <View style={styles.topBannerContainer}>
            <AdMobBanner
              bannerSize="largeBanner"
              adUnitID={admobAdsData.banner}
              servePersonalizedAds
            />
          </View>
        ) : (
          <View style={styles.bannerContainer_2}>
            {banner_5 && <CustomAds type={"Banner_1"} adsCode={banner_5} />}
          </View>
        )}

        <ImageBackground
          source={require("../../assets/photos/white-background.jpg")}
          style={styles.funcContainer}
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
                  if (TYPE == 1 || TYPE == 2) {
                    downloadInWebview(link, TYPE);
                  } else {
                    if (downloadPercent > 0 && downloadPercent != 100) {
                      ToastAndroid.show(
                        "Still Downloading... Please Wait",
                        ToastAndroid.SHORT
                      );
                    } else {
                      ToastAndroid.show(
                        "Download Start !",
                        ToastAndroid.BOTTOM
                      );
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

          {TYPE != 1 &&
            TYPE != 2 &&
            downloadPercent > 0 &&
            downloadPercent != 100 && (
              <View style={styles.downloadPercentContainer}>
                <Text style={styles.downloadPercentText}>
                  Downloading... {downloadPercent + "%"}
                </Text>
                <View
                  style={[styles.progressBar, { width: progressBar }]}
                ></View>
              </View>
            )}

          {/* {icons.map((code, index) => {
            return (
              <Ionicons
                name={icons[index]}
                size={22}
                color={colors[index]}
                style={
                  index < 5
                    ? [
                        styles.star,
                        { bottom: Math.floor(Math.random() * 130) },
                        {
                          right: Math.floor(
                            Math.random() * Dimensions.get("screen").width - 50
                          ),
                        },
                      ]
                    : [
                        styles.star,
                        { bottom: Math.floor(Math.random() * 130) },
                        {
                          left: Math.floor(
                            Math.random() * Dimensions.get("screen").width - 50
                          ),
                        },
                      ]
                }
                key={index}
              />
            );
          })} */}
        </ImageBackground>

        {admobAdsData.banner ? (
          <View style={styles.bannerContainer}>
            <AdMobBanner
              bannerSize="banner"
              adUnitID={admobAdsData.banner}
              servePersonalizedAds
            />
          </View>
        ) : (
          <View style={styles.bannerContainer_2}>
            {banner_5 && <CustomAds type={"Banner_1"} adsCode={banner_5} />}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  star: {
    position: "absolute",
    transform: [{ rotate: "45deg" }],
    zIndex: 20,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#8E2DE2",
  },
  screenContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#8E2DE2",
    zIndex: 2,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  webViewContainer: {
    width: "100%",
    height: "100%",
    opacity: 0,
  },
  funcContainer: {
    width: Dimensions.get("screen").width - 30,
    minHeight: 500,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    alignSelf: "center",
    transform: [{ translateY: 20 }],
    overflow: "hidden",
  },
  nativeAdsContainer: {
    width: Dimensions.get("screen").width - 28,
    height: Dimensions.get("screen").width - 28,
    borderWidth: 1,
    borderColor: "grey",
    overflow: "hidden",
    marginBottom: 30,
    zIndex: 10,
  },
  nativeAdsContainer_2: {
    width: Dimensions.get("screen").width - 28,
    height: Dimensions.get("screen").width - 28,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  btnContainer: {
    width: "100%",
    height: 100,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5,
    zIndex: 10,
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
    width: 100,
    height: 330,
    backgroundColor: "transparent",
  },
  topBannerContainer: {
    width: "100%",
    position: "absolute",
    top: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerContainer_2: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: 20 }],
  },
  downloadPercentContainer: {
    width: 250,
    height: 50,
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparant",
    borderWidth: 0.5,
    borderColor: "black",
    overflow: "hidden",
    borderRadius: 25,
    marginBottom: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#8E2DE2",
    zIndex: -1,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  downloadPercentText: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default WebViewScreen;
