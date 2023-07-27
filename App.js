import { StatusBar } from 'expo-status-bar';
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { RegistrationScreen } from './Screens/RegistrationScreen';
import { useFonts } from 'expo-font';
import { LoginScreen } from './Screens/LoginScreen';

import imageBG from './Screens/img/photo-bg.jpg';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-700': require('./Screens/fonts/Roboto-Bold.ttf'),
    'Roboto-400': require('./Screens/fonts/Roboto-Regular.ttf'),
    'Roboto-500': require('./Screens/fonts/Roboto-Medium.ttf'),
  });
  if (!fontsLoaded) return null; // сначала загрузка шрифтов, потом все остальное

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          console.log('Hi'), Keyboard.dismiss();
        }}
      >
        <ImageBackground style={styles.imageBg} source={imageBG}>
          <KeyboardAvoidingView
            style={styles.wrapperForm}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          >
            <RegistrationScreen />
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
      {/* <LoginScreen /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  imageBg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  wrapperForm: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
  },
});
