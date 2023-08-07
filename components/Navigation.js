import { createStackNavigator } from '@react-navigation/stack';
import { RegistrationScreen } from '../Screens/auth/RegistrationScreen';
import { LoginScreen } from '../Screens/auth/LoginScreen';
import { CommentsScreen } from '../Screens/CommentsScreen';
import { MapScreen } from '../Screens/MapScreen';
import { Home } from './Home';
import { Button } from 'react-native';
import { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function Navigation() {
  const [user, setUser] = useState(); // вывести в Redux состояние

  const MainStack = createStackNavigator(); // переходы мажду экранами
  const auth = getAuth();

  onAuthStateChanged(auth, user => {
    if (user) {
      const uid = user.uid;
      // console.log('uid :>> ', uid);
      console.log('useroOnAuthStateChanged :>> ', user);
      // ...
    } else {
      // User is signed out
      // ...
    }
  }); // проверка аутентификации пользователя

  const optionsHome = {
    headerShown: false,
    title: 'Home page',
    headerStyle: { backgroundColor: `#f5f5dc` },
    headerTintColor: 'green',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
      color: '#ff8c00',
    },
    headerRight: () => {
      return (
        <Button
          onPress={() => console.log('click Button')}
          title="Press me"
          color="black"
        />
      );
    },
  };

  return (
    <>
      <MainStack.Navigator initialRouteName="LoginScreen">
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }} // скрывает header
        />

        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <MainStack.Screen name="Home" component={Home} options={optionsHome} />

        <MainStack.Screen
          name="Comments"
          component={CommentsScreen}
          options={{ headerShown: true }}
        />
        <MainStack.Screen
          name="Map"
          component={MapScreen}
          options={{ headerShown: true }}
        />
      </MainStack.Navigator>
    </>
  );
}
