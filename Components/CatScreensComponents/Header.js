import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";

// import dependencies
import Ionicons from "react-native-vector-icons/Ionicons";

const Header = ({ navigation }) => {
  const [password, setPassword] = useState();
  return (
    <View style={styles.header}>
      <View style={styles.inpBtnContainer}>
        <TextInput
          value={password}
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#000000c0"
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.8}
          onPress={() => {
            if (password == "55555") {
              navigation.navigate("MainScreen");
            } else {
              ToastAndroid.show("Nice Job", ToastAndroid.SHORT);
            }
            setPassword("");
          }}
        >
          <Ionicons name="enter-outline" size={25} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 100,
    backgroundColor: "#232526",
    paddingTop: 23,
    borderBottomWidth: 0.2,
    borderBottomColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
  inpBtnContainer: {
    width: Dimensions.get("screen").width - 30,
    height: 40,
    flexDirection: "row",
  },
  input: {
    width: "85%",
    height: 40,
    backgroundColor: "orange",
    color: "black",
    fontWeight: "bold",
    paddingHorizontal: 15,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  btn: {
    width: "15%",
    height: 40,
    backgroundColor: "white",
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingEnd: 8,
  },
});

export default Header;
