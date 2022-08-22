import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

// import custom ads
import CustomAds from "./CustomAds";

const length = Dimensions.get("screen").width - 50;

const IntroNoticeCard = ({ data }) => {
  useEffect(() => {
    showEnterFunc();
    showTimer();
  }, []);
  const [showIntro, setShowIntro] = useState(true);
  const [enterBtn, setEnterBtn] = useState();
  const [timer, setTimer] = useState(5);

  const showEnterFunc = () => {
    setEnterBtn(false);

    setTimeout(() => {
      setShowIntro(false);
    }, 10000);
  };

  const showTimer = () => {
    let x = 5; // x for timer number
    let interval = setInterval(() => {
      x -= 1;
      setTimer(x);
    }, 2000);

    setTimeout(() => {
      clearInterval(interval);
    }, 10000);
  };
  return (
    <>
      {showIntro && (
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              <CustomAds type={"Native"} adsCode={data} />
            </View>
            {enterBtn ? (
              <TouchableOpacity
                style={styles.btn}
                onPress={() => setShowIntro(false)}
              >
                <Text style={styles.btnText}>ဇာတ်ကားကြည့်မည်</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.watingBtn} activeOpacity={1}>
                <Text style={styles.watingBtnText}>
                  <Text style={{ color: "red", fontSize: 20 }}>{timer} </Text>
                  စက္ကန့်စောင့်ပါ...
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </>
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
    zIndex: 10,
    backgroundColor: "#000000c0",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: length,
    height: length,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: Dimensions.get("screen").width - 28,
    height: Dimensions.get("screen").width - 28,
    borderWidth: 0.5,
    borderColor: "grey",
    overflow: "hidden",
  },
  btn: {
    width: 160,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    position: "absolute",
    bottom: 0,
    transform: [{ translateY: 70 }],
    borderWidth: 2,
    borderColor: "red",
  },
  btnText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "orange",
    fontFamily: "NotoSansMyanmar-Bold",
  },
  watingBtn: {
    width: 160,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    position: "absolute",
    bottom: 0,
    transform: [{ translateY: 70 }],
    borderWidth: 2,
    borderColor: "white",
  },
  watingBtnText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    fontFamily: "NotoSansMyanmar-Bold",
  },
});

export default IntroNoticeCard;
