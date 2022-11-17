import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import Redirector, { useComponentDataSend } from "../../common/lib/Redirector";
import ContentModal, { Tiles } from "../Modal";

export default function Posts(props) {
  const { posts, isLoading, makeAPICall, navigation } = props;
  return (
    <>
      {posts.length > 0 ? (
        <Redirector>
          <SafeAreaView style={styles.areaContainer}>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={() => makeAPICall()}
                />
              }
              contentContainerStyle={styles.container}
            >
              <MasonryList
                data={posts}
                keyExtractor={(item): string => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({
                  item,
                  i,
                }: {
                  item: {
                    title: string;
                    body: string;
                    userId: string;
                    id: string;
                  };
                  i: number;
                }) => {
                  return (
                    <Pressable
                      onPress={() => {
                        navigation.navigate("Post", {
                          props: { id: item.id },
                        });
                      }}
                      key={item.id}
                      style={styles.postsContainer}
                    >
                      <Tiles item={item} />
                    </Pressable>
                  );
                }}
                refreshing={isLoading}
                onRefresh={() => makeAPICall()}
                onEndReachedThreshold={0.1}
              />
            </ScrollView>
          </SafeAreaView>
        </Redirector>
      ) : (
        <View style={styles.nopostsfound}>
          <Text>No Posts found</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
  areaContainer: {
    width: "100%",
    height: "92%",
    backgroundColor: "#fff",
  },
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 10,

    paddingBottom: 10,
  },
  postsContainer: {
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 5,

    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
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
    height: "100%",
    textAlign: "left",
    flex: 1,
    flexWrap: "wrap",
  },
  body: {
    color: "#000101",
    padding: 10,
  },

  centeredView: {},
  modalView: {
    justifyContent: "flex-start",
    margin: 0,
    backgroundColor: "#fff",
    borderTopRigthRadius: 20,
    borderTopLeftRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    height: "25%",
    marginTop: "100%",
  },
  modalViewc: {
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
  circle: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30 / 2,
  },
  nopostsfound: {
    height: "100%",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
