import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SearchBar from "react-native-dynamic-search-bar";
import { debounce } from "../../common/utils/debounce";
import { throttle } from "../../common/utils/throttle";

export default function Search(props) {
  const { setSearchText } = props;
  const [isSearching, setIsSearching] = useState(false);

  return (
    <View style={styles.container}>
      <SearchBar
        style={styles.search}
        height={30}
        spinnerVisibility={isSearching}
        fontColor="#c6c6c6"
        iconColor="#c6c6c6"
        shadowColor="#282828"
        cancelIconColor="#c6c6c6"
        backgroundColor="#fff"
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
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
  },
  search: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderRadius: 25,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
});
