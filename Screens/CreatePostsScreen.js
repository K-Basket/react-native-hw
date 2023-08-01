import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';

export function CreatePostsScreen() {
  // console.log('Screen --> CreatePostsScreen');
  // console.log('type-->', Camera.Constants.Type.back);
  // console.log('type2-->', CameraType.back);
  // console.log('type2-->', CameraType.front);

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  // const [camera, setCamera] = useState(null);
  // const [photo, setPhoto] = useState('');

  useEffect(() => {
    // запрос на разрешение использовать камеру и сохранять в девайс фотки
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync(); // разрешение к камере
      await MediaLibrary.requestPermissionsAsync(); // разрешение сохранения в фото устройства

      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function takePhoto() {
    console.log('took a Photo');

    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync(); // запись в state снимка
      await MediaLibrary.createAssetAsync(uri); // сохранение снимка в библиотеку телефона
    }
  }

  return (
    <>
      <View>
        <Camera style={styles.camera} type={type} ref={setCameraRef}>
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
// export function CreatePostsScreen() {
//   console.log('Screen --> CreatePostsScreen');
//   const [camera, setCamera] = useState(null);
//   const [photo, setPhoto] = useState('');

//   async function takePhoto() {
//     console.log('took a Photo');
//     const photoCamera = await camera.takePictureAsync();
//     setPhoto(photoCamera.uri); // сохраняем в state ссылку на сделанное фото камерой
//     console.log('result :>> ', photo);
//   }

//   return (
//     <>
//       <View>
//         <Camera style={styles.camera} ref={setCamera}>
//           <TouchableOpacity
//             style={styles.btnCamera}
//             activeOpacity={0.8}
//             onPress={takePhoto}
//           >
//             <Feather name="camera" size={24} color="#BDBDBD" />
//           </TouchableOpacity>
//         </Camera>
//       </View>
//       <View style={styles.container}>
//         <Text style={styles.text}>Page CreatePostsScreen</Text>
//         <TouchableOpacity
//           style={styles.btn}
//           activeOpacity={0.8}
//           onPress={() => {
//             console.log('trash');
//           }}
//         >
//           <Feather name="trash-2" size={24} color="#BDBDBD" />
//         </TouchableOpacity>
//       </View>
//     </>
//   );
// }

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
