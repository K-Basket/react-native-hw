import 'react-native-gesture-handler'; // должен быть в самом верху
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
import { useFonts } from 'expo-font';
import { LoginScreen } from './Screens/auth/LoginScreen.js';

import imageBG from './assets/img/photo-bg.jpg';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator(); // для групировки экранов и рендера отдельных экранов

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-700': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-400': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-500': require('./assets/fonts/Roboto-Medium.ttf'),
  });

  if (!fontsLoaded) return null; // сначала загрузка шрифтов, потом все остальное

  return (
    <NavigationContainer style={styles.container}>
      <AuthStack.Navigator initialRouteName="LoginScreen">
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }} // скрывает header
        />
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
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
