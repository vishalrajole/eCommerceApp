import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { googleApiKey } from "../env";

const MapPreview = (props) => {
  console.log("MapPreviewLocation: ", props.location);
  const { location } = props;
  let imagePreviewUrl;

  if (location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.long}&zoom=13&size=600x300&maptype=roadmap
    &markers=color:blue%7Clabel:S%7C${location.lat},${location.long}&markers=color:green%7Clabel:G%7C${location.lat},${location.long}
    &markers=color:red%7Clabel:C%7C${location.lat},${location.long}
    &key=${googleApiKey}`;
  }

  return (
    <TouchableOpacity
      style={{ ...styles.mapPreview, ...props.style }}
      onPress={props.onMapPreview}
    >
      {imagePreviewUrl ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});
export default MapPreview;
