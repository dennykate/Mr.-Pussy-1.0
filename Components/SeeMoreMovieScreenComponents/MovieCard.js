import React, { useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Button,
} from "react-native";

// import custom ads
import CustomAds from "../../Helper/CustomAds";

const ItemCard = ({ data, navigation, ads }) => {
  // add banner ads
  useEffect(() => {
    const reAddAds = data.filter((dt) => dt.ads != "");

    let x = 0;
    for (let i = 0; i < reAddAds.length; i++) {
      if (!(i % 6) && i != 0) {
        reAddAds.splice(i + x, 0, { ads: 1 });
        x += 1;
      }
    }
    setRData(reAddAds);
  }, [data]);

  const [rData, setRData] = useState([]);
  const [limitAmount, setLimitAmount] = useState(10);
  return (
    <>
      {rData.map((dt, index) => {
        if (index < limitAmount) {
          if (dt.ads == 1) {
            return (
              <View key={index} style={styles.bannerContainer}>
                <CustomAds type={"Banner_3"} adsCode={ads} />
              </View>
            );
          }
          return (
            <View key={index}>
              <TouchableOpacity
                style={styles.movieCard}
                activeOpacity={0.5}
                onPress={() => {
                  navigation.navigate("MovieDetailScreen", dt);
                }}
              >
                <Image
                  source={{
                    uri: dt.image,
                  }}
                  style={styles.image}
                />
                <Text style={styles.movieName}>
                  {dt.title.length > 20
                    ? dt.title.substring(0, 20) + "..."
                    : dt.title}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }
      })}

      {limitAmount < rData.length && (
        <TouchableOpacity
          onPress={() => {
            setLimitAmount(limitAmount + 10);
          }}
          style={styles.addMore}
        >
          <Text style={styles.addMoreText}>နောက်ထပ်</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  movieCard: {
    width: 120,
    height: 175,
    backgroundColor: "#232526",
    marginHorizontal: 3,
    marginVertical: 12,
    borderRadius: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  movieName: {
    fontSize: 10,
    fontFamily: "NotoSansMyanmar-SemiBold",
    color: "white",
    marginLeft: 5,
    marginTop: 2,
  },
  bannerContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  addMore: {
    width: 120,
    height: 60,
    borderRadius: 30,
    backgroundColor: "red",
    position: "absolute",
    bottom: 5,
    left: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addMoreText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ItemCard;
