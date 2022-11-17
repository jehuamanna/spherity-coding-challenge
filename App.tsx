import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  Vibration,
  ToastAndroid,
  DrawerLayoutAndroid,
} from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home/Home";
import ContentModal from "./components/Modal";
import { Icon, Tooltip } from "react-native-elements";
import Editor from "./components/Editor";
import Redirector, { useComponentDataReceive } from "./common/lib/Redirector";
import Filter from "./components/Filter/Filter";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Redirector>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Posts"
            component={Home}
            options={({ navigation, route, drawer }) => ({
              headerTitle: () => (
                <Text
                  style={{
                    backgroundColor: "#fff",
                    fontWeight: "bold",
                    fontSize: 24,
                    color: "#000101",
                  }}
                >
                  Posts
                </Text>
              ),
              headerRight: () => {
                const tooltipRef = React.useRef(null);
                React.useEffect(() => {
                  navigation.setOptions({ props: route?.params?.props });
                }, [route?.params?.props]);
                const { drawer, isDrawerOpen, setIsDrawerOpen } =
                  useComponentDataReceive("drawer") || {};

                return (
                  <>
                    <Tooltip
                      ref={tooltipRef}
                      toggleAction="onLongPress"
                      backgroundColor="#000101"
                      highlightColor="#fff"
                      pointerColor="#fff"
                      overlayColor="rgba(255, 255, 255, 0)"
                      popover={
                        <Text style={{ color: "#fff" }}>Filter Posts</Text>
                      }
                    >
                      <Icon
                        size={34}
                        style={{ alignContent: "center" }}
                        name="filter-outline"
                        type="ionicon"
                        onPress={() => {
                          // navigation.navigate("Filter", );
                          if (route.params.isDrawerOpen) {
                            route.params.drawer.current.closeDrawer();
                            route.params.setIsDrawerOpen(() => false);
                          } else {
                            route.params.drawer.current.openDrawer();
                            route.params.setIsDrawerOpen(() => true);
                          }
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
            })}
          />
          <Stack.Screen
            name="EditPost"
            component={Editor}
            options={({ route, navigation, editedPost }) => ({
              headerTitle: () => (
                <Text
                  style={{
                    backgroundColor: "#fff",
                    fontWeight: "bold",
                    fontSize: 24,
                    color: "#000101",
                  }}
                >
                  Edit Post {route?.params?.props?.id}
                </Text>
              ),
              headerRight: (props) => {
                const netInfo = useNetInfo();

                const tooltipRef = React.useRef(null);
                const { posts, setPosts } =
                  useComponentDataReceive("posts") || {};
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
                  fetch(
                    `https://jsonplaceholder.typicode.com/posts/${editedPost.id}`,
                    {
                      method: "PATCH",
                      body: JSON.stringify({
                        title: editedPost.title,
                        body: editedPost.body,
                      }),
                      headers: {
                        "Content-type": "application/json; charset=UTF-8",
                      },
                    }
                  )
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
                      backgroundColor="#000101"
                      highlightColor="#fff"
                      pointerColor="#fff"
                      overlayColor="rgba(255, 255, 255, 0)"
                      popover={<Text style={{ color: "#fff" }}>Save Post</Text>}
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
            })}
          />
          <Stack.Screen
            name="Post"
            component={ContentModal}
            options={({ navigation, route }) => ({
              headerTitle: () => (
                <Text
                  style={{
                    backgroundColor: "#fff",
                    fontWeight: "bold",
                    fontSize: 24,
                    color: "#000101",
                  }}
                >
                  Post {route?.params?.props?.id}
                </Text>
              ),
              headerRight: () => {
                const tooltipRef = React.useRef(null);
                React.useEffect(() => {
                  navigation.setOptions({ props: route?.params?.props });
                }, [route?.params?.props]);

                return (
                  <>
                    <Tooltip
                      ref={tooltipRef}
                      toggleAction="onLongPress"
                      backgroundColor="#000101"
                      highlightColor="#fff"
                      pointerColor="#fff"
                      overlayColor="rgba(255, 255, 255, 0)"
                      popover={<Text style={{ color: "#fff" }}>Edit Post</Text>}
                    >
                      <Icon
                        size={34}
                        style={{ alignContent: "center" }}
                        name="create-outline"
                        type="ionicon"
                        onPress={() => {
                          navigation.navigate("EditPost", {
                            props: route?.params?.props,
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
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Redirector>
  );
}
