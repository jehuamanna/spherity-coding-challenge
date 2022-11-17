import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState({});
  React.useEffect(() => {
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        setPosts(json);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#c8c8c7" />
        </View>
      ) : (
        <SafeAreaView style={styles.areaContainer}>
          <ScrollView contentContainerStyle={styles.container}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalTitle}>{content.title}</Text>
                  <Text style={styles.modalBody}>{content.body}</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            {posts.map((post) => (
              <Pressable
                onPress={() => {
                  setModalVisible(true);
                  setContent(post);
                }}
                key={post.id}
                style={styles.postsContainer}
              >
                <Text numberOfLines={1} style={styles.title}>
                  {post.title}
                </Text>
                <View style={styles.horizontalLine} />
                <Text numberOfLines={2} style={styles.body}>
                  {post.body}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: "#151521",
    flex: 1,
    justifyContent: "center",
  },
  areaContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  container: {
    backgroundColor: "#151521",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  postsContainer: {
    width: 346,
    height: 100,
    backgroundColor: "rgba(217, 217, 217, 0.29)",
    borderRadius: 8,
    marginBottom: 50,
  },
  horizontalLine: {
    borderBottomColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  body: {
    color: "#fff",
    padding: 10,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 5,
    backgroundColor: "#c8c8c7",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    margin: 10,
    backgroundColor: "rgba(217, 217, 217, 0.29)",
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
});
