import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import Colors from "../styles/colors";

const ImgPicker = () => {
  const [image, setImage] = useState(null);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );

    if (result.status !== "granted") {
      Alert.alert("Permissions", "Please grant camera permissions", [
        { text: "Okay" },
      ]);
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermissions = await verifyPermissions();

    if (!hasPermissions) {
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.preview}>
        {!image && <Text style={styles.noImage}>No Image selected</Text>}
        {image && <Image source={{ uri: image }} style={styles.image} />}

        <Button title={"Upload"} color={Colors.primary} onPress={pickImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
  },
  preview: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 50,
  },
  image: {
    width: "100%",
    height: "100%",
    marginBottom: 30,
  },
  noImage: {
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ImgPicker;
