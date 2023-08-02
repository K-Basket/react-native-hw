import { useNavigation } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';

export function ProfileScreen() {
  console.log('Screen --> ProfileScreen');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Page ProfileScreen</Text>
      {/* <Button
        title="go to map"
        onPress={() => {
          navigation.navigate('Map');
        }}
      /> */}
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
