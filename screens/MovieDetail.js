import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Share,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import LinearGradient from "react-native-linear-gradient";
import { COLORS, SIZES, FONTS, icons, api } from "../constants";

import YoutubePlayer from "react-native-youtube-iframe";
// import { loadPartialConfig } from "@babel/core";
import { Card } from 'react-native-paper';
import { Loading } from "../components";

const MovieDetail = ({ route, navigation }) => {
  const { selectedMovie } = route.params;
  const [data, setData] = useState({
    movieDetails: [],
    similarMovies: [],
    languageList: [],
  });

  const [isLoading, setLoading] = useState(true);
  const apiReq = useCallback(async () => {
    const [resp, similarResp, languageList] = await Promise.all([
      axios.get(
        api.getResp(selectedMovie)
      ),
      axios.get(
        api.getSimilarResp(selectedMovie)
      ),
      axios.get(
        api.getLanguageList()
      ),
    ]).finally(() => setLoading(false));
    setData({
      movieDetails: resp.data,
      similarMovies: similarResp.data.results,
      languageList: languageList.data,
    });
  }, [selectedMovie]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    apiReq();

    return () => controller.abort();
  }, [apiReq]);

  console.log("test", "test");

  let hours = Math.trunc(data.movieDetails.runtime / 60);
  let minutes = data.movieDetails.runtime % 60;

  const [isPlay, setPlay] = useState(false);
  const [test, setTest] = useState(0);
  const [pos, setPos] = useState(0);

  function renderHeaderBar() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: Platform.OS === "ios" ? 40 : 20,
          paddingHorizontal: SIZES.padding,
          position: "absolute",
        }}
      >
        {/* back */}
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 50,
              height: 50,
              borderRadius: 20,
              backgroundColor: COLORS.transparentRed,
            }}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={icons.left_arrow}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
        </View>
        {/* share */}
        <View style={{ flex: 1, flexDirection: "row-reverse" }}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 50,
              height: 50,
              borderRadius: 20,
              textAlign: "Right",
              backgroundColor: COLORS.transparentRed,
            }}
            onPress={onShare}
          >
            <Image
              source={icons.upload}
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  async function onShare(){
      try {
        const result = await Share.share({
          title:`${data.movieDetails.title}`,
           message: `https://blogs.mtdv.me/blog/posts/mycinemabookingapp`
        });

      } catch (error) {
        alert(error.message);
      }
  }

  function renderHeaderSection() {
    return (
      <>
      {/* {renderHeaderBar()} */}
      <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={["transparent", "black"]}
      style={{
        width: "100%",
        height: 300,
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${data.movieDetails.poster_path}`,
         }}
          resizeMode="contain"
         style={{
            width: 200,
            alignSelf: "center",
            paddingVertical: "40%",
            // borderWidth:1,
            // borderColor: "white",
           borderRadius:10
          }}
        />

      {/* name */}
      <Text
        style={{
          color: COLORS.white,
          ...FONTS.h1,
          marginTop: SIZES.base,
        }}
      >
        {data.movieDetails.title}
      </Text>
    </LinearGradient>
    </>
    );
  }

  function renderCategory() {
    const popularity = Math.round(data.movieDetails.popularity / 100) / 10;

    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.base,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* popularity */}
        <View style={[styles.categoryContainer, { marginLeft: 0 }]}>
          <Image
            source={icons.fire}
            resizeMode="contain"
            style={{
              width: 15,
              height: 15,
            }}
          />
          <Text
            style={{
              marginLeft: SIZES.base,
              color: COLORS.white,
              ...FONTS.h4,
            }}
          >
            {popularity + "K"}
          </Text>
        </View>

        {/* genre */}
        <View
          style={[
            styles.categoryContainer,
            { paddingHorizontal: SIZES.padding },
          ]}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h4,
            }}
          >
            {getGenre(data?.movieDetails?.genres)}
          </Text>
        </View>
        {/* rating */}
        <View style={styles.categoryContainer}>
          <Image
            source={icons.star}
            resizeMode="contain"
            style={{
              width: 15,
              height: 15,
            }}
          />
          <Text
            style={{
              marginLeft: SIZES.base,
              color: COLORS.white,
              ...FONTS.h4,
            }}
          >
            {Math.round(data.movieDetails.vote_average * 10) / 10}
          </Text>
        </View>
      </View>
    );
  }

  function getGenre(movieGenre) {
    if (movieGenre != null) {
      var genres = [];
      for (var i = 0; i < 2 && i < movieGenre.length; i++) {
        genres.push(movieGenre[i].name);
      }
      return genres.join(", ");
    }
  }

  function movieTimeSlot(){
    return(
      <View>
        <Text></Text>
      </View>
    );
  }

  function renderMovieDetail() {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.padding,
          justifyContent: "space-around",
        }}
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          setTest(layout.y);
          console.log("y1:", test);
        }}
      >
        {/* content */}
        <View
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            setTest(layout.y + test);
            console.log("y2:", test);
          }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            {/* release date */}
            <View style={{ flex: 1}}>
            <Text style={{ textAlign: "center" }}>
              <Text style={{ color: COLORS.white, ...FONTS.h3}}>
                Release date{"\n"}
              </Text>
              <Text style={{ color: COLORS.lightGray, ...FONTS.body3 }}>
                {data.movieDetails.release_date}
              </Text>
              </Text>
              
            </View>

            {/* duration */}
            <View style={{ flex: 1}}>
              <Text style={{ textAlign: "center" }}>
                <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                  Duration{"\n"}
                </Text>
                <Text style={{ color: COLORS.lightGray, ...FONTS.body3 }}>
                  {`${hours} hr ${minutes} min`}
                </Text>
              </Text>
            </View>

            {/* language */}
            <View style={{ flex: 1}}>
              <Text style={{ textAlign: "center" }}>
                <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                  Language{"\n"}
                </Text>
                <Text style={{ color: COLORS.lightGray, ...FONTS.body3 }}>
                  {languageConvert(data.movieDetails.original_language)}
                </Text>
              </Text>
            </View>
          </View>
          <Text></Text>

          {/* {movieTimeSlot()} */}

          {/* overview */}
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Overview</Text>
            <Text style={{ color: COLORS.lightGray, ...FONTS.body3 }}>
              {data.movieDetails.overview}
            </Text>
          </View>
          <Text></Text>

          {/* trailer */}
          <View
            style={{
              flexDirection: "column",
            }}
            onLayout={(event) => {
              const layout = event.nativeEvent.layout;
              setTest(layout.y + test);
              console.log("y3", test);
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Trailer</Text>
            <YoutubePlayer
              height={300}
              play={false}
              videoId={getTrailer()}
              webViewStyle={{ opacity: 0.99 }}
            />
          </View>
        </View>
      </View>
    );
  }

  function languageConvert(original_language){
    for(var i=0;i<data.languageList.length;i++){
      if(data.languageList[i].iso_639_1==original_language)
        return data.languageList[i].english_name;
    }
    return original_language;
  }

  function getTrailer() {
    if (data.movieDetails.videos != null) {
      const video = data.movieDetails.videos.results;
      for (var i = 0; i < video.length; i++) {
        if (video[i].type == "Trailer") {
          return video[i].key;
        }
      }
    }
  }

  function renderRecommendations(){
    return(
      <View>
        {/* header */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: SIZES.padding,
            alignItems: "center",
          }}
        >
          <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h2 }}>
          You may also like
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
          data={data.similarMovies}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MovieDetail", { selectedMovie: item.id })
                }
              >
                <View
                  style={{
                    marginLeft: index == 0 ? SIZES.padding : 20,
                    marginRight:
                      index == data.similarMovies.length - 1
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
                      width: SIZES.width / 3,
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }

  function bookNowBtn() {
    return (
      <View>
        <TouchableOpacity
          style={{
            height: 60,
            width: "90%",
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            marginBottom: Platform.OS === "ios" ? SIZES.padding * 2 : 0,
            backgroundColor: COLORS.primary,
            borderRadius: 15,
            position: "absolute",
            bottom: 0,
          }}
          onPress={() =>
            navigation.navigate("Booking", { selectedMovie: data?.movieDetails})
          }  
        >
          <View style={{ flexDirection: "row" }}>

            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h2,
              }}
            >
              Book Now
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function loadingScreen() {
    if (isLoading) {
      return (
        <Loading
          size={50}
          isLoading={isLoading}
          style={{
            position: "absolute",
            alignSelf: "center",
            backgroundColor: COLORS.transparentBlack,
            width: "100%",
            height: "100%",
          }}
        />
      );
    }
  }

  return (
    <View>
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w500${data.movieDetails.poster_path}`,
        }}
        resizeMode="cover"
        blurRadius={2}
        style={{
          width: "100%",
        }}
      >
        <ScrollView onScroll={(event) => setPos("1")}>
          <View style={{ backgroundColor: "transparent", height: 150 }}/>

          {/* poster&name */}
          {renderHeaderSection()}
         
          <View style={{ backgroundColor: COLORS.black }}>
            {/* category&ratings */}
            {renderCategory()}

            {/* themoviedetails */}
            {renderMovieDetail()}

             {/* recommend */}
            {renderRecommendations()}

            <View  style={{ marginVertical:50}}></View>
           
          </View>
        </ScrollView>
      </ImageBackground>

      {/* button */}
      {bookNowBtn()}

      {loadingScreen()}

      {/* header bar */}
      {renderHeaderBar()}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: SIZES.base,
    paddingHorizontal: SIZES.base,
    paddingVertical: 3,
    borderRadius: SIZES.base,
    backgroundColor: COLORS.gray1,
  },
});

export default MovieDetail;
