import React, { useState } from "react";
import { StyleSheet, View, Button, ScrollView, Text } from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../../styles/colors";
import { addPlace } from "../../store/actions/places";
import Input from "../../components/Input";

const NewPlaceScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const onTextChangeHandler = (inputType, value, isValid) => {
    setTitle(value);
  };

  const addPlaceHandler = () => {
    dispatch(addPlace(title));
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id="title"
          label="Title"
          required
          autoCapitalize="none"
          errorText="enter valid title"
          onInputChange={onTextChangeHandler}
          value={""}
        />
        <Button
          title="Save place"
          color={Colors.primary}
          onPress={addPlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    marginBottom: 15,
    fontSize: 16,
  },
});
export default NewPlaceScreen;
