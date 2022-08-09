import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, ToastAndroid } from "react-native";

// import react native dependencies
import { WebView } from "react-native-webview";
import LottieView from "lottie-react-native";

const WebViewDownloadScreen = ({ route, navigation }) => {
  const { DOWNLOAD_LINK } = route.params;
  const webRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      ToastAndroid.show("ဒေါင်းလုဒ်လုပ်ခြင်း စတင်ပါပြီ !", ToastAndroid.SHORT);
      navigation.goBack();
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/animations/woman-mouth.json")}
        style={styles.lottie}
        autoPlay
        loop
      />
      <LottieView
        source={require("../../assets/animations/download-animation.json")}
        style={styles.lottie_2}
        autoPlay
        loop
      />
      <WebView
        ref={webRef}
        source={{ uri: DOWNLOAD_LINK }}
        style={styles.webView}
        onNavigationStateChange={(state) => {
          console.log(state);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  webView: {
    opacity: 0,
  },
  lottie: {
    width: 250,
    height: 250,
    marginTop: 50,
    alignSelf: "center",
  },
  lottie_2: {
    width: 250,
    height: 200,
    marginTop: 30,
    alignSelf: "center",
  },
});

export default WebViewDownloadScreen;
