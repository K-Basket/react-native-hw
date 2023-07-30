import 'react-native-gesture-handler'; // должен быть в самом верху
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { RegistrationScreen } from './Screens/auth/RegistrationScreen.js';
import { LoginScreen } from './Screens/auth/LoginScreen.js';
import { Navigation } from './components/Navigation.js';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-700': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-400': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-500': require('./assets/fonts/Roboto-Medium.ttf'),
  });

  if (!fontsLoaded) return null; // сначала загрузка шрифтов, потом все остальное

  return (
    <NavigationContainer style={styles.container}>
      <Navigation />
    </NavigationContainer>

    // <>
    //   <View style={styles.container}>
    //     <RegistrationScreen />
    //     {/* <LoginScreen /> */}

    //     <StatusBar style="auto" />
    //   </View>
    // </>
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
