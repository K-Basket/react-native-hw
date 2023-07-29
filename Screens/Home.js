import { StyleSheet } from 'react-native';
import { PostsScreen } from './PostsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { CreatePostsScreen } from './CreatePostsScreen';
import { ProfileScreen } from './ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { RegistrationScreen } from './auth/RegistrationScreen';
import { LoginScreen } from './auth/LoginScreen';

export function Home() {
  const [isAuth, setIsAuth] = useState(true);
  const HomeStack = createStackNavigator();
  const Tabs = createBottomTabNavigator(); // нижняя навигация

  return (
    <>
      {isAuth && (
        <Tabs.Navigator initialRouteName="Posts">
          <Tabs.Screen name="Posts" component={PostsScreen} />
          <Tabs.Screen name="CreatePosts" component={CreatePostsScreen} />
          <Tabs.Screen name="Profile" component={ProfileScreen} />
        </Tabs.Navigator>
      )}
      {!isAuth && (
        <HomeStack.Navigator initialRouteName="LoginScreen">
          <HomeStack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ headerShown: false }} // скрывает header
          />
          <HomeStack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </HomeStack.Navigator>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
