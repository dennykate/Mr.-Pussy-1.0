import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  ToastAndroid,
} from "react-native";

// import expo dependencies
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";

// import lottie
import LottieView from "lottie-react-native";

// import dependencies
import Ionicons from "react-native-vector-icons/Ionicons";

const dummy =
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const MovieViewScreen = () => {
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

  const videoRef = useRef(null);
  const [load, setLoad] = useState(false);
  const [lineError, setLineError] = useState(true);
  const [keyForAutoPlay, setKeyForAutoPlay] = useState(0);
  const [status, setStatus] = useState({});
  const [rotate, setRotate] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [reqControlBtn, setReqControlBtn] = useState(false);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        style={[styles.video, { height: !rotate ? "100%" : "90%" }]}
        source={{ uri: dummy }}
        useNativeControls={true}
        resizeMode="contain"
        isLooping={false}
        volume={volume}
        onPlaybackStatusUpdate={(status) => {
          console.log(status);
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
              videoRef.current.playAsync();
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

      {/* {!lineError ? (
        <LottieView
          source={require("../../assets/animations/loading.json")}
          autoPlay
          loop
          style={{ height: 250, backgroundColor: "transparent" }}
        />
      ) : (
        <></>
      )} */}

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

      {reqControlBtn && (
        <View style={styles.controlContainer}>
          <View style={styles.leftSide}>
            <TouchableOpacity
              style={styles.volumeBtn}
              onPress={() => {
                if (volume >= 0) {
                  setVolume(volume - 0.1);
                  ToastAndroid.show(
                    `Volume ${Math.floor(volume * 100)}%`,
                    ToastAndroid.SHORT
                  );
                } else {
                  ToastAndroid.show("Zero Volume", ToastAndroid.SHORT);
                }
                setReqControlBtn(false);
              }}
            >
              <Ionicons
                name="volume-high-outline"
                size={30}
                color={"#f5f5f5"}
              />
              <Text style={{ fontSize: 30, marginLeft: 3 }}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nextBtn}
              onPress={() => {
                videoRef.current.playFromPositionAsync(
                  status.positionMillis - 10000
                );
                setReqControlBtn(false);
              }}
            >
              <Ionicons
                name="play-back-circle-outline"
                size={45}
                color={"#f5f5f5"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.rightSide}>
            <TouchableOpacity
              style={styles.prevBtn}
              onPress={() => {
                videoRef.current.playFromPositionAsync(
                  status.positionMillis + 10000
                );
                setReqControlBtn(false);
              }}
            >
              <Ionicons
                name="play-forward-circle-outline"
                size={45}
                color={"#f5f5f5"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.volumeBtn}
              onPress={() => {
                if (volume <= 1) {
                  setVolume(volume + 0.1);
                  ToastAndroid.show(
                    `Volume ${Math.floor(volume * 100)}%`,
                    ToastAndroid.SHORT
                  );
                } else {
                  ToastAndroid.show("Full Volume", ToastAndroid.SHORT);
                }
                setReqControlBtn(false);
              }}
            >
              <Ionicons
                name="volume-high-outline"
                size={30}
                color={"#f5f5f5"}
              />
              <Text style={{ fontSize: 20, marginLeft: 3 }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.reqBtnsContainer}
        onPress={() => {
          setReqControlBtn(!reqControlBtn);
        }}
        activeOpacity={1}
      ></TouchableOpacity>
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
  controlContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    zIndex: 10,
  },
  leftSide: {
    width: 200,
    height: 100,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  rightSide: {
    width: 200,
    height: 100,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  nextBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  prevBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  volumeBtn: {
    width: 45,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  reqBtnsContainer: {
    width: "100%",
    height: "55%",
    position: "absolute",
  },
});

export default MovieViewScreen;
