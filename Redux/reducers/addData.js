export const movieDataReducer = (state = "", action) => {
  switch (action.type) {
    case "Add Movie":
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export const socialDataReducer = (state = "", action) => {
  switch (action.type) {
    case "Add Socials":
      return action.payload;
    default:
      return state;
  }
};

export const sliderImageReducer = (state = "", action) => {
  switch (action.type) {
    case "Add Slider Image":
      return action.payload;
    default:
      return state;
  }
};

export const adsDataReducer = (state = "", action) => {
  switch (action.type) {
    case "Add Ads":
      return action.payload;
    default:
      return state;
  }
};

export const admobAdsReducer = (state = "", action) => {
  switch (action.type) {
    case "Add Admob Ads":
      return action.payload;
    default:
      return state;
  }
};
