import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";

// import redux
import { useSelector } from "react-redux";

// import admob ads dependenncies
import { AdMobBanner } from "expo-ads-admob";

// import admob ads
import { reward } from "../../Helper/AdmobAds";

const width = Dimensions.get("screen").width - 100;

const DonationScreen = () => {
  const admobAdsData = useSelector((state) => state.admobAds);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Support Us For More Videos</Text>
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
        <Image
          source={require("../../assets/photos/donation-screen-image.jpg")}
          style={styles.image}
        />

        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => {
              if (admobAdsData.reward) {
                reward(admobAdsData.reward);
              }
            }}
          >
            <Image
              source={{ uri: "https://i.postimg.cc/QxzcLVyB/eimi-fukada.png" }}
              style={styles.cardImage}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => {
              if (admobAdsData.reward) {
                reward(admobAdsData.reward);
              }
            }}
          >
            <Image
              source={{
                uri: "https://i.postimg.cc/k47bNSBH/thien-than-sexy-phim-18-la-yua-mikami-4-1603597572-474-width660height616.jpg",
              }}
              style={styles.cardImage}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => {
              if (admobAdsData.reward) {
                reward(admobAdsData.reward);
              }
            }}
          >
            <Image
              source={{
                uri: "https://i.postimg.cc/DwZFGwvc/5f5c4515b2ab4082dd03997a-Tsukasa-Aoi-1.jpg",
              }}
              style={styles.cardImage}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => {
              if (admobAdsData.reward) {
                reward(admobAdsData.reward);
              }
            }}
          >
            <Image
              source={{
                uri: "https://i.postimg.cc/tR3XQcvF/images.jpg",
              }}
              style={styles.cardImage}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => {
              if (admobAdsData.reward) {
                reward(admobAdsData.reward);
              }
            }}
          >
            <Image
              source={{
                uri: "https://i.postimg.cc/KzXyC7n9/x3-WFQJOVZED339s7.jpg",
              }}
              style={styles.cardImage}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => {
              if (admobAdsData.reward) {
                reward(admobAdsData.reward);
              }
            }}
          >
            <Image
              source={{
                uri: "https://i.postimg.cc/Xq46YV1d/10-10-1583396684-476-width800height700.jpg",
              }}
              style={styles.cardImage}
            />
          </TouchableOpacity>
        </View>
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
    marginTop: 5,
  },
  image: {
    width: width,
    height: (width * 40) / 100,
    alignSelf: "center",
    marginVertical: 20,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: 30,
  },
  card: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
});

export default DonationScreen;
