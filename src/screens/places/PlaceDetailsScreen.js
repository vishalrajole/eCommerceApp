import React from "react";
import { StyleSheet, View, Text } from "react-native";

const PlaceDetailsScreen = (props) => {
  const { route } = props;
  const { id, title } = route.params;
  props.navigation.setOptions({ title: title });

  return (
    <View>
      <Text>PlaceDetails</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
export default PlaceDetailsScreen;
