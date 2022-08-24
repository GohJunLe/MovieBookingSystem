import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  COLORS,
  SIZES,
  FONTS,
} from "../constants";
// //To get the movie details that want to display out
const Movie = ({ id, poster_path, title, navigation}) => (
  <View style = {{height: 250, width: 210, paddingLeft: 10}}>
    <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("MovieDetail", { selectedMovie: id })
                  }
                >
                <Image
                      source={{uri: "https://image.tmdb.org/t/p/w500"+poster_path,}}
                      resizeMode="cover"
                      style={{
                        width: SIZES.width / 3,
                        height: SIZES.width / 3 + 60,
                        borderRadius: 20,
                      }}
                    />
                    <Text
                      style={{
                        color: COLORS.white,
                        marginTop: SIZES.base,
                        width: 150,
                        ...FONTS.h4,
                      }}
                    >
                      {title}
                    </Text>
                </TouchableOpacity>
                </View>
);

// Search filter
const NowPlaying = ({ searchPhrase, setClicked, data, navigation}) => {
  const renderItem = ({ item}) => {
    // show all when no search phrase
    if (searchPhrase === "") {
      return <Movie id={item.id} poster_path={item.poster_path} title={item.title} navigation={navigation} />;
    }
    //return the movie with same phrase in the search phrase
    if (item.title.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Movie id={item.id} poster_path={item.poster_path} title={item.title} navigation={navigation} />;
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        <FlatList 
          key = {"_"}
          numColumns = {2}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default NowPlaying;

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "70%",
    width: "100%",
  },
});