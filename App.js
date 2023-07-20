import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native - Homework 1!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFE0",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#006400",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
});
