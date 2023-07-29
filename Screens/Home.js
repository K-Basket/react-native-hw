import { StyleSheet, Text, View } from 'react-native';

export function Home() {
  console.log('Screen --> Home');

  return (
    <View>
      <Text style={styles.test}>Page Home</Text>
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
