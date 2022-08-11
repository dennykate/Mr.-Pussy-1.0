import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";

// import helper
import ItemCard from "../../Helper/ItemCard";

const RelatedMovies = ({ navigation, relatedData }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Recommended Movies</Text>
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
    width: 225,
    height: 35,
    marginLeft: 10,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "orange",
  },
  title: {
    fontSize: 20,
    color: "orange",
    fontWeight: "bold",
  },
});

export default RelatedMovies;
