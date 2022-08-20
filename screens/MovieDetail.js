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
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
//import {TMDB_API} from '@env';

import LinearGradient from "react-native-linear-gradient";
import { COLORS, SIZES, FONTS, icons } from "../constants";

import YoutubePlayer from "react-native-youtube-iframe";
import { loadPartialConfig } from "@babel/core";
import { Loading } from "../components";

const MovieDetail = ({ route, navigation }) => {
  const { selectedMovie } = route.params;
  const [data, setData] = useState({
    movieDetails: [],
    similarMovies: [],
    castCrew: [],
  });
  const apiKey = "024d69b581633d457ac58359146c43f6";

  const [isLoading, setLoading] = useState(true);
  const apiReq = useCallback(async () => {
    const [resp, similarResp, castCrew] = await Promise.all([
      axios.get(
        `https://api.themoviedb.org/3/movie/${selectedMovie}?api_key=${apiKey}&language=en-US&append_to_response=videos`
      ),
      axios.get(
        `https://api.themoviedb.org/3/movie/${selectedMovie}/recommendations?api_key=${apiKey}&language=en-US`
      ),
      axios.get(
        `https://api.themoviedb.org/3/movie/${selectedMovie}/credits?api_key=${apiKey}&language=en-US`
      ),
    ]).finally(() => setLoading(false));
    setData({
      movieDetails: resp.data,
      similarMovies: similarResp.data.results,
      castCrew: castCrew.data.cast,
    });
  }, [selectedMovie, apiKey]);

  useEffect(() => {
    apiReq();
  }, [apiReq]);

  console.log("test","test")

  let hours = Math.trunc(data.movieDetails.runtime / 60);
  let minutes = data.movieDetails.runtime % 60;

  const [isPlay, setPlay] = useState(false);
  const [test, setTest] = useState(0);
  const [pos,setPos]=useState(0);

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
              backgroundColor: COLORS.transparentBlack,
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
              backgroundColor: COLORS.transparentBlack,
            }}
            onPress={() => console.log("Shared")}
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

  function renderHeaderSection() {
    return (
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w500${data.movieDetails.poster_path}`,
        }}
        resizeMode="cover"
        style={{
          width: "100%",
          height: SIZES.height < 700 ? SIZES.height * 0.6 : SIZES.height * 0.7,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          {/* {renderHeaderBar()} */}
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["transparent", "black"]}
              style={{
                width: "100%",
                height: 150,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
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
          </View>
        </View>
      </ImageBackground>
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
        <View onLayout={(event) => {
              const layout = event.nativeEvent.layout;
              setTest(layout.y+test);
              console.log("y2:", test);
            }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            {/* release date */}
            <View style={{ flex: 1 }}>
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                Release date:
              </Text>
              <Text style={{ color: COLORS.lightGray, ...FONTS.body3 }}>
                {data.movieDetails.release_date}
              </Text>
            </View>

            {/* duration */}
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: "right" }}>
                <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                  Duration:{"\n"}
                </Text>
                <Text style={{ color: COLORS.lightGray, ...FONTS.body3 }}>
                  {`${hours} hr ${minutes} min`}
                </Text>
              </Text>
            </View>
          </View>
          <Text></Text>

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
              setTest(layout.y+test);
              console.log("y3",test);
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

  function bookNowBtn() {
    return (
      <View>
        <TouchableOpacity
          style={{
            height: 60,
            width: "90%",
            alignItems: "center",
            alignSelf:"center",
            justifyContent: "center",
            marginBottom: Platform.OS === "ios" ? SIZES.padding * 2 : 0,
            backgroundColor: COLORS.primary,
            borderRadius: 15,
            position: "absolute",
            bottom: 0,
          }}
          onPress={()=>console.log("book")}
        >
          <View style={{flexDirection:"row"}}>
          <icons.fontAwesome 
          name="ticket"
          color="white"
          size={30}
          style={{}}/>

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

  function loadingScreen(){
    if(isLoading){
      return(<Loading
        size={50}
        isLoading={isLoading}
        style={{
          position: "absolute",
          alignSelf: "center", 
          backgroundColor: COLORS.transparentBlack,
          width: "100%",
          height: "100%",
        }}
      />);
    }
  }

  return (
    <>
      <ScrollView
        //contentContainerStyle={{flex: 3, backgroundColor: COLORS.black }}
        style={{ backgroundColor: COLORS.black }}
        onScroll={(event) => setPos(event.nativeEvent.contentOffset.y)}
      >
        {/* poster&name */}
        {renderHeaderSection()}
        {/* category&ratings */}
        {renderCategory()}

        {/* themoviedetails */}
        {renderMovieDetail()}
      </ScrollView>

      {/* button */}
      {bookNowBtn()}

      {loadingScreen()}

      {/* header bar */}
      {renderHeaderBar()}
    </>
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
