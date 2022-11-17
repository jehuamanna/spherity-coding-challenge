import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  ToastAndroid,
  DrawerLayoutAndroid,
  Button,
} from "react-native";
const JsonSearch = require("search-array").default;
import MiniSearch from "minisearch";

import { useNetInfo } from "@react-native-community/netinfo";
import React, { useRef, useState } from "react";
import ContentModal, { Tiles } from "../Modal";
import Redirector, { useComponentDataSend } from "../../common/lib/Redirector";
import Search from "./Search";
import Posts from "./Posts";
import { throttle } from "../../common/utils/throttle";
import Filter from "../Filter/Filter";
import itemsjs from "itemsjs";
export default function Home(props) {
  const netInfo = useNetInfo();
  const [editedPost, setEditedPost] = useState({
    title: "",
    body: "",
    userId: "",
    id: "",
  });
  const [posts, setPosts] = useState<
    { title: string; body: string; userId: string; email: string }[]
  >([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filterByUserId, setFilterByUserId] = useState(true);
  const [filterByTitle, setFilterByTitle] = useState(false);
  const [filterByBody, setFilterByBody] = useState(false);
  const [searchOptions, setSearchOptions] = useState({});
  useComponentDataSend("posts", { posts, setPosts });
  useComponentDataSend("editedPost", { editedPost, setEditedPost });
  const makeAPICall = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        setPosts(json);
        setFilteredPosts(json);
        setIsLoading(false);
        ToastAndroid.showWithGravityAndOffset(
          "Posts Loaded",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      })
      .catch(() => {
        ToastAndroid.showWithGravityAndOffset(
          `${
            netInfo.isConnected
              ? "Unable to load posts. Please try again"
              : "Device is offline"
          } `,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      });
  };
  React.useEffect(() => {
    setIsLoading(true);
    makeAPICall();
  }, []);

  React.useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);
  const onChangeText = (searchText) => {
    if (!searchText) {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(() => {
        const filters = [
          { filter: "userId", isChecked: filterByUserId },
          { filter: "body", isChecked: filterByBody },
          { filter: "title", isChecked: filterByTitle },
        ];
        // const items = itemsjs(posts, {
        //   searchableFields: filters
        //     .filter((i) => i.isChecked)
        //     .map((i) => i.filter),
        // });
        console.log(filters.filter((i) => i.isChecked).map((i) => i.filter));
        const miniSearch = new MiniSearch({
          fields: filters.filter((i) => i.isChecked).map((i) => i.filter),
          storeFields: filters.map((i) => i.filter).concat(["id"]),
          searchOptions: {
            ...searchOptions,
            processTerm: (term) => String(term).toLowerCase(), // search query processing
          }, // fields to index for full-text search
          processTerm: (term) => String(term).toLowerCase(),
        });

        miniSearch.addAll(posts);

        // const filteredPosts = posts.filter((post) => {
        //   return (
        //     post.body.toLowerCase().includes(searchText.toLowerCase()) ||
        //     post.title.toLowerCase().includes(searchText.toLowerCase())
        //   );
        // });
        console.log("eee", searchOptions);
        return miniSearch.search(searchText.toLowerCase());
      });
    }
  };
  React.useEffect(() => {
    onChangeText(searchText);
  }, [searchText, filterByBody, filterByTitle, filterByUserId]);
  const drawer = useRef(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // useComponentDataSend("drawer", { drawer, isDrawerOpen, setIsDrawerOpen });
  React.useEffect(() => {
    props.navigation.setParams({ drawer, isDrawerOpen, setIsDrawerOpen });
  }, [isDrawerOpen, setIsDrawerOpen]);

  return (
    <Redirector>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={"right"}
        renderNavigationView={() => (
          <Filter
            filterByUserId={filterByUserId}
            setFilterByUserId={setFilterByUserId}
            filterByTitle={filterByTitle}
            setFilterByTitle={setFilterByTitle}
            filterByBody={filterByBody}
            setFilterByBody={setFilterByBody}
            setSearchOptions={setSearchOptions}
          />
        )}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000101" />
          </View>
        ) : (
          <>
            <Search searchText={searchText} setSearchText={setSearchText} />

            <Posts
              posts={filteredPosts}
              isLoading={isLoading}
              makeAPICall={makeAPICall}
              navigation={props.navigation}
            />
          </>
        )}
      </DrawerLayoutAndroid>
    </Redirector>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
});
