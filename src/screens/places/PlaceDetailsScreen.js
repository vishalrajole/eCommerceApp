import React from "react";
import { useSelector } from "react-redux";

import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import MapPreview from "../../components/MapPreview";
import Colors from "../../styles/colors";

const PlaceDetailsScreen = (props) => {
  const { route } = props;
  const { id, title } = route.params;
  props.navigation.setOptions({ title: title });
  const selectedPlace = useSelector((state) =>
    state.place.places.find((place) => place.id === id)
  );
  console.log("selectedPlace: ", selectedPlace);
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image source={{ uri: selectedPlace.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <MapPreview
          style={styles.mapPreview}
          location={{ lat: selectedPlace.lat, long: selectedPlace.long }}
        ></MapPreview>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  address: {
    color: Colors.primary,
    textAlign: "center",
  },
  addressContainer: {
    padding: 20,
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
export default PlaceDetailsScreen;
