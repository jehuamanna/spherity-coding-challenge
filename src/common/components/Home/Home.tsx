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
import React, { useContext, useRef, useState } from "react";
import ContentModal, { Tiles } from "../Modal/Modal";
import Redirector, { useComponentDataSend } from "../../common/lib/Redirector";
import Search from "./Search";
import Posts from "./Posts";
import Filter from "../Filter/Filter";
import itemsjs from "itemsjs";
import { colorTheme, ThemeContext } from "../../common/context/ThemeContext";
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
        const miniSearch = new MiniSearch({
          fields: filters.filter((i) => i.isChecked).map((i) => i.filter),
          storeFields: filters.map((i) => i.filter).concat(["id"]),
          searchOptions: {
            fuzzy: true,
            processTerm: (term) => String(term).toLowerCase(), // search query processing
          }, // fields to index for full-text search
          processTerm: (term) => String(term).toLowerCase(),
        });

        miniSearch.addAll(posts);
        return miniSearch.search(searchText.toLowerCase());
      });
    }
  };
  React.useEffect(() => {
    onChangeText(searchText);
  }, [searchText]);
  React.useEffect(() => {
    if (!searchText) {
      setFilteredPosts(posts);
      return;
    }
    setFilteredPosts(() => {
      const filters = [
        { filter: "userId", isChecked: filterByUserId },
        { filter: "body", isChecked: filterByBody },
        { filter: "title", isChecked: filterByTitle },
      ];
      const miniSearch = new MiniSearch({
        fields: filters.filter((i) => i.isChecked).map((i) => i.filter),
        storeFields: filters.map((i) => i.filter).concat(["id"]),
        searchOptions: {
          fuzzy: 1,
          processTerm: (term) => String(term).toLowerCase(), // search query processing
        }, // fields to index for full-text search
        processTerm: (term) => String(term).toLowerCase(),
      });

      miniSearch.addAll(posts);
      return miniSearch.search(searchText.toLowerCase());
    });
  }, [filterByBody, filterByTitle, filterByUserId]);
  const drawer = useRef(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  React.useEffect(() => {
    props.navigation.setParams({
      drawer,
      isDrawerOpen,
      setIsDrawerOpen,
      theme,
    });
  }, [isDrawerOpen, setIsDrawerOpen]);
  const { theme, setTheme } = useContext(ThemeContext);

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
            setParams={props.navigation.setParams}
            setFilterByBody={setFilterByBody}
          />
        )}
      >
        {isLoading ? (
          <View style={styles(theme).loadingContainer}>
            <ActivityIndicator
              size="large"
              color={colorTheme[theme].secondary}
            />
          </View>
        ) : (
          <>
            <Search
              drawer={drawer}
              searchText={searchText}
              setSearchText={setSearchText}
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen}
            />

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

const styles = (theme) =>
  StyleSheet.create({
    loadingContainer: {
      backgroundColor: colorTheme[theme].primary,
      flex: 1,
      justifyContent: "center",
    },
  });
