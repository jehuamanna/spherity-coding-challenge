import * as React from "react";
import { useState } from "react";
import { Text, SafeAreaView, TextInput, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RadioGroup from "react-native-radio-buttons-group";
import { colorTheme, ThemeContext } from "../../common/context/ThemeContext";

export default function Filter({
  filterByUserId,
  setFilterByUserId,
  filterByTitle,
  setFilterByTitle,
  filterByBody,
  setFilterByBody,
  setParams,
}) {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const radioButtonsData = [
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: "Light",
      selected: theme === "light",
      value: "light",
    },
    {
      id: "2",
      label: "Dark",
      selected: theme === "dark",
      value: "dark",
    },
  ];
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  function onPressRadioButton(radioButtonsArray) {
    console.log(radioButtonsArray[0].selected);
    if (radioButtonsArray[0].selected) {
      setTheme("light");
      setParams({ theme: "light" });
    } else {
      setTheme("dark");
      setParams({ theme: "dark" });
    }
    setRadioButtons(radioButtonsArray);
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
          backgroundColor: colorTheme[theme].primary,
        }}
      >
        <Text
          style={{
            backgroundColor: colorTheme[theme].primary,
            fontWeight: "bold",
            fontSize: 18,
            color: colorTheme[theme].secondary,
            marginHorizontal: 10,
          }}
        >
          Filter By Fields:{" "}
        </Text>
        <BouncyCheckbox
          size={25}
          fillColor={
            theme !== "light"
              ? colorTheme[theme].primary
              : colorTheme[theme].secondary
          }
          unfillColor="#FFFFFF"
          text="User ID"
          isChecked={filterByUserId}
          iconStyle={{ borderColor: colorTheme[theme].secondary }}
          innerIconStyle={{ borderWidth: 2 }}
          onPress={(isChecked: boolean) => setFilterByUserId(isChecked)}
          textStyle={{
            textDecorationLine: "none",
          }}
          style={{ marginVertical: 10, marginHorizontal: 20 }}
        />
        <BouncyCheckbox
          size={25}
          fillColor={
            theme !== "light"
              ? colorTheme[theme].primary
              : colorTheme[theme].secondary
          }
          unfillColor="#FFFFFF"
          text="Title"
          isChecked={filterByTitle}
          iconStyle={{ borderColor: colorTheme[theme].secondary }}
          innerIconStyle={{ borderWidth: 2 }}
          onPress={(isChecked: boolean) => setFilterByTitle(isChecked)}
          textStyle={{
            textDecorationLine: "none",
          }}
          style={{ marginVertical: 10, marginHorizontal: 20 }}
        />
        <BouncyCheckbox
          size={25}
          fillColor={
            theme !== "light"
              ? colorTheme[theme].primary
              : colorTheme[theme].secondary
          }
          unfillColor="#FFFFFF"
          text="Body"
          isChecked={filterByBody}
          iconStyle={{ borderColor: colorTheme[theme].secondary }}
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
          backgroundColor: colorTheme[theme].primary,
        }}
      >
        <RadioGroup radioButtons={radioButtons} onPress={onPressRadioButton} />
      </View>
    </>
  );
}
