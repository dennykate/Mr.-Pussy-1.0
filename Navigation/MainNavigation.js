import React, { useEffect } from "react";
import { Text } from "react-native";

// import dependencies
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

// import for push notification permission
import { registerForPushNotificationsAsync } from "../Helper/SystemFunction";
import * as Notifications from "expo-notifications";

// import screen
import HomeScreen from "../Screens/HomeScreens/HomeScreen";
import SettingScreen from "../Screens/SettingScreens/SettingScreen";
import SeeMoreMovies from "../Screens/HomeScreens/SeeMoreMoviesScreen";
import MovieDetailScreen from "../Screens/HomeScreens/MovieDetailScreen";
import MovieViewScreen from "../Screens/HomeScreens/MovieViewScreen";
import PhotoViewScreen from "../Screens/HomeScreens/PhotoViewScreen";
import SearchScreen from "../Screens/SearchScreens/SearchScreen";
import CatScreen from "../Screens/CatsScreens/CatScreen";
import WebViewScreen from "../Screens/WebViewScreens/WebViewScreen";
import WebViewDownloadScreen from "../Screens/WebViewScreens/WebViewDownloadScreen";
import DonationScreen from "../Screens/DonationScreens/DonationScreen";
import DownloadedFilesScreen from "../Screens/DownloadedFilesScreens/DownloadedFilesScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const HomeNavigation = () => {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animationEnabled: false }}
        initialRouteName="CatScreen"
      >
        <Stack.Screen name="MainScreen" component={BottomNavigation} />
        <Stack.Screen name="SeeMoreMoviesScreen" component={SeeMoreMovies} />
        <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />
        <Stack.Screen name="MovieViewScreen" component={MovieViewScreen} />
        <Stack.Screen name="PhotoViewScreen" component={PhotoViewScreen} />
        <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
        <Stack.Screen name="CatScreen" component={CatScreen} />
        <Stack.Screen
          name="WebViewDownloadScreen"
          component={WebViewDownloadScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let routeName = route.name;

          if (routeName == "HomeScreen") {
            iconName = focused ? "home" : "home-outline";
          } else if (routeName == "SearchScreen") {
            iconName = focused ? "search" : "search-outline";
          } else if (routeName == "DonationScreen") {
            iconName = focused ? "cash" : "cash-outline";
          } else if (routeName == "DownloadedFilesScreen") {
            iconName = focused ? "cloud-download" : "cloud-download-outline";
          } else if (routeName == "SettingScreen") {
            iconName = focused ? "copy" : "copy-outline";
          }

          return <Ionicons name={iconName} size={20} color={color} />;
        },
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "#f5f5f5",
        tabBarStyle: {
          padding: 10,
          paddingBottom: 10,
          height: 60,
          backgroundColor: "#232526",
        },
        tabBarLabelStyle: {
          display: "none",
        },
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="DonationScreen"
        component={DonationScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="DownloadedFilesScreen"
        component={DownloadedFilesScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
