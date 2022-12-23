import React, { useContext } from "react";
import { Text, Vibration } from "react-native";
import { Icon, Tooltip } from "react-native-elements";
import { colorTheme, ThemeContext } from "../../common/context/ThemeContext";

export const postOptions = ({ navigation, route }) => ({
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
        Post {route?.params?.props?.id}
      </Text>
    );
  },
  headerStyle: {
    backgroundColor: colorTheme[route?.params?.theme].primary,
  },
  headerRight: () => {
    const tooltipRef = React.useRef(null);
    React.useEffect(() => {
      navigation.setOptions({ props: route?.params?.props });
    }, [route?.params?.props]);
    const { theme, setTheme } = useContext(ThemeContext);

    return (
      <>
        <Tooltip
          ref={tooltipRef}
          toggleAction="onLongPress"
          backgroundColor={colorTheme[theme].secondary}
          highlightColor={colorTheme[theme].primary}
          pointerColor={colorTheme[theme].primary}
          overlayColor="rgba(255, 255, 255, 0)"
          popover={
            <Text style={{ color: colorTheme[theme].primary }}>Edit Post</Text>
          }
        >
          <Icon
            size={34}
            style={{ alignContent: "center" }}
            name="create-outline"
            type="ionicon"
            onPress={() => {
              navigation.navigate("EditPost", {
                props: route?.params?.props,
                theme,
              });
            }}
            onLongPress={() => {
              tooltipRef.current?.toggleTooltip();
              Vibration.vibrate(20);
              setTimeout(() => {
                tooltipRef.current?.toggleTooltip();
              }, 2000);
            }}
          ></Icon>
        </Tooltip>
      </>
    );
  },
});
