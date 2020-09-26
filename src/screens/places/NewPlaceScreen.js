import React, { useState } from "react";
import { StyleSheet, View, Button, ScrollView, Text } from "react-native";
import Colors from "../../styles/colors";
import Input from "../../components/Input";

const NewPlaceScreen = () => {
  const [title, setTitle] = useState("");

  const onTextChangeHandler = (inputType, value, isValid) => {
    setTitle(value);
  };

  const savePlace = () => {};

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
          onPress={() => {
            savePlace;
          }}
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
