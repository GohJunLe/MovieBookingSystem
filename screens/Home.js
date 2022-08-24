import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  FlatList,
  ScrollView,
  ImageBackground,
  Animated,
  Dimensions,
  RefreshControl,
} from "react-native";
import { color } from "react-native-reanimated";
import { Colors } from "react-native/Libraries/NewAppScreen";
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { icons, images, theme, COLORS, SIZES, FONTS,api } from "../constants";
import { movie } from "../constants";
import { Profiles, AppIcon, Loading } from "../components";
import axios from "axios";
const Home = ({ navigation }) => {
  const newSeasonScrollX = React.useRef(new Animated.Value(0)).current;

  const fetchData = movie(api.getPopularResp());
  const popularMovie = fetchData.data;
  const isLoading = fetchData.isLoading;

  // const [popularMovie, setPopularMovie] = useState([]);
  // const [isLoading, setLoading] = useState(true);
  // const apiReq = useCallback(async () => {
  //   const [resp] = await Promise.all([
  //     axios.get(
  //       api.getPopularResp()
  //     ),
  //   ]).finally(() => setLoading(false));
  //   setPopularMovie(resp.data);
  // }, []);

  // useEffect(() => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   apiReq();

  //   return () => controller.abort();
  // }, [apiReq]);



  const fetchData2 = movie(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=024d69b581633d457ac58359146c43f6"
  );
  const nowPlayingMovie = fetchData2.data;
  const isLoading2 = fetchData2.isLoading;

  const today = new Date();
  let currentDate = "";
  if (today.getMonth() + 1 < 10) {
    currentDate = today.getFullYear() + "-0" + (today.getMonth() + 1) + "-" + today.getDate();
  } else {
    currentDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  }

  const fetchData3=movie(`https://api.themoviedb.org/3/discover/movie?api_key=024d69b581633d457ac58359146c43f6&language=en-US&sort_by=popularity.desc&page=1&primary_release_date.gte=${currentDate}`);
  //const fetchData3=movie("https://api.themoviedb.org/3/movie/upcoming?api_key=024d69b581633d457ac58359146c43f6");
  const comingSoonMovie = fetchData3.data;
  const isLoading3 = fetchData3.isLoading;

  var top10Popular = [];
  popularMovie?.results?.map((item, index) => {
    if (index < 10) {
      top10Popular.push(item);
    }
  });

  function renderHeader() {
    const windowWidth = Dimensions.get("window").width;
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* profile icon */}
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
          }}
          // onPress={() => navigation.navigate("GetStarted")}
          // onPress={() => navigation.navigate("SignIn",{previousScreen:"Home"})}
          onPress={() => navigation.push("SignIn")}
        >
          <Image
            source={images.profile_photo}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
        {/* cinema logo */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
          }}
        >
          <Image
            source={AppIcon}
            resizeMode="contain"
            style={{
              width: 200,
              marginTop: 5,
              marginRight: windowWidth / 2 + 100,
              // marginRight:50
            }}
          />
        </View>
      </View>
    );
  }

  function renderPopularSection() {
    return (
      <Animated.FlatList
        horizontal
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={SIZES.width}
        //scrollEventThrottle={16}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: SIZES.radius,
        }}
        data={top10Popular}
        keyExtractor={(item) => `${item.id}`}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: newSeasonScrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          return (
            <TouchableHighlight
              onPress={() =>
                navigation.navigate("MovieDetail", { selectedMovie: item.id })
              }
            >
              <View
                style={{
                  width: SIZES.width,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Loading
                  size="large"
                  isLoading={isLoading}
                  style={{
                    position: "absolute",
                    alignSelf: "center",
                    top: "50%",
                  }}
                />
                <ImageBackground
                  resizeMode="cover"
                  source={{
                    uri: "https://image.tmdb.org/t/p/w500" + item.poster_path,
                  }}
                  style={{
                    width: SIZES.width * 0.85,
                    height: SIZES.width * 0.85,
                    justifyContent: "flex-end",
                  }}
                  imageStyle={{
                    borderRadius: 40,
                  }}
                >
                  <View
                    style={{
                      height: 60,
                      width: "100%",
                      //marginBottom: SIZES.radius,
                      paddingHorizontal: SIZES.radius,
                      justifyContent: "space-between",
                      flexDirection: "row",
                      backgroundColor: COLORS.transparentBlack,
                      //borderRadius:40,
                    }}
                  >
                    {/* Book Now */}
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        // backgroundColor: COLORS.transparentBlack,
                        // borderRadius:40,
                        // marginBottom:0
                      }}
                    >
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          width: 40,
                          height: 40,
                          borderRadius: 30,
                        }}
                      >
                        <icons.fontAwesome
                          name="ticket"
                          size={25}
                          color={COLORS.white}
                        />
                        {/* <Image
                          source={icons.play}
                          style={{
                            width: 15,
                            height: 15,
                            tintColor: COLORS.white,
                          }}
                        /> */}
                      </View>
                      <Text
                        style={{
                          marginLeft: SIZES.base,
                          color: COLORS.white,
                          ...FONTS.h2,
                          textShadowColor: "black",
                          width: "80%",
                        }}
                      >
                        {item.title}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            </TouchableHighlight>
          );
        }}
      />
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(newSeasonScrollX, SIZES.width);

    return (
      <View
        style={{
          marginTop: SIZES.padding,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {top10Popular.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          const dotwidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [6, 20, 6],
            extrapolate: "clamp",
          });

          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.lightGray, COLORS.primary, COLORS.lightGray],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              opacity={opacity}
              key={`dot-${index}`}
              style={{
                borderRadius: SIZES.radius,
                marginHorizontal: 3,
                width: dotwidth,
                height: 6,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    );
  }

  function renderNowShowingSection() {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        {/* header */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: SIZES.padding,
            alignItems: "center",
          }}
        >
          <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h2 }}>
            Now Showing
          </Text>
          <Image
            source={icons.right_arrow}
            style={{ height: 20, tintColor: COLORS.primary, width: 10 }}
          />
        </View>
        {/* list */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.padding,
          }}
          data={nowPlayingMovie.results}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <TouchableHighlight
                onPress={() =>
                  navigation.navigate("MovieDetail", { selectedMovie: item.id })
                }
              >
                <View
                  style={{
                    marginLeft: index == 0 ? SIZES.padding : 20,
                    marginRight:
                      index == nowPlayingMovie.results.length - 1
                        ? SIZES.padding
                        : 0,
                  }}
                >
                  <Loading
                    size="large"
                    isLoading={!isLoading2}
                    style={{
                      position: "absolute",
                      alignSelf: "center",
                      top: "30%",
                    }}
                  />
                  {/* thumbnail */}
                  <Image
                    source={{
                      uri: "https://image.tmdb.org/t/p/w500" + item.poster_path,
                    }}
                    resizeMode="cover"
                    style={{
                      width: SIZES.width / 3,
                      height: SIZES.width / 3 + 60,
                      borderRadius: 20,
                    }}
                  />
                  {/* name */}
                  <Text
                    style={{
                      color: COLORS.white,
                      marginTop: SIZES.base,
                      ...FONTS.h4,
                      width: SIZES.width / 3,
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              </TouchableHighlight>
            );
          }}
        />
      </View>
    );
  }

  function renderComingSoonSection() {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        {/* header */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: SIZES.padding,
            alignItems: "center",
          }}
        >
          <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h2 }}>
            Coming Soon
          </Text>
          <Image
            source={icons.right_arrow}
            style={{ height: 20, tintColor: COLORS.primary, width: 10 }}
          />
        </View>
        {/* list */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.padding,
          }}
          data={comingSoonMovie.results}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <TouchableHighlight
                onPress={() =>
                  navigation.navigate("MovieDetail", { selectedMovie: item.id })
                }
              >
                <View
                  style={{
                    marginLeft: index == 0 ? SIZES.padding : 20,
                    marginRight:
                      index == nowPlayingMovie.results.length - 1
                        ? SIZES.padding
                        : 0,
                  }}
                >
                  <Loading
                    size="large"
                    isLoading={!isLoading2}
                    style={{
                      position: "absolute",
                      alignSelf: "center",
                      top: "30%",
                    }}
                  />
                  {/* thumbnail */}
                  <Image
                    source={{
                      uri: "https://image.tmdb.org/t/p/w500" + item.poster_path,
                    }}
                    resizeMode="cover"
                    style={{
                      width: SIZES.width / 3,
                      height: SIZES.width / 3 + 60,
                      borderRadius: 20,
                    }}
                  />
                  {/* name */}
                  <Text
                    style={{
                      color: COLORS.white,
                      marginTop: SIZES.base,
                      ...FONTS.h4,
                      width: SIZES.width / 3,
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              </TouchableHighlight>
            );
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}
    >
      {/* header */}
      {renderHeader()}
      {/* start of content */}
      <ScrollView>
        {renderPopularSection()}
        {renderDots()}
        <View style={{height:15}}></View>
        {renderNowShowingSection()}
        <View style={{height:15}}></View>
        {renderComingSoonSection()}
      </ScrollView>
    </View>
  );
};

export default Home;
