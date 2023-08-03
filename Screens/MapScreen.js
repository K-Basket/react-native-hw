import { useRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, addressForCoordinate } from 'react-native-maps';

export function MapScreen() {
  console.log('Screen --> MapScreen');
  const { params } = useRoute(); // принимаем данные из др Screens

  console.log('::::::>>>>>> ', params.location);

  // (async () => {
  //   const address = await getCamera();
  //   return address;
  // })();

  // addressForCoordinate(params.location);
  // const test = addressForCoordinate(params.location);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude: `${params.location.latitude}`, // широта
          longitude: `${params.location.longitude}`, // долгота
          latitudeDelta: 0.0922, // степень приближения места на карте
          longitudeDelta: 0.0421, // степень приближения места на карте
        }}
      >
        <Marker
          coordinate={{
            latitude: `${params.location.latitude}`,
            longitude: `${params.location.longitude}`,
          }}
          title="PhotoTitle"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    flex: 1,
  },
});
