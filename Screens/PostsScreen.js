import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

export function PostsScreen() {
  const [posts, setPosts] = useState([]);

  console.log('Screen --> PostsScreen');
  const navigation = useNavigation();
  const { params } = useRoute(); // принимаем данные из др Screens

  useEffect(() => {
    if (params) {
      setPosts(prev => [...prev, params]);
      console.log('params :>>:>>:>>:>> ', params);
    }
  }, [params]);

  // console.log('location :>> ', params.location);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={{ marginTop: 34 }}>
            <View style={styles.wrapImage}>
              <Image
                source={item.photo}
                style={{
                  marginTop: 10,
                  width: 350,
                  height: 200,
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
                    // style={styles.btnCamera}
                    activeOpacity={0.8}
                    onPress={() => {
                      navigation.navigate('Comments');
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
                      navigation.navigate('Map', { location: params.location });
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
    // justifyContent: 'center',
    backgroundColor: '#fff',
  },
  wrapImage: {},
});
