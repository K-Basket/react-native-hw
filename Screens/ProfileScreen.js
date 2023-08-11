import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import {
  collectionIdSelector,
  emailSelector,
  nickNameSelector,
  userIdSelector,
} from '../redux/auth/selectors';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FlatList } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import avatar from '../assets/img/avatar-1.jpg';

export function ProfileScreen() {
  const [userPosts, setUserPosts] = useState(null);
  const userId = useSelector(userIdSelector);
  const nickName = useSelector(nickNameSelector);
  const email = useSelector(emailSelector);
  const collectionId = useSelector(collectionIdSelector);

  const navigation = useNavigation();

  const getUserPosts = async () => {
    try {
      const q = query(
        collection(db, 'photoPosts'),
        where('userId', '==', userId)
      ); // выбирает данные только активного пользователя

      const querySnapshot = await getDocs(q); // получает из DB данные

      return setUserPosts(() => {
        let data = [];

        querySnapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() });
        });
        return data;
      }); // записывает в State полученные данные
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, [collectionId]);

  // console.log('ProfileScreen/userPosts :>> ', userPosts);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 32,
          paddingHorizontal: 16,
          width: '100%',
        }}
      >
        <Image
          style={{ width: 60, height: 60, borderRadius: 16 }}
          source={avatar}
        />
        <View style={{ marginLeft: 8 }}>
          <Text
            style={{ fontFamily: 'Roboto-700', fontSize: 13, color: '#212121' }}
          >
            {nickName}
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto-400',
              fontSize: 11,
              color: 'rgba(33, 33, 33, 0.80)',
            }}
          >
            {email}
          </Text>
        </View>
      </View>

      <FlatList
        data={userPosts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <View style={styles.wrapImage}>
              <Image
                source={item.photo}
                style={{
                  marginTop: 10,
                  width: 400,
                  height: 240,
                  borderColor: 'green',
                  borderWidth: 1,
                  borderRadius: 8,
                }}
              />
            </View>

            <Text
              style={{
                marginTop: 5,
                fontFamily: 'Roboto-500',
                fontSize: 16,
                color: '#212121',
              }}
            >
              {item.inputTitlePhoto}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 8,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity
                    style={styles.btnCamera}
                    activeOpacity={0.8}
                    onPress={() => {
                      navigation.navigate('Comments', { postId: item.id }); // передает id поста в CommentScreen
                    }}
                  >
                    <Feather name="message-circle" size={24} color="#BDBDBD" />
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginLeft: 6,
                      color: '#BDBDBD',
                      fontFamily: 'Roboto-400',
                      fontSize: 16,
                    }}
                  >
                    0
                  </Text>
                </View>

                <View>
                  <TouchableOpacity
                    // style={styles.btnCamera}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      // justifyContent: 'space-between',
                    }}
                    activeOpacity={0.8}
                    onPress={() => {
                      navigation.navigate('Map', { location: item.location });
                    }}
                  >
                    <View>
                      <Feather
                        // style={{ position: 'absolute', top: 0, left: -30 }}
                        name="map-pin"
                        size={24}
                        color="#BDBDBD"
                      />
                    </View>

                    <View style={{ marginLeft: 4 }}>
                      <Text
                        style={{
                          fontFamily: 'Roboto-400',
                          fontSize: 16,
                          color: '#212121',
                        }}
                      >
                        {item.inputLocation}
                      </Text>

                      <Text
                        style={{
                          fontFamily: 'Roboto-400',
                          fontSize: 10,
                          color: '#212121',
                        }}
                      >
                        {`${item.address.city}, ${item.address.country}`}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  wrapImage: {},
});

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Page ProfileScreen</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderWidth: 1,
//     borderRadius: 10,
//     borderColor: `#8a2be2`,
//     fontFamily: 'Roboto-700',
//     fontSize: 20,
//     color: '#9370db',
//   },
// });
