import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapPreview from "./MapPreview";
import Colors from "../styles/colors";

const LocationPicker = () => {
  const [location, setLocation] = useState();
  const [isLoading, setIsLoading] = useState(false);
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
      setLocation(loc);
      setIsLoading(false);
      setLocation({ lat: loc.coords.latitude, long: loc.coords.longitude });
      console.log("loc", loc.coords.latitude, loc.coords.longitude);
    } catch (err) {
      Alert.alert("Location", "Please try again", [{ text: "Okay" }]);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview location={location} style={styles.mapPreview}>
        {isLoading ? (
          <ActivityIndicator size={"large"} color={Colors.primary} />
        ) : (
          <Text>No location selected</Text>
        )}
      </MapPreview>
      <Button
        color={Colors.primary}
        onPress={getLocationHandler}
        title="Get Location"
      />
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
});

export default LocationPicker;
