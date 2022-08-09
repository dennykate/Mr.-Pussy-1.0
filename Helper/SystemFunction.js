// import expo dependencies
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import { Alert, BackHandler, ToastAndroid } from "react-native";

export const DownloadMovie = (URL, NAME) => {
  const saveFile = async (fileUri) => {
    let permission = await MediaLibrary.requestPermissionsAsync();

    if (permission.granted) {
      const asset = await MediaLibrary.createAssetAsync(fileUri);

      await MediaLibrary.createAlbumAsync("../Mr Pussy", asset, false);
    }
    return permission.granted;
  };

  const schedulePushNotification = async (res_file_name) => {
    // I dont use noti
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "အောင်မြင်ပါသည်",
        body: res_file_name + " အားဒေါင်းလုဒ်လုပ်ခြင်း အောင်မြင်ပါသည် !!",
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

      (res) => {}
    );

    try {
      const { uri } = await downloadResumable.downloadAsync().then((item) => {
        return item;
      });

      await saveFile(uri).then((res) => {
        if (res) {
          schedulePushNotification(file_name.split(".")[0]);
          ToastAndroid.showWithGravity(
            `${file_name.split(".")[0]} 
အားဒေါင်းလုဒ်လုပ်ခြင်းအောင်မြင်ပါသည် !`,

            ToastAndroid.SHORT,
            ToastAndroid.TOP
          );
        } else {
          ToastAndroid.show(
            "ဒေါင်းလုဒ်လုပ်ရန် Permission လိုအပ်ပါသည်!",
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
  Alert.alert("Mr. Pussy", "Application မှထွက်ခွာရန်တောင်းဆိုချက်", [
    {
      text: "မထွက်ပါ",
      onPress: () => {
        ToastAndroid.show("ရွေးချယ်မှု မှန်ကန်ပါတယ်!!", ToastAndroid.SHORT);
      },
      style: "cancel",
    },
    { text: "ထွက်မည်", onPress: () => BackHandler.exitApp() },
  ]);

  return true;
};
