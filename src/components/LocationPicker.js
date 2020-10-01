import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapPreview from "./MapPreview";
import Colors from "../styles/colors";

const LocationPicker = ({ onLocationPicked }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const pickedLocation = route?.params?.pickedLocation;

  const [location, setLocation] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (pickedLocation) {
      setLocation(pickedLocation);
      onLocationPicked(pickedLocation);
    }
  }, [pickedLocation, onLocationPicked]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);

    if (result.status !== "granted") {
      Alert.alert("Permissions", "Please grant location permissions", [
        { text: "Okay" },
      ]);
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermissions = await verifyPermissions();

    if (!hasPermissions) {
      return;
    }
    try {
      setIsLoading(true);
      const loc = await Location.getCurrentPositionAsync({ timeout: 5000 });
      setIsLoading(false);
      setLocation({ lat: loc.coords.latitude, long: loc.coords.longitude });
      onLocationPicked({
        lat: loc.coords.latitude,
        long: loc.coords.longitude,
      });
    } catch (err) {
      Alert.alert("Location", "Please try again", [{ text: "Okay" }]);
      setIsLoading(false);
    }
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        location={location}
        style={styles.mapPreview}
        onPress={pickOnMapHandler}
      >
        {isLoading ? (
          <ActivityIndicator size={"large"} color={Colors.primary} />
        ) : (
          <Text>No location selected</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          onPress={getLocationHandler}
          title="Get Location"
        />
        <Button
          color={Colors.primary}
          onPress={pickOnMapHandler}
          title="Pick on Map"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default LocationPicker;
