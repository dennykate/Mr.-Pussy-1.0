import { combineReducers } from "redux";
import {
  adsDataReducer,
  movieDataReducer,
  socialDataReducer,
  admobAdsReducer,
  DownloadFileInPercent,
  introNativeCode,
} from "./addData";

const reducer = combineReducers({
  data: movieDataReducer,
  socials: socialDataReducer,
  ads: adsDataReducer,
  admobAds: admobAdsReducer,
  donwloadPercent: DownloadFileInPercent,
  introNativeCode: introNativeCode,
});

export const rootReducer = (state, action) => {
  return reducer(state, action);
};
