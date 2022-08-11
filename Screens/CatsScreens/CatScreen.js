import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";

// import expo dependencies
import { StatusBar } from "expo-status-bar";

// import components
import Header from "../../Components/CatScreensComponents/Header";
import Images from "../../Components/CatScreensComponents/Images";

// import admob ads dependenncies
import { AdMobBanner } from "expo-ads-admob";

// import firebase database
import { db } from "../../Helper/Config";

const CatScreen = ({ navigation }) => {
  const [admobAdsCode, setAdmobAdsCode] = useState({ banner: "" });
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
          source={require("../../assets/photos/cat-screen-image.jpg")}
          style={styles.image}
        />

        <Images adsCode={admobAdsCode} />

        <StatusBar hidden={false} />
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
