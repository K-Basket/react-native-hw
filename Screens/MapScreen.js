import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export function MapScreen() {
  console.log('Screen --> MapScreen');
  const [locationPost, setLocationPost] = useState([]);
  const { params } = useRoute(); // принимаем данные из др Screens

  useEffect(() => {
    if (params) {
      setLocationPost(params.location);
    }
  }, [params]);

  console.log('locationPost :>> ', locationPost);

  return (
    <View style={styles.container}>
      {locationPost.length !== 0 && (
        <MapView
          style={styles.mapView}
          initialRegion={{
            latitude: `${locationPost.latitude}`, // широта
            longitude: `${locationPost.longitude}`, // долгота
            latitudeDelta: 0.0922, // степень приближения места на карте
            longitudeDelta: 0.0421, // степень приближения места на карте
          }}
        >
          <Marker
            coordinate={{
              latitude: `${locationPost.latitude}`,
              longitude: `${locationPost.longitude}`,
            }}
            title="PhotoTitle"
          />
        </MapView>
      )}
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
