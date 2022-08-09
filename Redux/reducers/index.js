import { combineReducers } from "redux";
import {
  adsDataReducer,
  movieDataReducer,
  socialDataReducer,
  admobAdsReducer,
} from "./addData";

const reducer = combineReducers({
  data: movieDataReducer,
  socials: socialDataReducer,
  ads: adsDataReducer,
  admobAds: admobAdsReducer,
});

export const rootReducer = (state, action) => {
  return reducer(state, action);
};
