import { Alert, BackHandler, ToastAndroid } from "react-native";

import HomeNavigation from "./Navigation/MainNavigation";

// import redux
import { configureStore } from "./Redux/Store/store";
import { Provider } from "react-redux";

// import helper
import { backAction } from "./Helper/SystemFunction";

const App = () => {
  BackHandler.addEventListener("hardwareBackPress", backAction); // Exit App

  const store = configureStore();

  return (
    <Provider store={store}>
      <HomeNavigation />
    </Provider>
  );
};

export default App;
