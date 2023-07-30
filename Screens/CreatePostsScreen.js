import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

export function CreatePostsScreen() {
  console.log('Screen --> CreatePostsScreen');
  const Tabs = createBottomTabNavigator(); // нижняя навигация
  const navigation = useNavigation();

  const optionsCreatePosts = {
    title: 'Створити публікацію',
    tabBarIcon: ({ focused, size, color }) => (
      <TouchableOpacity
        style={{ ...styles.btn, width: focused ? 80 : 70 }}
        activeOpacity={0.8}
        onPress={() => console.log('tabBarIcon')}
      >
        <Feather name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    ),
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Page CreatePostsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: `#8a2be2`,
    fontFamily: 'Roboto-700',
    fontSize: 20,
    color: '#9370db',
  },
});
