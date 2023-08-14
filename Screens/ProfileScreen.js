import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import {
  collectionIdSelector,
  emailSelector,
  nickNameSelector,
  userIdSelector,
} from '../redux/auth/selectors';
import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { FlatList } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import imageBG from '../assets/img/photo-bg.jpg';
import avatarSource from '../assets/img/avatar-1.jpg';
import avatar from '../assets/img/avatar-1.jpg';

export function ProfileScreen() {
  const [userPosts, setUserPosts] = useState(null);
  const userId = useSelector(userIdSelector);
  const nickName = useSelector(nickNameSelector);
  const email = useSelector(emailSelector);

  const navigation = useNavigation();

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    try {
      const q = query(
        collection(db, 'photoPosts'),
        where('userId', '==', userId)
      ); // выбирает данные только активного пользователя

      // const querySnapshot = await getDocs(q); // получает из DB данные

      onSnapshot(q, querySnapshot => {
        let data = [];

        querySnapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() });
        });

        setUserPosts(data);
      });
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <ImageBackground style={styles.imageBG} source={imageBG}>
      <View style={styles.container}>
        <View style={styles.wrapUser}>
          <View style={{ zIndex: 1 }}>
            <Image style={styles.imgAvatar} source={avatarSource} />
          </View>

          <View style={{ marginBottom: 33 }}>
            <Text style={styles.titleUser}>Natali Romanova</Text>
          </View>
        </View>

        <View style={styles.postsWrap}>
          <FlatList
            data={userPosts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View>
                <View style={styles.wrapImage}>
                  <Image style={styles.image} source={item.photo} />
                </View>

                <View style={styles.wrapTitleImage}>
                  <Text style={styles.titleImage}>{item.inputTitlePhoto}</Text>
                </View>

                <View style={styles.wrapDescript}>
                  <View style={styles.commentLike}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        navigation.navigate('Comments', {
                          postId: item.id,
                        }); // передает id поста в CommentScreen
                      }}
                    >
                      <Feather
                        name="message-circle"
                        size={24}
                        color="#FF6C00"
                      />
                    </TouchableOpacity>
                    <Text style={styles.titleCount}>
                      {item.countComment ? item.countComment : 0}
                    </Text>

                    <TouchableOpacity
                      style={{ marginLeft: 24 }}
                      activeOpacity={0.8}
                      onPress={() => console.log('add like')}
                    >
                      <Feather name="thumbs-up" size={24} color="#FF6C00" />
                    </TouchableOpacity>
                    <Text style={styles.titleCount}>0</Text>
                  </View>

                  <TouchableOpacity
                    // style={styles.btnCamera}
                    style={styles.wrapLocation}
                    activeOpacity={0.8}
                    onPress={() => {
                      navigation.navigate('Map', {
                        location: item.location,
                      });
                    }}
                  >
                    <View>
                      <Feather name="map-pin" size={24} color="#BDBDBD" />
                    </View>

                    <View style={styles.wrapTitleLocation}>
                      <Text style={styles.titleLocation}>
                        {`${item.address.country}`}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </ImageBackground>
  );

  // ===================================================

  // return (
  //   <View style={styles.container}>
  //     <View
  //       style={{
  //         flexDirection: 'row',
  //         alignItems: 'center',
  //         marginVertical: 32,
  //         paddingHorizontal: 16,
  //         width: '100%',
  //       }}
  //     >
  //       <Image
  //         style={{ width: 60, height: 60, borderRadius: 16 }}
  //         source={avatar}
  //       />
  //       <View style={{ marginLeft: 8 }}>
  //         <Text
  //           style={{ fontFamily: 'Roboto-700', fontSize: 13, color: '#212121' }}
  //         >
  //           {nickName}
  //         </Text>
  //         <Text
  //           style={{
  //             fontFamily: 'Roboto-400',
  //             fontSize: 11,
  //             color: 'rgba(33, 33, 33, 0.80)',
  //           }}
  //         >
  //           {email}
  //         </Text>
  //       </View>
  //     </View>

  // <FlatList
  //   data={userPosts}
  //   keyExtractor={item => item.id}
  //   renderItem={({ item }) => (
  //     <View>
  //       <View style={styles.wrapImage}>
  //         <Image
  //           source={item.photo}
  //           style={{
  //             marginTop: 10,
  //             width: 400,
  //             height: 240,
  //             borderColor: 'green',
  //             borderWidth: 1,
  //             borderRadius: 8,
  //           }}
  //         />
  //       </View>

  //       <Text
  //         style={{
  //           marginTop: 5,
  //           fontFamily: 'Roboto-500',
  //           fontSize: 16,
  //           color: '#212121',
  //         }}
  //       >
  //         {item.inputTitlePhoto}
  //       </Text>

  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           alignItems: 'center',
  //           justifyContent: 'space-between',
  //         }}
  //       >
  //         <View
  //           style={{
  //             flex: 1,
  //             flexDirection: 'row',
  //             justifyContent: 'space-between',
  //             marginTop: 8,
  //           }}
  //         >
  //           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  //             <TouchableOpacity
  //               style={styles.btnCamera}
  //               activeOpacity={0.8}
  //               onPress={() => {
  //                 navigation.navigate('Comments', { postId: item.id }); // передает id поста в CommentScreen
  //               }}
  //             >
  //               <Feather name="message-circle" size={24} color="#BDBDBD" />
  //             </TouchableOpacity>
  //             <Text
  //               style={{
  //                 marginLeft: 6,
  //                 color: '#BDBDBD',
  //                 fontFamily: 'Roboto-400',
  //                 fontSize: 16,
  //               }}
  //             >
  //               {item.countComment ? item.countComment : 0}
  //             </Text>
  //           </View>

  //           <View>
  //             <TouchableOpacity
  //               // style={styles.btnCamera}
  //               style={{
  //                 flexDirection: 'row',
  //                 alignItems: 'center',
  //                 // justifyContent: 'space-between',
  //               }}
  //               activeOpacity={0.8}
  //               onPress={() => {
  //                 navigation.navigate('Map', { location: item.location });
  //               }}
  //             >
  //               <View>
  //                 <Feather
  //                   // style={{ position: 'absolute', top: 0, left: -30 }}
  //                   name="map-pin"
  //                   size={24}
  //                   color="#BDBDBD"
  //                 />
  //               </View>

  //               <View style={{ marginLeft: 4 }}>
  //                 <Text
  //                   style={{
  //                     fontFamily: 'Roboto-400',
  //                     fontSize: 16,
  //                     color: '#212121',
  //                   }}
  //                 >
  //                   {item.inputLocation}
  //                 </Text>

  //                 <Text
  //                   style={{
  //                     fontFamily: 'Roboto-400',
  //                     fontSize: 10,
  //                     color: '#212121',
  //                   }}
  //                 >
  //                   {`${item.address.city}, ${item.address.country}`}
  //                 </Text>
  //               </View>
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //       </View>
  //     </View>
  //   )}
  // />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '85%',
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
  },

  imageBG: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  wrapUser: {
    marginTop: 32,
    // marginBottom: 10,
  },
  imgAvatar: {
    position: 'absolute',
    top: -60,
    left: '35%',
  },
  titleUser: {
    marginTop: 92,
    textAlign: 'center',
    fontFamily: 'Roboto-500',
    fontSize: 30,
    letterSpacing: 0.3,
    color: '#212121',
  },
  postsWrap: {
    flex: 2,
    backgroundColor: '#fff',
  },
  wrapImage: {
    // marginBottom: 8,
    // width: '100%',
  },
  image: {
    width: 396,
    height: 240,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  wrapTitleImage: {
    marginVertical: 8,
  },
  titleImage: {
    fontFamily: 'Roboto-500',
    fontSize: 16,
    color: '#212121',
  },
  wrapDescript: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 34,
  },
  commentLike: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleCount: {
    marginLeft: 6,
    color: '#BDBDBD',
    fontFamily: 'Roboto-400',
    fontSize: 16,
  },
  wrapLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapTitleLocation: {
    marginLeft: 4,
  },
  titleLocation: {
    fontFamily: 'Roboto-400',
    fontSize: 16,
    color: '#212121',
  },

  title: {
    color: '#212121',
    fontSize: 20,
  },
  wrapForm: {
    marginTop: 147,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 32,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  form: {
    marginHorizontal: 16,
    marginBottom: 78,
  },

  imgAdd: {
    position: 'absolute',
    top: 14,
    left: '62%',
  },

  input: {
    paddingLeft: 16,
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    fontFamily: 'Roboto-400',
    color: '#212121',
    borderColor: '#E8E8E8',
    backgroundColor: '#F6F6F6',
  },
  show: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  showTitle: {
    fontFamily: 'Roboto-400',
    fontSize: 16,
    color: '#1B4371',
  },
  btn: {
    marginTop: 43,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6C00',
    height: 50,
    borderRadius: 100,
  },
  btnTitle: {
    fontSize: 16,
    color: '#fff',
  },
  linkTitle: {
    paddingTop: 16,
    fontFamily: 'Roboto-400',
    fontSize: 16,
    textAlign: 'center',
    color: '#1B4371',
  },
});
