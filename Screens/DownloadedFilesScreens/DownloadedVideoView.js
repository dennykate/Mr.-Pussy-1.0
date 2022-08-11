import React from "react";
import { View, Text, StyleSheet } from "react-native";

import VideoPlayer from "react-native-video-controls";
const DownloadedViewVideo = () => {
  return (
    <View style={styles.container}>
      <VideoPlayer
        source={{
          uri: "file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540denny_kate%252FMrPussy/Doctor%20Strange.mp4",
        }}
        style={styles.backgroundVideo}
      />
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default DownloadedViewVideo;
