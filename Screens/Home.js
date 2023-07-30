import { Button, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { PostsScreen } from './PostsScreen';
import { CreatePostsScreen } from './CreatePostsScreen';
import { ProfileScreen } from './ProfileScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function Home() {
  const Tabs = createBottomTabNavigator(); // нижняя навигация
  const navigation = useNavigation();

  const optionPosts = {
    headerRight: () => {
      return (
        <Button
          onPress={() => {
            navigation.navigate('Login');
            console.log('here is log-out function');
          }}
          title="Log-out"
          color="black"
        />
      );
    },
    tabBarIcon: ({ focused, size, color }) => (
      <Feather
        style={{ alignSelf: 'flex-end', marginRight: 39 }}
        name="grid"
        size={24}
        color={focused ? '#212121' : color}
      />
    ),
  };

  const optionsCreatePosts = {
    tabBarIcon: ({ focused, size, color }) => (
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.8}
        onPress={() => console.log('tabBarIcon')}
      >
        <Feather name="plus" size={24} color={focused ? '#fff' : color} />
      </TouchableOpacity>
    ),
  };

  const optionsProfile = {
    tabBarIcon: ({ focused, size, color }) => (
      <Feather
        style={{ alignSelf: 'flex-start', marginLeft: 39 }}
        name="user"
        size={24}
        color={focused ? '#212121' : color}
      />
    ),
  };

  return (
    <Tabs.Navigator
      screenOptions={{ tabBarShowLabel: false }}
      initialRouteName="Posts"
    >
      <Tabs.Screen name="Posts" component={PostsScreen} options={optionPosts} />
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={optionsCreatePosts}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={optionsProfile}
      />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6C00',
    width: 70,
    height: 40,
    borderRadius: 100,
  },
});
