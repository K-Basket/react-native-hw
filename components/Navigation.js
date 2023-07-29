import { createStackNavigator } from '@react-navigation/stack';
import { RegistrationScreen } from '../Screens/auth/RegistrationScreen';
import { LoginScreen } from '../Screens/auth/LoginScreen';
import { PostsScreen } from '../Screens/PostsScreen';
import { CreatePostsScreen } from '../Screens/CreatePostsScreen';
import { CommentsScreen } from '../Screens/CommentsScreen';
import { ProfileScreen } from '../Screens/ProfileScreen';
import { MapScreen } from '../Screens/MapScreen';
import { Home } from '../Screens/Home';
import { Button, Text } from 'react-native';
import { useState } from 'react';

export function Navigation() {
  const MainStack = createStackNavigator(); // переходы мажду экранами
  const [isAuth, setIsAuth] = useState(false);

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
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            title: 'Start Home',
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
          }}
        />

        {/* <MainStack.Screen
          name="Posts"
          component={PostsScreen}
          options={{ headerShown: true }}
        /> */}
        {/* <MainStack.Screen
          name="CreatePosts"
          component={CreatePostsScreen}
          options={{ headerShown: true }}
        /> */}
        {/* <MainStack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: true }}
        /> */}
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
