import { useRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export function MapScreen() {
  const { params } = useRoute(); // принимаем данные из postsScreen
  const { latitude, longitude } = params.location;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude: `${latitude}`, // широта
          longitude: `${longitude}`, // долгота
          latitudeDelta: 0.0922, // степень приближения места на карте
          longitudeDelta: 0.0421, // степень приближения места на карте
        }}
      >
        <Marker
          coordinate={{
            latitude: `${latitude}`,
            longitude: `${longitude}`,
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
