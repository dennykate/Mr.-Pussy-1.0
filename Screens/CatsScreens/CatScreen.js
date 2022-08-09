import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";

// import components
import Header from "../../Components/CatScreensComponents/Header";
import Images from "../../Components/CatScreensComponents/Images";

// import admob ads dependenncies
import { AdMobBanner } from "expo-ads-admob";

// import firebase database
import { db } from "../../Helper/Config";

const CatScreen = ({ navigation }) => {
  const [admobAdsCode, setAdmobAdsCode] = useState("");
  useEffect(() => {
    fetchAdmobAdsDataFromFirebase();
  }, []);

  const fetchAdmobAdsDataFromFirebase = async () => {
    const admobAdsRef = await db.firestore().collection("admob_ads");
    await admobAdsRef.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setAdmobAdsCode(doc.data());
      });
    });
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <ScrollView>
        <Image
          source={require("../../assets/photos/girl-background.jpg")}
          style={styles.image}
        />

        {admobAdsCode && (
          <AdMobBanner
            bannerSize="smartBannerLandscape"
            adUnitID={admobAdsCode.banner}
            servePersonalizedAds
            style={{ alignSelf: "center", marginVertical: 20 }}
          />
        )}

        <Images />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  image: {
    width: 320,
    height: 100,
    marginTop: 10,
    alignSelf: "center",
    resizeMode: "cover",
  },
});

export default CatScreen;
