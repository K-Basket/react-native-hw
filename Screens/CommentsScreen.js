import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { nickNameSelector } from '../redux/auth/selectors';
import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { Feather } from '@expo/vector-icons';

export function CommentsScreen() {
  const [comment, setComment] = useState('');
  const [commentId, setCommentId] = useState('');
  const [allComments, setAllComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const nickName = useSelector(nickNameSelector);

  const { postId, photo } = useRoute().params; // принимаем данные из postsScreen для запииси в базу данных
  // console.log('postId :>> ', postId);
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', () => {
      setIsShowKeyboard(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setIsShowKeyboard(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    getAllCommentsFromServer();
  }, [commentId]);

  const createCommentsPost = async () => {
    try {
      const ref = doc(db, 'photoPosts', postId);
      // const ref = doc(db, nickName, postId);

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
      // получает количество коментариев
      const coll = collection(db, `photoPosts/${postId}/Comments`);
      const snapshot = await getCountFromServer(coll);
      const count = snapshot.data().count;

      // получает данные с сервера
      const ref = doc(db, 'photoPosts', postId);
      // const ref = doc(db, nickName, postId);
      const querySnapshot = await getDocs(collection(ref, 'Comments'));
      await updateDoc(ref, { countComment: count });

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

  function onShowKeyboard() {
    setIsShowKeyboard(true);
  }

  // console.log('allComments :>> ', allComments.length);

  return (
    <View style={styles.container}>
      <View style={styles.wrapImage}>
        <Image style={styles.image} source={photo} />
        <View>
          <FlatList
            data={allComments}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.nickName}>{item.nickName}</Text>
                <Text style={styles.comment}>{item.comment}</Text>
              </View>
            )}
          />
        </View>
      </View>

      <KeyboardAvoidingView
        style={{
          // justifyContent: 'flex-end',
          // alignSelf: 'flex-end',
          borderWidth: 1,
          borderColor: 'green',
        }}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
        {/* <View>
          <FlatList
            data={allComments}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.nickName}>{item.nickName}</Text>
                <Text style={styles.comment}>{item.comment}</Text>
              </View>
            )}
          />
        </View> */}

        <View
          style={{
            ...styles.wrapInput,
            marginBottom: isShowKeyboard ? 120 : 16,
          }}
        >
          <View>
            <TextInput
              style={styles.input}
              textAlign="left"
              placeholder="Коментувати..."
              // onFocus={() => true}
              // onFocus={onShowKeyboard}
              value={comment}
              onChangeText={setComment} // или то же самое запись ниже
              // onChangeText={value => setComment(value)}
            />
          </View>

          <View style={styles.wrapBtn}>
            <TouchableOpacity activeOpacity={0.8} onPress={createCommentsPost}>
              <View style={styles.btn}>
                <Feather
                  // style={{ position: 'absolute', top: 0, left: -30 }}
                  name="arrow-up"
                  size={24}
                  color="#fff"
                />
              </View>
              {/* <Text style={styles.text}>Отправить комментарий</Text> */}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginHorizontal: 16,
    justifyContent: 'space-between',
    // justifyContent: 'flex-end',
    // borderWidth: 1,
    // borderColor: 'gray',
  },

  wrapImage: {
    marginTop: 32,
    // width: '100%',
  },
  image: {
    width: 396,
    // width: 'inherit',
    height: 240,
    borderRadius: 8,
    backgroundColor: '#fff',
  },

  wrapInput: {
    // position: 'absolute',
    // bottom: 16,
    // backgroundColor: '#fff',
    // marginTop: 31,
    // marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    minWidth: '100%',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'gray',
    color: '#212121',
    fontFamily: 'Roboto-500',
    fontSize: 16,
  },

  wrapBtn: {
    position: 'absolute',
    right: 8,
  },
  btn: {
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: '#FF6C00',
    alignItems: 'center',
    justifyContent: 'center',
  },

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
