import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import MapView, { getCamera } from 'react-native-maps';

export function CreatePostsScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null); // снимок c камеры
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [inputTitlePhoto, setInputTitlePhoto] = useState('');
  const [inputLocation, setInputLocation] = useState('');
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    // запрос на разрешение использовать камеру и сохранять в девайс фотки
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync(); // разрешение к камере
      await MediaLibrary.requestPermissionsAsync(); // разрешение сохранения в фото устройства

      setHasPermission(status === 'granted');
    })();

    // запрос на разрешение использовать геопозицию
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  async function takePhoto() {
    console.log('took a Photo');

    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync(); // uri - ссылка на снимок
      const photoLib = await MediaLibrary.createAssetAsync(uri); // сохранение снимка в библиотеку телефона
      setPhoto(photoLib);

      const location = await Location.getCurrentPositionAsync({}); // локация сделанной фотки
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);

      const address = await Location.reverseGeocodeAsync(coords);
      setAddress(address[0]);
    }
  }
  console.log('location :>> ', location);
  console.log('address :>> ', address);

  // console.log('photo :>> ', photo);

  function onPublish() {
    console.log('Publish', location);
    navigation.navigate('Posts', {
      location,
      photo,
      inputTitlePhoto,
      inputLocation,
    }); // передача данных на страцу Posts
    setInputTitlePhoto('');
    setInputLocation('');
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View>
          <View style={styles.wrapCamera}>
            <Camera style={styles.camera} type={type} ref={setCameraRef}>
              <TouchableOpacity
                style={styles.btnCamera}
                activeOpacity={0.8}
                onPress={takePhoto}
              >
                <Feather name="camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </Camera>

            <View style={styles.wrapBtnFlip}>
              <TouchableOpacity
                style={styles.btnFlip}
                activeOpacity={0.8}
                onPress={() => {
                  console.log('flip back/front camera');
                  setType(
                    type === CameraType.back
                      ? CameraType.front
                      : CameraType.back
                  );
                }}
              >
                <Ionicons
                  name="ios-camera-reverse-outline"
                  size={24}
                  color="#BDBDBD"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.wrapBtnDownloadPhoto}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  console.log('download Photo');
                }}
              >
                <Text style={styles.btnDownloadPhoto}>Завантажте фото</Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 32 }}>
              <TextInput
                style={styles.input}
                textAlign="left"
                placeholder="Назва..."
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                value={inputTitlePhoto}
                onChangeText={value => setInputTitlePhoto(value)}
              />
            </View>

            <View style={{ marginTop: 16 }}>
              <TextInput
                style={{ ...styles.input, paddingLeft: 28 }}
                textAlign="left"
                placeholder="Місцевість..."
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                value={inputLocation}
                onChangeText={value => setInputLocation(value)}
              />
              <Feather
                style={{ position: 'absolute', top: '25%', left: 2 }}
                name="map-pin"
                size={24}
                color="#BDBDBD"
              />
            </View>

            <View
              style={{
                flexDirection: 'column',
                alignContent: 'space-between',
              }}
            >
              <View>
                <TouchableOpacity
                  style={styles.btn}
                  activeOpacity={0.8}
                  onPress={onPublish}
                >
                  <Text style={styles.btnTitle}>Опубліковати</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.btnTrush}
            activeOpacity={0.8}
            onPress={() => {
              console.log('trash');
            }}
          >
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  wrapCamera: {
    marginHorizontal: 16,
    marginTop: 32,
  },
  camera: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 240,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
  },
  btnCamera: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.30)',
    borderRadius: 50,
  },
  wrapBtnFlip: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  btnFlip: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    borderRadius: 50,
  },
  wrapBtnDownloadPhoto: {
    marginTop: 8,
  },
  btnDownloadPhoto: {
    color: '#BDBDBD',
    fontFamily: 'Roboto-400',
    fontSize: 16,
  },
  input: {
    paddingLeft: 16,
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    fontFamily: 'Roboto-400',
    fontSize: 16,
    color: '#212121',
    borderColor: '#E8E8E8',
    backgroundColor: '#F6F6F6',
  },
  btn: {
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6C00',
    // height: 50,
    borderRadius: 100,
  },
  btnTitle: {
    paddingVertical: 16,
    fontSize: 16,
    color: '#fff',
  },
  btnTrush: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    marginBottom: 34,
    width: 70,
    height: 40,
    borderRadius: 100,
  },
});
