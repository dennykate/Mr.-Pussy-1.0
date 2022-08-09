import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
  StyleSheet,
} from "react-native";

const ConnectionLose = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={require("../assets/photos/connection-error.png")}
        />
        <Text style={styles.text}>ဇာတ်ကားများ ကြည့်ရှု့ရန် Vpnခံပေးရပါမည်</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => BackHandler.exitApp()}
        >
          <Text style={styles.btnText}>VPN ပြန်ချိတ်မည်</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000d2",
  },
  card: {
    width: 300,
    height: 400,
    backgroundColor: "red",
    paddingVertical: 15,
  },
  image: {
    width: 220,
    height: 220,
    marginHorizontal: 40,
    resizeMode: "contain",
  },
  text: {
    alignSelf: "center",
    marginHorizontal: 1,
    lineHeight: 25,
    fontWeight: "800",
    marginTop: 40,
    color: "white",
  },
  btn: {
    width: 150,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "white",
    marginTop: 20,
    borderWidth: 3,
    borderColor: "black",
  },
  btnText: {
    fontWeight: "bold",
    color: "red",
  },
});

export default ConnectionLose;
