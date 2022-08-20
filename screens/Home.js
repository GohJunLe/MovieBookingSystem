import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  ImageBackground,
  Animated,
  Dimensions,
  RefreshControl
} from "react-native";
import { color } from "react-native-reanimated";
import { Colors } from "react-native/Libraries/NewAppScreen";
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import {
  icons,
  images,
  theme,
  COLORS,
  SIZES,
  FONTS,
} from "../constants";
import {movie} from "../constants/dummy";
import { Profiles, AppIcon, Loading } from "../components";
const Home = ({ navigation }) => {
  const newSeasonScrollX = React.useRef(new Animated.Value(0)).current;

  const fetchData=movie("https://api.themoviedb.org/3/movie/popular?api_key=024d69b581633d457ac58359146c43f6");
  const popularMovie=fetchData.data;
  const isLoading=fetchData.isLoading;

  const fetchData2=movie("https://api.themoviedb.org/3/movie/now_playing?api_key=024d69b581633d457ac58359146c43f6");
  const nowPlayingMovie=fetchData2.data;
  const isLoading2=fetchData2.isLoading;

  var top10Popular=[];
  popularMovie?.results?.map((item, index) => {
    if(index<10){
      top10Popular.push(item);
    }
  })
  console.log("tt")
  function renderHeader() {
    const windowWidth = Dimensions.get('window').width;
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
        <TouchableOpacity
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
              marginTop:5,
              marginRight:(windowWidth/2+100)
              // marginRight:50
            }}
          />
        </TouchableOpacity>
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
        scrollEventThrottle={16}
        decelerationRate={0}
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
            <TouchableWithoutFeedback
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
               <Loading size="large" isLoading={isLoading} style={{position:"absolute",alignSelf:"center",top:"50%"}}/>
                <ImageBackground
                  resizeMode="cover"
                  source={{uri: "https://image.tmdb.org/t/p/w500"+item.poster_path,}}
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
                      marginBottom: SIZES.radius,
                      paddingHorizontal: SIZES.radius,
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    
                    {/* Book Now */}
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          width: 40,
                          height: 40,
                          backgroundColor: COLORS.transparentWhite,
                          borderRadius: 30,
                        }}
                      >
                        <Image
                          source={icons.play}
                          style={{
                            width: 15,
                            height: 15,
                            tintColor: COLORS.white,
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          marginLeft: SIZES.base,
                          color: COLORS.white,
                          ...FONTS.h3,
                        }}
                      >
                        Book Now
                      </Text>
                    </View>

                  </View>
                </ImageBackground>
              </View>
            </TouchableWithoutFeedback>
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

  function renderContinueWatchingSection() {
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
            Now Playing
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
              <TouchableWithoutFeedback
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
                  <Loading size="large" Loading={isLoading} style={{position:"absolute",alignSelf:"center",top:"30%"}}/>
                  {/* thumbnail */}
                  <Image
                    source={{uri: "https://image.tmdb.org/t/p/w500"+item.poster_path,}}
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
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}
    >
      {/* header */}
      {renderHeader()}
      {/* start of content */}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 250,
        }}
      >
        {renderPopularSection()}
        {renderDots()}
        {renderContinueWatchingSection()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
