import { StyleSheet } from 'react-native';
import { PostsScreen } from './PostsScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { CreatePostsScreen } from './CreatePostsScreen';
import { ProfileScreen } from './ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export function Home() {
  const HomeStack = createStackNavigator();
  const Tab = createBottomTabNavigator; // нижняя навигация

  return (
    <HomeStack.Navigator initialRouteName="Posts">
      <HomeStack.Screen name="Posts" component={PostsScreen} />
      <HomeStack.Screen name="CreatePosts" component={CreatePostsScreen} />
      <HomeStack.Screen name="Profile" component={ProfileScreen} />
    </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({});
