import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";

// import helper
import ItemCard from "../../Helper/ItemCard";

const RelatedMovies = ({ navigation, relatedData }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>အခြားသော ဇာတ်ကားများ</Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.5}
      >
        <ItemCard data={relatedData} navigation={navigation} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 300,
    paddingHorizontal: 10,
    marginBottom: 5,
    marginTop: 20,
  },
  titleContainer: {
    width: 175,
    height: 35,
    marginLeft: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "orange",
  },
  title: {
    fontSize: 15,
    color: "orange",
    fontFamily: "NotoSansMyanmar-SemiBold",
    letterSpacing: 0.5,
  },
});

export default RelatedMovies;
