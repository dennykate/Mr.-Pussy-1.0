import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet, Image, ScrollView } from "react-native";

// import social cards
import {
  Facebook,
  Telegram,
  Suggestion,
  Messenger,
  Youtube,
} from "../../Helper/SocialCards";

const Body = ({ data }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.bodyCard}>
          <Image
            source={require("../../assets/photos/girl-background.jpg")}
            style={styles.imgBackground}
            resizeMode="contain"
          />
          <View style={styles.socialContainer}>
            <Facebook data={data.fb_page} />
            <Telegram data={data.telegram_channel} />
            <Youtube data={data.youtube} />
            <Messenger data={data.messenger} />
            <Suggestion data={data.telegram_acc} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 650,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  bodyCard: {
    width: Dimensions.get("screen").width - 20,
    height: "90%",
    backgroundColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "grey",
    alignItems: "center",
    overflow: "hidden",
  },
  imgBackground: {
    width: "100%",
    height: "42%",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.9,
    resizeMode: "cover",
  },
  socialContainer: {
    width: "100%",
    height: "70%",
    borderTopWidth: 1,
    borderTopColor: "grey",
    backgroundColor: "black",
  },
});

export default Body;
