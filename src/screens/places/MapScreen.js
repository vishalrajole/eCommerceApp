import React, { useCallback, useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import MapView, { Marker } from "react-native-maps";
import CustomHeaderButton from "../../components/HeaderButton";

const MapScreen = ({ route, navigation }) => {
  const initialLocation = route?.params?.initialLocation;
  const readOnly = route?.params?.readOnly;
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.long : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    if (readOnly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      long: event.nativeEvent.coordinate.longitude,
    });
  };

  let markers;
  if (selectedLocation) {
    markers = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.long,
    };
  }

  useEffect(() => {
    navigation.setParams({ saveLocation: saveLocationHandler });
  }, [saveLocationHandler]);

  const saveLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      return;
    }
    navigation.navigate("NewPlace", { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  if (!readOnly) {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={saveLocationHandler}
          />
        </HeaderButtons>
      ),
    });
  }

  return (
    <MapView region={region} style={styles.map} onPress={selectLocationHandler}>
      {markers && <Marker title="location" coordinate={markers}></Marker>}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapScreen;
