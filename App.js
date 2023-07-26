import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { RegistrationScreen } from './Screens/RegistrationScreen';
import { useFonts } from 'expo-font';
import { LoginScreen } from './Screens/LoginScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-700': require('./Screens/fonts/Roboto-Bold.ttf'),
    'Roboto-400': require('./Screens/fonts/Roboto-Regular.ttf'),
    'Roboto-500': require('./Screens/fonts/Roboto-Medium.ttf'),
  });
  if (!fontsLoaded) return null; // сначала загрузка шрифтов, потом все остальное

  return (
    <View style={styles.container}>
      <RegistrationScreen />
      {/* <LoginScreen /> */}

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
