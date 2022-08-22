import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Linking,
  Dimensions,
} from "react-native";

// import helper
import { DownloadMovie } from "../../Helper/SystemFunction";

// import admob ads dependenncies
import { AdMobBanner } from "expo-ads-admob";

const DetailBody = ({ navigation, data, admobAdsCode, type }) => {
  return (
    <View style={styles.container}>
      <View style={type == "thumbnail" ? styles.thumbnail : styles.poster}>
        <Image source={{ uri: data.image }} style={styles.image} />
      </View>

      {admobAdsCode.banner.length > 0 && (
        <AdMobBanner
          bannerSize="banner"
          adUnitID={admobAdsCode.banner}
          servePersonalizedAds
          style={{ alignSelf: "center" }}
        />
      )}

      <View style={styles.detailContainer}>
        <Text style={styles.title}>
          {data.title.length > 30
            ? data.title.substring(0, 30) + "..."
            : data.title}{" "}
        </Text>
        <Text style={styles.detail}>
          Code : <Text style={styles.detailData}> {data.code} </Text>
        </Text>
        <Text style={styles.detail}>
          File Size : <Text style={styles.detailData}> {data.size} </Text>
        </Text>
        <Text style={styles.detail}>
          Duration : <Text style={styles.detailData}> {data.duration} </Text>
        </Text>
        <View style={styles.aboutTitleContainer}>
          <Text style={styles.aboutTitle}>Detail</Text>
        </View>
        <Text style={styles.aboutDetail}>{data.content} </Text>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate("WebViewScreen", {
              MOVIE_URL: data.movie,
              TYPE: data.type,
              TOP_RATE: data.top_rate,
              NAME: data.title,
              IMAGE: data.image,
              HD: data.hd,
            });
          }}
        >
          <Text style={styles.btnText}>Watch Movie</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 500,
  },
  poster: {
    width: Dimensions.get("screen").width - 20,
    height: (Dimensions.get("screen").width * 9) / 16,
    marginVertical: 20,
    overflow: "hidden",
    borderWidth: 0.8,
    borderColor: "grey",
    alignSelf: "center",
    borderTopLeftRadius: 25,
    borderBottomEndRadius: 25,
  },
  thumbnail: {
    width: 220,
    height: 320,
    marginVertical: 20,
    overflow: "hidden",
    borderWidth: 0.8,
    borderColor: "grey",
    alignSelf: "center",
    borderTopLeftRadius: 25,
    borderBottomEndRadius: 25,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailContainer: {
    width: "80%",
    alignSelf: "center",
    marginTop: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: "NotoSansMyanmar-SemiBold",
    color: "orange",
    marginBottom: 12,
    marginLeft: 10,
    letterSpacing: 1,
  },
  detail: {
    color: "orange",
    fontSize: 14,
    fontFamily: "NotoSansMyanmar-Bold",
    marginTop: 10,
  },
  detailData: {
    color: "grey",
    fontSize: 14,
    fontFamily: "Roboto",
    marginLeft: 20,
  },
  btnContainer: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
    marginTop: 15,
  },
  btn: {
    width: 200,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "red",
    marginHorizontal: 10,
  },
  btnText: {
    color: "white",
    fontFamily: "NotoSansMyanmar-Bold",
    fontSize: 15,
    letterSpacing: 0.5,
  },
  aboutTitleContainer: {
    width: 70,
    height: 33,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "orange",
  },
  aboutTitle: {
    color: "orange",
    fontFamily: "NotoSansMyanmar-Bold",
    fontSize: 17,
    letterSpacing: 1,
  },
  aboutDetail: {
    fontSize: 14,
    color: "grey",
    marginTop: 13,
    letterSpacing: 0.3,
  },
  howToDownload: {
    width: 240,
    height: 46,
    backgroundColor: "purple",
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 40,
  },
  howToDownloadText: {
    color: "white",
    fontFamily: "NotoSansMyanmar-Bold",
    fontSize: 14,
    letterSpacing: 0.5,
  },
});

export default DetailBody;
