import { ToastAndroid } from "react-native";
import { AdMobRewarded } from "expo-ads-admob";

const rewardInterstitial = async (adsCode) => {
  await AdMobRewarded.setAdUnitID(adsCode); // Test ID, Replace with your-admob-unit-id
  try {
    await AdMobRewarded.requestAdAsync({ servePersonalizedAds: false });
    await AdMobRewarded.showAdAsync();
  } catch (e) {
    console.log(e);
  }
};

const interstitial = async (adsCode) => {
  await AdMobRewarded.setAdUnitID(adsCode);
  try {
    await AdMobRewarded.requestAdAsync({ servePersonalizedAds: false });
    await AdMobRewarded.showAdAsync();
  } catch (e) {
    console.log(e);
  }
};

const reward = async (adsCode) => {
  await AdMobRewarded.setAdUnitID(adsCode);
  try {
    await AdMobRewarded.requestAdAsync({ servePersonalizedAds: false });
    await AdMobRewarded.showAdAsync();
  } catch (e) {
    console.log(e);
  }
};

export { rewardInterstitial, interstitial, reward };
