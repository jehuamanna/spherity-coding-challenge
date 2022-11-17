import React from "react";
import { StyleSheet, Text, View, BackHandler } from "react-native";
import Redirector, { useComponentDataReceive } from "../common/lib/Redirector";

import { capitalize } from "../common/utils/capitalize";
import { useReadingTime } from "./reading-time-estimator/useReadingTime";

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

  return (
    <Redirector>
      {item && (
        <View style={{ padding: 20 }}>
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
                styles.circlePost,
                {
                  backgroundColor: "#2b2c36",
                },
              ]}
            >
              <Text style={{ color: "#b2b7e0" }}> {item?.id}</Text>
            </View>
            <Text style={styles.titlePost}>{capitalize(item?.title)}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={styles.readingTimePost}>
                <Text style={styles.readingTimeTextPost}>Read Time: </Text>
                {text}
              </Text>
              <Text style={styles.readingTimeNoOfWordsPost}>
                <Text style={styles.readingTimeTextPost}>No of words: </Text>
                {words}
              </Text>
            </View>
            <Text style={styles.readingTimePost}>
              <Text style={styles.readingTimeTextPost}>Author: </Text>
              USER {item?.userId}
            </Text>
          </View>

          <View style={styles.horizontalLine} />
          <Text style={styles.bodyPost}>{capitalize(item?.body)}</Text>
        </View>
      )}
    </Redirector>
  );
}

export function Tiles({ item }) {
  const { text, words } = useReadingTime(item?.body);

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
            styles.circle,
            {
              backgroundColor: "#2b2c36",
            },
          ]}
        >
          <Text style={{ color: "#b2b7e0" }}> {item.id}</Text>
        </View>
        <Text style={styles.title}>{capitalize(item?.title)}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={styles.readingTimePost}>
            <Text style={styles.readingTimeTextPost}>Read Time: </Text>
            {text}
          </Text>
          <Text style={styles.readingTimeNoOfWordsPost}>
            <Text style={styles.readingTimeTextPost}>No of words: </Text>
            {words}
          </Text>
        </View>
        <Text style={styles.readingTimePost}>{item?.userId}</Text>
      </View>
      <View style={styles.horizontalLine} />
      <Text numberOfLines={item?.body.length / 35} style={styles.body}>
        {capitalize(item?.body)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  readingTimeText: {
    color: "#000101",
    fontSize: 10,
    fontWeight: "600",
    paddingHorizontal: 10,
  },
  readingTimeNoOfWords: {
    color: "#000101",
    fontSize: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  readingTime: {
    color: "#000101",
    fontSize: 10,
    paddingHorizontal: 10,
  },
  horizontalLine: {
    borderBottomColor: "#000101",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 5,
  },
  title: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 19,
    color: "#000101",
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: "left",
    flex: 1,
    flexWrap: "wrap",
  },
  body: {
    color: "#000101",
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
    color: "#000101",
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: "left",
    flex: 1,
    flexWrap: "wrap",
  },
  readingTimePost: {
    color: "#000101",
    fontSize: 10,
    paddingHorizontal: 10,
  },
  readingTimeTextPost: {
    color: "#000101",
    fontSize: 10,
    fontWeight: "600",
    paddingHorizontal: 10,
  },
  readingTimeNoOfWordsPost: {
    color: "#000101",
    fontSize: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  bodyPost: {
    color: "#000101",
    padding: 10,
    fontSize: 24,
    textAlign: "justify",
  },
});
