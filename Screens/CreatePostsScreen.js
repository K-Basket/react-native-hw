import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Camera } from 'expo-camera';
import { useState } from 'react';

export function CreatePostsScreen() {
  console.log('Screen --> CreatePostsScreen');
  const navigation = useNavigation();
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState('');

  async function takePhoto() {
    console.log('took a Photo');
    const photoCamera = await camera.takePictureAsync();
    setPhoto(photoCamera.uri); // сохраняем в state ссылку на сделанное фото камерой
    console.log('result :>> ', photo);
  }

  return (
    <>
      <View>
        <Camera style={styles.camera} ref={setCamera}>
          <TouchableOpacity
            style={styles.btnCamera}
            activeOpacity={0.8}
            onPress={takePhoto}
          >
            <Feather name="camera" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </Camera>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Page CreatePostsScreen</Text>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.8}
          onPress={() => {
            console.log('trash');
          }}
        >
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#fff',
  },
  camera: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  btnCamera: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.30)',
    borderRadius: 50,
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
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    marginBottom: 34,

    width: 70,
    height: 40,
    borderRadius: 100,
  },
});
