import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/pages/Home/Home";
import ContentModal from "./src/pages/Modal/Modal";
import Editor from "./src/pages/Editor/Editor";
import Redirector from "./src/common/lib/Redirector";
import { postsOptions } from "./src/pages/ScreenOptions/Posts";
import { editPostOptions } from "./src/pages/ScreenOptions/EditPost";
import { postOptions } from "./src/pages/ScreenOptions/Post";
import { ThemeContext } from "./src/common/context/ThemeContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [theme, setTheme] = React.useState("dark");
  return (
    <Redirector>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Posts"
              component={Home}
              options={postsOptions}
            />
            <Stack.Screen
              name="EditPost"
              component={Editor}
              options={editPostOptions}
            />
            <Stack.Screen
              name="Post"
              component={ContentModal}
              options={postOptions}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeContext.Provider>
    </Redirector>
  );
}
