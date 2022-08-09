import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Linking,
} from "react-native";

export const Facebook = ({ data }) => {
  return (
    <TouchableOpacity
      style={styles.socialCardContainer}
      activeOpacity={0.5}
      onPress={async () => {
        try {
          await Linking.openURL(data);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <Image
        source={require("../assets/photos/facebook-logo.png")}
        style={styles.logo}
      />
      <Text style={styles.socialName}>Facebook Page </Text>
    </TouchableOpacity>
  );
};

export const Telegram = ({ data }) => {
  return (
    <TouchableOpacity
      style={styles.socialCardContainer}
      activeOpacity={0.5}
      onPress={async () => {
        try {
          await Linking.openURL(data);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <Image
        source={require("../assets/photos/telegram-logo.png")}
        style={styles.logo}
      />
      <Text style={styles.socialName}>Telegram Channel</Text>
    </TouchableOpacity>
  );
};

export const Messenger = ({ data }) => {
  return (
    <TouchableOpacity
      style={styles.socialCardContainer}
      activeOpacity={0.5}
      onPress={async () => {
        try {
          await Linking.openURL(data);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <Image
        source={require("../assets/photos/messenger-logo.png")}
        style={styles.logo}
      />
      <Text style={styles.socialName}>
        Messenger <Text style={styles.mmText}>မှတိုက်ရိုက်‌ပြောဆိုရန်</Text>
      </Text>
    </TouchableOpacity>
  );
};

export const Youtube = ({ data }) => {
  return (
    <TouchableOpacity
      style={styles.socialCardContainer}
      activeOpacity={0.5}
      onPress={async () => {
        try {
          await Linking.openURL(data);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <Image
        source={require("../assets/photos/youtube-logo.png")}
        style={styles.ytLogo}
      />
      <Text style={styles.socialName}>Youtube Channel</Text>
    </TouchableOpacity>
  );
};

export const Suggestion = ({ data }) => {
  return (
    <TouchableOpacity
      style={styles.socialCardContainer}
      activeOpacity={0.5}
      onPress={async () => {
        try {
          await Linking.openURL(data);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <Image
        source={require("../assets/photos/suggestion-logo.png")}
        style={styles.logo}
      />
      <Text style={styles.socialName}>
        <Text style={styles.mmText}>အကြံပြုချက် များပေးပို့ရန်</Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  socialCardContainer: {
    width: "100%",
    height: 67.5,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    paddingLeft: 45,
    flexDirection: "row",
    alignItems: "center",
  },
  socialName: {
    color: "white",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
  },
  mmText: {
    fontFamily: "NotoSansMyanmar-SemiBold",
    fontSize: 12,
    letterSpacing: 0.5,
  },
  logo: {
    width: 35,
    height: 35,
    marginRight: 15,
  },
  ytLogo: {
    width: 40,
    height: 30,
    marginRight: 10,
    transform: [{ translateX: 0 }],
    borderRadius: 5,
  },
});
