import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export function CommentsScreen() {
  const [comment, setComment] = useState('');
  const { postId } = useRoute().params; // принимаем данные из postsScreen
  // const { postId } = params;

  const createCommentsPost = async () => {
    // берем данные из базы данных
    console.log('Отправил комментарий');
    console.log('postId :>> ', postId);
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={{ ...styles.input }}
          textAlign="left"
          placeholder="add comments..."
          value={comment}
          onChangeText={value => setComment(value)}
        />
      </View>

      <View>
        <TouchableOpacity
          style={{
            ...styles.btn,
          }}
          activeOpacity={0.8}
          onPress={createCommentsPost}
        >
          <Text style={styles.text}>Отправить комментарий</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 400,
  },
  btn: {},
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
  input: {
    paddingHorizontal: 16,
    marginBottom: 15,
    height: 50,
    width: 350,
    fontFamily: 'Roboto-400',
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 6,
    color: '#212121',
    borderColor: 'gray',
  },
});
