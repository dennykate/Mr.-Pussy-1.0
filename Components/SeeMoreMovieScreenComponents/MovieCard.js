import React, { useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Button,
  Dimensions,
} from "react-native";

// import custom ads
import CustomAds from "../../Helper/CustomAds";

const Width = (Dimensions.get("screen").width * 4.8) / 10;
const SearchPageWidth = (Dimensions.get("screen").width * 3) / 10;

const ItemCard = ({ data, navigation, ads, limitAmount, searchPage, type }) => {
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
  // const [limitAmount, setLimitAmount] = useState(10);
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
              {type == "thumbnail" ? (
                <ThumbnailSize dt={dt} navigation={navigation} type={type} />
              ) : (
                <PosterSize
                  dt={dt}
                  navigation={navigation}
                  searchPage={searchPage}
                  type={type}
                />
              )}
            </View>
          );
        }
      })}

      {/* {limitAmount < rData.length && (
        <TouchableOpacity
          onPress={() => {
            setLimitAmount(limitAmount + 10);
          }}
          style={styles.addMore}
        >
          <Text style={styles.addMoreText}>နောက်ထပ်</Text>
        </TouchableOpacity>
      )} */}
    </>
  );
};

const PosterSize = ({ dt, searchPage, navigation, type }) => {
  return (
    <TouchableOpacity
      style={styles.movieCard}
      activeOpacity={0.5}
      onPress={() => {
        navigation.navigate("MovieDetailScreen", { dt: dt, type: type });
      }}
    >
      <Image
        source={{
          uri: dt.image,
        }}
        style={styles.image}
      />
      <Text style={styles.movieName}>
        {dt.title.length > 30 ? dt.title.substring(0, 30) + "..." : dt.title}
      </Text>
    </TouchableOpacity>
  );
};

const ThumbnailSize = ({ dt, navigation, type }) => {
  return (
    <TouchableOpacity
      style={styles.thumbnailCard}
      activeOpacity={0.5}
      onPress={() => {
        navigation.navigate("MovieDetailScreen", { dt: dt, type: type });
      }}
    >
      <Image
        source={{
          uri: dt.image,
        }}
        style={styles.thumbnailImg}
      />
      <Text style={styles.thumbnailTitle}>
        {dt.title.length > 20 ? dt.title.substring(0, 20) + "..." : dt.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  movieCard: {
    width: Width,
    height: (Width * 12) / 16,
    backgroundColor: "#232526",
    marginHorizontal: 3,
    marginVertical: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: (Width * 10) / 16,
    resizeMode: "cover",
  },
  movieName: {
    fontSize: 10,
    fontFamily: "NotoSansMyanmar-SemiBold",
    color: "white",
    marginLeft: 5,
    marginTop: 2,
  },
  thumbnailCard: {
    width: SearchPageWidth,
    height: SearchPageWidth * 1.5,
    backgroundColor: "#232526",
    marginHorizontal: 3,
    marginVertical: 7,
    borderRadius: 3,
    overflow: "hidden",
  },
  thumbnailImg: {
    width: "100%",
    height: SearchPageWidth * 1.3,
    resizeMode: "cover",
  },
  thumbnailTitle: {
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
    transform: [{ translateY: 10 }],
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
