import React, { useContext } from "react";
import {
  Text,
  Platform,
  BackHandler,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";

import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { capitalize } from "../../common/utils/capitalize";
import Redirector, {
  useComponentDataReceive,
} from "../../common/lib/Redirector";
import { colorTheme, ThemeContext } from "../../common/context/ThemeContext";

const Editor = (props) => {
  const { route, navigation } = props;
  const richText = React.useRef();
  const { id, ...rest } = route?.params?.props;
  const { posts } = useComponentDataReceive("posts") || {};
  const item = posts?.find((post) => post.id === id);
  const { theme, setTheme } = useContext(ThemeContext);
  const { editedPost, setEditedPost } =
    useComponentDataReceive("editedPost") || {};

  React.useEffect(() => {
    navigation.setOptions({
      editedPost,
    });
  }, [navigation, editedPost]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Posts", { props: { item }, theme });
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );
  return (
    <Redirector>
      {editedPost && editedPost.body && (
        <SafeAreaView>
          <ScrollView>
            <Text style={styles(theme).description}> Edit Title:</Text>
            <RichEditor
              style={{
                height: 10,
              }}
              editorStyle={{
                color: colorTheme[theme].secondary,
                backgroundColor: colorTheme[theme].primary,
              }}
              initialHeight={100}
              ref={richText}
              initialContentHTML={capitalize(editedPost?.title)}
              onChange={(title) => {
                setEditedPost((post) => ({
                  ...post,
                  title,
                }));
                navigation.setOptions({ editedPost });
              }}
            />
            <Text style={styles(theme).description}> Edit Body:</Text>

            <RichEditor
              style={{
                height: 100,
              }}
              editorStyle={{
                color: colorTheme[theme].secondary,
                backgroundColor: colorTheme[theme].primary,
              }}
              initialHeight={500}
              ref={richText}
              initialContentHTML={capitalize(editedPost?.body)}
              onChange={(body) => {
                setEditedPost((post) => ({
                  ...post,
                  body,
                }));
                navigation.setOptions({ editedPost });
              }}
            />
          </ScrollView>
        </SafeAreaView>
      )}
    </Redirector>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    description: {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: 16,
      lineHeight: 19,
      color: colorTheme[theme].secondary,
      backgroundColor: colorTheme[theme].primary,
      paddingHorizontal: 10,
      paddingVertical: 10,
      textAlign: "left",
      flex: 1,
      flexWrap: "wrap",
    },
  });

export default Editor;
