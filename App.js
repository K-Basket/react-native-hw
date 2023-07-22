import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { RegistrationScreen } from './Screens/RegistrationScreen';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoBold: require('./assets/fonts/Roboto-Bold-700.ttf'),
    RobotoRegular: require('./assets/fonts/Roboto-Regular-400.ttf'),
    RobotoMedium: require('./assets/fonts/Roboto-Medium-500.ttf'),
  });

  if (!fontsLoaded) null; // сначала загрузка шрифтов, потом все остальное

  return (
    <View style={styles.container}>
      <RegistrationScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffeafeff',
    // alignItems: "center",
    // justifyContent: "center",
  },
});
