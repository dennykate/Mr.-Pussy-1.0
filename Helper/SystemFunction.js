// import expo dependencies
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

// import async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Alert, BackHandler, ToastAndroid } from "react-native";

export const DownloadMovie = (URL, NAME, dispatch, IMAGE) => {
  const saveFile = async (fileUri) => {
    let permission = await MediaLibrary.requestPermissionsAsync();

    if (permission.granted) {
      const asset = await MediaLibrary.createAssetAsync(fileUri);

      storeFile(fileUri, NAME, IMAGE);

      await MediaLibrary.createAlbumAsync("../Mr Pussy", asset, false);
    }
    return permission.granted;
  };

  const storeFile = async (link, name, image) => {
    const id = new Date().getTime();
    const file = {
      id: id,
      link: link,
      name: name,
      image: image,
    };

    const jsonFile = JSON.stringify(file);

    try {
      await AsyncStorage.setItem(String(id), jsonFile);
    } catch (e) {
      console.log(e);
    }
  };

  const schedulePushNotification = async (res_file_name) => {
    // I dont use noti
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Download Success",
        body: res_file_name,
        data: { data: "goes here" },
        sound: "notification-sound.wav",
      },

      trigger: { seconds: 1, channelId: "default" },
    });
  };

  const fileDownLoad = async (url) => {
    const file_name = NAME + ".mp4";

    let downloadResumable = FileSystem.createDownloadResumable(
      url,

      FileSystem.documentDirectory + file_name,

      {},

      (res) => {
        const percentage = Math.floor(
          (res.totalBytesWritten / res.totalBytesExpectedToWrite) * 100
        );
        dispatch({
          type: "Add Download File",
          payload: percentage,
        });
      }
    );

    try {
      const { uri } = await downloadResumable.downloadAsync().then((item) => {
        return item;
      });

      await saveFile(uri).then((res) => {
        if (res) {
          schedulePushNotification(file_name.split(".")[0]);
          ToastAndroid.showWithGravity(
            `${file_name.split(".")[0]} - Download Success !`,

            ToastAndroid.SHORT,
            ToastAndroid.TOP
          );
        } else {
          ToastAndroid.show(
            "Need Permission For Download Video!",
            ToastAndroid.SHORT
          );
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  fileDownLoad(URL);
};

export const registerForPushNotificationsAsync = async () => {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      lightColor: "#FF231F7C",
      sound: "notification-sound.wav",
    });
  }

  return token;
};

export const backAction = () => {
  Alert.alert("Mr. Pussy", "Exit Now ", [
    {
      text: "No",
      onPress: () => {
        ToastAndroid.show("Nice Job!!", ToastAndroid.SHORT);
      },
      style: "cancel",
    },
    { text: "Exit", onPress: () => BackHandler.exitApp() },
  ]);

  return true;
};
