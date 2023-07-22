import { StatusBar } from "expo-status-bar";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { ImageBackground } from "react-native";

// export default function App() {
//   return (
//     <>
//       <RegistrationScreen />
//     </>
//     // <View style={styles.container}>
//     //   <RegistrationScreen />
//     //   <StatusBar style="auto" />
//     // </View>
//   );
// }

// ========================================================================
import imagebg from "./assets/img/photo-bg.jpg";

export default function App() {
  // const image = { uri: "https://legacy.reactjs.org/logo-og.png" };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("./assets/img/photo-bg.jpg")}
        // resizeMode="cover"
      ></ImageBackground>
      <Text>HiHiHiHiHi</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFE0",
    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    color: "#006400",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
