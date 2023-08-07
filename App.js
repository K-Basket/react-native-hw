import 'react-native-gesture-handler'; // должен быть в самом верху
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StyleSheet } from 'react-native';
import { Navigation } from './components/Navigation.js';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { xxx } from './test.js'; // !!!!!!!!!!!!!!!!!!!!!!!!!!! temp

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-700': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-400': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-500': require('./assets/fonts/Roboto-Medium.ttf'),
  });

  if (!fontsLoaded) return null; // сначала загрузка шрифтов, потом все остальное

  return (
    <Provider store={store}>
      <NavigationContainer style={styles.container}>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffeafeff',
  },
});
