import * as React from "react";
import { useState } from "react";
import { Text, SafeAreaView, TextInput, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RadioGroup from "react-native-radio-buttons-group";

export default function Filter({
  filterByUserId,
  setFilterByUserId,
  filterByTitle,
  setFilterByTitle,
  filterByBody,
  setFilterByBody,
  setSearchOptions,
}) {
  const [radioButtons, setRadioButtons] = useState([
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: "Exact",
      value: "weights",
      selected: true,
      searchValue: 1,
    },
    {
      id: "2",
      label: "Fuzzy",
      value: "fuzzy",
      searchValue: false,
    },
  ]);

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    const searchOptions =
      radioButtonsArray.find((i) => i.selected === true).value === "fuzzy"
        ? { fuzzy: 1, prefix: true }
        : {};
    console.log(searchOptions);
    setSearchOptions(searchOptions);
  }
  return (
    <>
      <View
        style={{
          paddingVertical: 10,
          justifyContent: "flex-start",
          alignContent: "flex-start",
          flex: 1,
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Text
          style={{
            backgroundColor: "#fff",
            fontWeight: "bold",
            fontSize: 18,
            color: "#000101",
            marginHorizontal: 10,
          }}
        >
          Filter By Fields:{" "}
        </Text>
        <BouncyCheckbox
          size={25}
          fillColor="#000101"
          unfillColor="#FFFFFF"
          text="User ID"
          isChecked={filterByUserId}
          iconStyle={{ borderColor: "#000101" }}
          innerIconStyle={{ borderWidth: 2 }}
          onPress={(isChecked: boolean) => setFilterByUserId(isChecked)}
          textStyle={{
            textDecorationLine: "none",
          }}
          style={{ marginVertical: 10, marginHorizontal: 20 }}
        />
        <BouncyCheckbox
          size={25}
          fillColor="#000101"
          unfillColor="#FFFFFF"
          text="Title"
          isChecked={filterByTitle}
          iconStyle={{ borderColor: "#000101" }}
          innerIconStyle={{ borderWidth: 2 }}
          onPress={(isChecked: boolean) => setFilterByTitle(isChecked)}
          textStyle={{
            textDecorationLine: "none",
          }}
          style={{ marginVertical: 10, marginHorizontal: 20 }}
        />
        <BouncyCheckbox
          size={25}
          fillColor="#000101"
          unfillColor="#FFFFFF"
          text="Body"
          isChecked={filterByBody}
          iconStyle={{ borderColor: "#000101" }}
          innerIconStyle={{ borderWidth: 2 }}
          onPress={(isChecked: boolean) => setFilterByBody(isChecked)}
          textStyle={{
            textDecorationLine: "none",
          }}
          style={{ marginVertical: 10, marginHorizontal: 20 }}
        />
      </View>
      <View
        style={{
          paddingVertical: 10,
          justifyContent: "flex-start",
          alignContent: "flex-start",
          flex: 1,
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Text
          style={{
            backgroundColor: "#fff",
            fontWeight: "bold",
            fontSize: 18,
            color: "#000101",
            marginHorizontal: 10,
          }}
        >
          Search Options:
        </Text>
        <RadioGroup
          layout="row"
          radioButtons={radioButtons}
          onPress={onPressRadioButton}
        />
      </View>
    </>
  );
}
