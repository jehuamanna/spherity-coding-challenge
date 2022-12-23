import { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SearchBar from "react-native-dynamic-search-bar";
import { debounce } from "../../common/utils/debounce";
import { throttle } from "../../common/utils/throttle";
import { Icon } from "react-native-elements";
import { colorTheme, ThemeContext } from "../../common/context/ThemeContext";

export default function Search(props) {
  const { setSearchText } = props;
  const [isSearching, setIsSearching] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <View style={styles(theme).container}>
      <SearchBar
        style={styles(theme).search}
        height={30}
        spinnerVisibility={isSearching}
        fontColor={colorTheme[theme].secondary}
        iconColor="#c6c6c6"
        shadowColor="#282828"
        cancelIconColor="#c6c6c6"
        backgroundColor={colorTheme[theme].primary}
        placeholder="Search Posts"
        onChangeText={debounce(
          (searchText) => {
            setIsSearching(true);
            setSearchText(searchText);
          },
          500,
          () => setIsSearching(true),
          () => setIsSearching(false)
        )}
        onSearchPress={() => console.log("Search Icon is pressed")}
        onClearPress={() => setSearchText("")}
        onPress={() => console.log("opPress pressed")}
      />
      <Icon
        size={28}
        style={{ alignContent: "center" }}
        name="filter-outline"
        type="ionicon"
        onPress={() => {
          if (props.isDrawerOpen) {
            props.drawer.current.closeDrawer();
            props.setIsDrawerOpen(true);
          } else {
            props.drawer.current.openDrawer();
            props.setIsDrawerOpen(false);
          }
        }}
        onLongPress={() => {}}
      ></Icon>
    </View>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: colorTheme[theme].primary,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderWidth: 1,
      borderTopWidth: 0,
      borderRadius: 2,
      borderColor: "#ddd",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
      alignItems: "center",
      flexDirection: "row",
    },
    search: {
      borderWidth: 1,
      borderTopWidth: 0,
      borderRadius: 25,
      backgroundColor: colorTheme[theme].primary,
      borderColor: theme === "light" ? "#ddd" : colorTheme[theme].primary,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
      marginRight: 5,
    },
  });
