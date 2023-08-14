import { createStackNavigator } from '@react-navigation/stack';
import { RegistrationScreen } from '../Screens/auth/RegistrationScreen';
import { LoginScreen } from '../Screens/auth/LoginScreen';
import { CommentsScreen } from '../Screens/CommentsScreen';
import { MapScreen } from '../Screens/MapScreen';
import { Home } from './Home';
import { Button } from 'react-native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authStateChangeUser } from '../redux/auth/operations';
import { isLoggetInSelector } from '../redux/auth/selectors';

export function Navigation() {
  const MainStack = createStackNavigator(); // переходы мажду экранами
  const dispatch = useDispatch();
  const isLoggetIn = useSelector(isLoggetInSelector);

  // при входе в приложение запускает проверку логиинизации Usera
  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

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
      <MainStack.Navigator initialRouteName="Login">
        {!isLoggetIn && (
          <>
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
          </>
        )}

        {isLoggetIn && (
          <MainStack.Screen
            name="Home"
            component={Home}
            options={optionsHome}
          />
        )}

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
