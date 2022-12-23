import React, { useContext } from "react";
import { Text, Vibration, ToastAndroid } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { Icon, Tooltip } from "react-native-elements";
import { useComponentDataReceive } from "../../common/lib/Redirector";
import { colorTheme, ThemeContext } from "../../common/context/ThemeContext";

export const editPostOptions = ({ route, navigation }) => ({
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
        Edit Post {route?.params?.props?.id}
      </Text>
    );
  },
  headerStyle: {
    backgroundColor: colorTheme[route?.params?.theme].primary,
  },
  headerRight: (props) => {
    const netInfo = useNetInfo();
    const { theme, setTheme } = useContext(ThemeContext);

    const tooltipRef = React.useRef(null);
    const { posts, setPosts } = useComponentDataReceive("posts") || {};
    const { editedPost, setEditedPost } =
      useComponentDataReceive("editedPost") || {};
    console.log("editedPost", editedPost);
    const handlePress = (editedPost) => {
      if (!netInfo.isConnected) {
        ToastAndroid.showWithGravityAndOffset(
          "Device is offline. Please connect to internet.",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
        return;
      }
      fetch(`https://jsonplaceholder.typicode.com/posts/${editedPost.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: editedPost.title,
          body: editedPost.body,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          ToastAndroid.showWithGravityAndOffset(
            JSON.stringify(json),
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
          navigation.navigate("Post", {
            props: { id: editedPost.id },
            theme,
          });
        });

      setPosts((p) => {
        const newP = [...p];
        const index = p.findIndex((i) => i.id === editedPost.id);
        newP[index] = editedPost;
        return newP;
      });
    };
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
            <Text style={{ color: colorTheme[theme].primary }}>Save Post</Text>
          }
        >
          <Icon
            size={34}
            style={{ alignContent: "center" }}
            name="checkmark-outline"
            type="ionicon"
            onPress={() => {
              handlePress(editedPost);
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
