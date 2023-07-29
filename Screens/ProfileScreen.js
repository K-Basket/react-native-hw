import { StyleSheet, Text, View } from 'react-native';

export function ProfileScreen() {
  console.log('Screen --> ProfileScreen');

  return (
    <View>
      <Text style={styles.test}>Page ProfileScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  test: {
    marginVertical: 20,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: `#8a2be2`,
    fontFamily: 'Roboto-700',
    fontSize: 20,
    color: '#9370db',
  },
});
