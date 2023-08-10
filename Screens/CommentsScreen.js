import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { nickNameSelector } from '../redux/auth/selectors';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/config';

export function CommentsScreen() {
  const [comment, setComment] = useState('');
  const [commentId, setCommentId] = useState('');
  const [allComments, setAllComments] = useState([]);
  const nickName = useSelector(nickNameSelector);

  const { postId } = useRoute().params; // принимаем данные из postsScreen для запииси в базу данных
  // console.log('postId :>> ', postId);

  useEffect(() => {
    getAllCommentsFromServer();
  }, [commentId]);

  const createCommentsPost = async () => {
    try {
      const ref = doc(db, nickName, postId);

      const docRef = await addDoc(collection(ref, 'Comments'), {
        nickName,
        comment,
      });

      setCommentId(docRef.id);
      // console.log('Comment ID: ', docRef.id); // id коментария
    } catch (error) {
      console.warn(error);
    }

    setComment('');
  };

  const getAllCommentsFromServer = async () => {
    try {
      // получает данные с сервера
      const ref = doc(db, nickName, postId);
      const querySnapshot = await getDocs(collection(ref, 'Comments'));

      return setAllComments(() => {
        let data = [];
        // записывает в переменную data данные с сервера
        querySnapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() });
        });
        return data;
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={allComments}
        // keyExtractor={(item, indx) => indx.toString()}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.nickName}>{item.nickName}</Text>
            <Text style={styles.comment}>{item.comment}</Text>
          </View>
        )}
      />
      <View>
        <TextInput
          style={{ ...styles.input }}
          textAlign="left"
          placeholder="add comments..."
          value={comment}
          onChangeText={setComment} // или то же самое запись ниже
          // onChangeText={value => setComment(value)}
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
    marginBottom: 100,
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
  nickName: {
    marginTop: 15,
    color: 'brown',
    fontFamily: 'Roboto-700',
  },
  comment: {
    marginTop: 5,
    paddingVertical: 7,
    paddingHorizontal: 10,
    width: 200,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
});
