import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

// import expo dependencies
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

// import components
import Header from "../../Components/SettingScreenComponents/SettingHeader";
import Body from "../../Components/SettingScreenComponents/SettingBody";

// import redux
import { useSelector } from "react-redux";

const SettingScreen = () => {
  const socialData = useSelector((state) => state.socials);

  const [loaded] = useFonts({
    "NotoSansMyanmar-SemiBold": require("../../assets/fonts/NotoSansMyanmar-SemiBold.ttf"),
    "NotoSansMyanmar-Bold": require("../../assets/fonts/NotoSansMyanmar-Bold.ttf"),
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
    "NotoSansMyanmar-Thin": require("../../assets/fonts/NotoSansMyanmar-Thin.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <View style={{ backgroundColor: "#000" }}>
      <Header />
      <Body data={socialData} />

      <StatusBar hidden={false} />
    </View>
  );
};

export default SettingScreen;
