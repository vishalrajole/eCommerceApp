import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaces } from "../../store/actions/places";
import PlaceItem from "../../components/PlaceItem";
import Colors from "../../styles/colors";

const PlacesListScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const places = useSelector((state) => state.place.places);
  const dispatch = useDispatch();

  const getPlaces = async () => {
    setIsLoading(true);
    setError(false);
    try {
      await dispatch(fetchPlaces());
    } catch (err) {
      setError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPlaces();
  }, [dispatch, setIsLoading, setError]);

  if (isLoading) {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  if (!isLoading && places.length === 0) {
    return (
      <View style={styles.loadingWrapper}>
        <Text>No Places found</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.loadingWrapper}>
        <Text>Something went wrong while fetching places</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          onSelect={() => {
            navigation.navigate("PlaceDetails", {
              title: itemData.item.title,
              id: itemData.item.id,
            });
          }}
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={null}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  loadingWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default PlacesListScreen;
