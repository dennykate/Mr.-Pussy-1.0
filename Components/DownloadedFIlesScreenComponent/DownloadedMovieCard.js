import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ToastAndroid,
} from "react-native";

// import dependencies
import Ionicons from "react-native-vector-icons/Ionicons";

// import async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

const Width = (Dimensions.get("screen").width * 4) / 10;

const DonwloadedMovieCard = ({ data, navigation }) => {
  const getDownloadedDate = (time) => {
    const intTime = parseInt(time);
    const date = new Date(intTime);
    const strDate = String(date);
    const dateArr = strDate.split(" ");

    const realDate = `${dateArr[4]} - ${dateArr[1]} ${dateArr[2]} ${dateArr[3]} ( ${dateArr[0]} )`;

    return realDate;
  };

  const removeItem = async (id) => {
    try {
      let key = String(id);
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log(e);
    }

    ToastAndroid.show("Remove Success", ToastAndroid.SHORT);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: data.image }} style={styles.image} />
      <View style={styles.detail}>
        <Text style={styles.detailText}>
          {data.name.length > 25
            ? data.name.substring(0, 25) + "..."
            : data.name}
        </Text>
        <Text style={styles.detailText}>{getDownloadedDate(data.id)}</Text>

        <TouchableOpacity
          style={styles.watchBtnContainer}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate("MovieViewScreen", {
              MOVIE_URL: data.link,
            });
          }}
        >
          <Ionicons name="play" size={20} color={"green"} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtnContainer}
          activeOpacity={0.5}
          onPress={() => {
            removeItem(data.id);
          }}
        >
          <Ionicons name="trash-outline" size={18} color={"red"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: (Width * 10) / 16,
    borderBottomWidth: 0.2,
    borderBottomColor: "grey",
    flexDirection: "row",
  },
  image: {
    width: Width,
    height: (Width * 9.9) / 16,
    marginTop: 1,
  },
  detail: {
    width: (Dimensions.get("screen").width * 6) / 10,
    flexDirection: "column",
    paddingVertical: 7,
    paddingLeft: 15,
  },
  detailText: {
    fontSize: 13,
    fontWeight: "400",
    color: "grey",
    letterSpacing: 0.3,
    marginBottom: 3,
  },
  watchBtnContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "green",
    backgroundColor: "transparent",
    borderWidth: 2,
    position: "absolute",
    right: 20,
    bottom: 10,
  },
  deleteBtnContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderColor: "red",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
    left: 20,
    bottom: 10,
  },
});

export default DonwloadedMovieCard;
