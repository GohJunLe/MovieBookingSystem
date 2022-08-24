import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Search, X } from "react-native-feather"
const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setClicked}) => {
  return (
    <View style={styles.container}>
      <View
      //style of the searchbar change due to it is clicked or not
        style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }
      >
        {/* search icon */}
        <Search
          size={20}
          color="white"
          style={{ marginLeft: 10 }}
        />
        {/* input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* cross icon */}
        {clicked && (
          <X size={20} color="white" style={{ padding: 10 }} onPress={() => {
              setSearchPhrase("")
              setClicked(false);
          }}/>
        )}
      </View>
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "95%",
    length: "20%"

  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "black",
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "black",
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
    color: "white",
  },
});