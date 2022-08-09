import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from "react-native";

// import expo dependencies
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";

const MovieViewScreen = ({ route }) => {
  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
    );
  }, []);

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setPositionAsync("absolute");
    NavigationBar.setBackgroundColorAsync("#ffffff00");
    NavigationBar.setButtonStyleAsync("light");
  }, [status]);

  // back press
  const defaultSetUp = () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    NavigationBar.setVisibilityAsync("visible");
    NavigationBar.setBackgroundColorAsync("#000");
    NavigationBar.setPositionAsync("relative");
  };
  BackHandler.addEventListener("hardwareBackPress", defaultSetUp);

  const { MOVIE_URL } = route.params;

  const video = useRef(null);
  const [load, setLoad] = useState(false);
  const [lineError, setLineError] = useState(true);
  const [keyForAutoPlay, setKeyForAutoPlay] = useState(0);
  const [status, setStatus] = useState({});
  const [rotate, setRotate] = useState(false);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={[styles.video, { height: !rotate ? "100%" : "90%" }]}
        source={{ uri: MOVIE_URL }}
        useNativeControls={true}
        resizeMode="contain"
        isLooping={true}
        onPlaybackStatusUpdate={(status) => {
          //set state data
          setLoad(status.isLoaded);
          setLineError(status.isPlaying);
          setStatus(() => status);

          // hide bottom bar
          if (lineError == true) {
            NavigationBar.setVisibilityAsync("hidden");
          }

          // auto play
          if (keyForAutoPlay == 0) {
            if (status.isLoaded) {
              video.current.playAsync();
              setKeyForAutoPlay(1);
            }
          }
        }}
      />

      {!load ? (
        <View style={styles.lottieContainer}>
          <LottieView
            source={require("../../assets/animations/loading-letter.json")}
            autoPlay
            loop
            style={{ height: 150 }}
          />
        </View>
      ) : (
        <></>
      )}

      {!lineError ? (
        <LottieView
          source={require("../../assets/animations/loading.json")}
          autoPlay
          loop
          style={{ height: 250, backgroundColor: "transparent" }}
        />
      ) : (
        <></>
      )}

      <StatusBar hidden={true} />

      <TouchableOpacity
        style={styles.rotateBtn}
        activeOpacity={0.5}
        onPress={() => {
          if (!rotate) {
            ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.PORTRAIT
            );
            setRotate(true);
          } else {
            ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
            );
            setRotate(false);
          }
        }}
      >
        <Image
          source={require("../../assets/photos/rotate-icon.png")}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    justifyContent: "center",
  },
  video: {
    width: "100%",
    position: "absolute",
  },
  lottieContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    backgroundColor: "black",
  },
  rotateBtn: {
    width: 30,
    height: 30,
    top: 20,
    left: 20,
    position: "absolute",
  },
  image: {
    width: 30,
    height: 30,
    opacity: 0.8,
  },
});

export default MovieViewScreen;
