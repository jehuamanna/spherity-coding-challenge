import React, { useContext } from "react";
import { StyleSheet, Text, View, BackHandler } from "react-native";
import { colorTheme, ThemeContext } from "../../common/context/ThemeContext";
import Redirector, {
  useComponentDataReceive,
} from "../../common/lib/Redirector";

import { capitalize } from "../../common/utils/capitalize";
import { useReadingTime } from "../../common/utils/reading-time-estimator/useReadingTime";

export default function ContentModal(props) {
  const { route, navigation } = props;
  const { id, ...rest } = route?.params?.props;
  const { posts } = useComponentDataReceive("posts") || {};
  const item = posts?.find((post) => post.id === id);
  console.log("item", item);
  const { text, words } = useReadingTime(item?.body || "");
  const { editedPost, setEditedPost } =
    useComponentDataReceive("editedPost") || {};
  React.useEffect(() => {
    setEditedPost && setEditedPost(item);
  }, [item, setEditedPost]);
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <Redirector>
      {item && (
        <View
          style={{
            padding: 20,
            backgroundColor: colorTheme[theme].primary,
            height: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 5,
              marginBottom: 20,
            }}
          >
            <View
              style={[
                styles(theme).circlePost,
                {
                  backgroundColor: "#2b2c36",
                },
              ]}
            >
              <Text style={{ color: "#b2b7e0" }}> {item?.id}</Text>
            </View>
            <Text style={styles(theme).titlePost}>
              {capitalize(item?.title)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={styles(theme).readingTimePost}>
                <Text style={styles(theme).readingTimeTextPost}>
                  Read Time:{" "}
                </Text>
                {text}
              </Text>
              <Text style={styles(theme).readingTimeNoOfWordsPost}>
                <Text style={styles(theme).readingTimeTextPost}>
                  No of words:{" "}
                </Text>
                {words}
              </Text>
            </View>
            <Text style={styles(theme).readingTimePost}>
              <Text style={styles(theme).readingTimeTextPost}>Author: </Text>
              USER {item?.userId}
            </Text>
          </View>

          <View style={styles(theme).horizontalLine} />
          <Text style={styles(theme).bodyPost}>{capitalize(item?.body)}</Text>
        </View>
      )}
    </Redirector>
  );
}

export function Tiles({ item }) {
  const { text, words } = useReadingTime(item?.body);
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 5,
        }}
      >
        <View
          style={[
            styles(theme).circle,
            {
              backgroundColor: "#2b2c36",
            },
          ]}
        >
          <Text style={{ color: "#b2b7e0" }}> {item.id}</Text>
        </View>
        <Text style={styles(theme).title}>{capitalize(item?.title)}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={styles(theme).readingTimePost}>
            <Text style={styles(theme).readingTimeTextPost}>Read Time: </Text>
            {text}
          </Text>
          <Text style={styles(theme).readingTimeNoOfWordsPost}>
            <Text style={styles(theme).readingTimeTextPost}>No of words: </Text>
            {words}
          </Text>
        </View>
        <Text style={styles(theme).readingTimePost}>
          Author: {item?.userId}
        </Text>
      </View>
      <View style={styles(theme).horizontalLine} />
      <Text numberOfLines={item?.body.length / 35} style={styles(theme).body}>
        {capitalize(item?.body)}
      </Text>
    </View>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    readingTimeText: {
      color: colorTheme[theme].secondary,
      fontSize: 10,
      fontWeight: "600",
      paddingHorizontal: 10,
    },
    readingTimeNoOfWords: {
      color: colorTheme[theme].secondary,
      fontSize: 10,
      paddingHorizontal: 10,
      paddingBottom: 10,
    },
    readingTime: {
      color: colorTheme[theme].secondary,
      fontSize: 10,
      paddingHorizontal: 10,
    },
    horizontalLine: {
      borderBottomColor: colorTheme[theme].secondary,
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginHorizontal: 5,
    },
    title: {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: 16,
      lineHeight: 19,
      color: colorTheme[theme].secondary,
      paddingHorizontal: 10,
      paddingVertical: 10,
      textAlign: "left",
      flex: 1,
      flexWrap: "wrap",
    },
    body: {
      color: colorTheme[theme].secondary,
      backgroundColor: colorTheme[theme].primary,
      padding: 10,
    },

    textStyle: {
      color: "black",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalTitle: {
      marginBottom: 15,
      textAlign: "left",
      fontWeight: "600",
      fontSize: 16,
    },
    modalbody: {
      marginBottom: 25,
      textAlign: "left",
    },
    circle: {
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 40 / 2,
    },
    circlePost: {
      width: 60,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 60 / 2,
    },
    titlePost: {
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: 20,
      lineHeight: 19,
      color: colorTheme[theme].secondary,
      paddingHorizontal: 10,
      paddingVertical: 10,
      textAlign: "left",
      flex: 1,
      flexWrap: "wrap",
    },
    readingTimePost: {
      color: colorTheme[theme].secondary,
      fontSize: 10,
      paddingHorizontal: 10,
    },
    readingTimeTextPost: {
      color: colorTheme[theme].secondary,
      fontSize: 10,
      fontWeight: "600",
      paddingHorizontal: 10,
    },
    readingTimeNoOfWordsPost: {
      color: colorTheme[theme].secondary,
      fontSize: 10,
      paddingHorizontal: 10,
      paddingBottom: 10,
    },

    bodyPost: {
      color: colorTheme[theme].secondary,
      padding: 10,
      fontSize: 24,
      textAlign: "justify",
    },
  });
