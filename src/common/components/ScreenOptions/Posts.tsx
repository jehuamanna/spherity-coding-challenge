import React, { useContext, useRef, useState } from "react";
import { Text } from "react-native";
import { colorTheme, ThemeContext } from "../../common/context/ThemeContext";

export const postsOptions = ({ navigation, route }) => ({
  headerTitle: () => {
    const { theme, setTheme } = useContext(ThemeContext);
    return (
      <Text
        style={{
          backgroundColor: colorTheme[theme].primary,
          fontWeight: "bold",
          fontSize: 24,
          color: colorTheme[theme].secondary,
        }}
      >
        Posts
      </Text>
    );
  },
  headerStyle: {
    backgroundColor: colorTheme[route?.params?.theme]?.primary || "light",
  },
});
