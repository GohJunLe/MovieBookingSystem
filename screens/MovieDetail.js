import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
//import {TMDB_API} from '@env';

import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SIZES, FONTS, icons} from '../constants';

const MovieDetail = ({route, navigation}) => {
  const {selectedMovie} = route.params;

  const [data, setData] = useState({
    movieDetails: [],
    similarMovies: [],
    castCrew: [],
  });
  const apiKey = "024d69b581633d457ac58359146c43f6";
  const apiReq = useCallback(async () => {
    const [resp, similarResp, castCrew] = await Promise.all([
      axios.get(
        `https://api.themoviedb.org/3/movie/${selectedMovie}?api_key=${apiKey}&language=en-US`,
      ),
      axios.get(
        `https://api.themoviedb.org/3/movie/${selectedMovie}/recommendations?api_key=${apiKey}&language=en-US`,
      ),
      axios.get(
        `https://api.themoviedb.org/3/movie/${selectedMovie}/credits?api_key=${apiKey}&language=en-US`,
      ),
    ]);
    setData({
      movieDetails: resp.data,
      similarMovies: similarResp.data.results,
      castCrew: castCrew.data.cast,
    });
  }, [selectedMovie, apiKey]);

  useEffect(() => {
    apiReq();
  }, [apiReq]);

  let hours = Math.trunc(data.movieDetails.runtime / 60);
  let minutes = data.movieDetails.runtime % 60;

  function renderHeaderBar() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: Platform.OS === 'ios' ? 40 : 20,
          paddingHorizontal: SIZES.padding,
          position: 'absolute',
        }}>
        {/* back */}
        <View style={{flex:1}}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            height: 50,
            borderRadius: 20,
            backgroundColor: COLORS.transparentBlack,
          }}
          onPress={() => navigation.goBack()}>
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
        <View style={{flex:1, flexDirection: 'row-reverse'}}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            height: 50,
            borderRadius: 20,
            textAlign:"Right",
            backgroundColor: COLORS.transparentBlack,
          }}
          onPress={() => console.log('Shared')}>
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
          width: '100%',
          height: SIZES.height < 700 ? SIZES.height * 0.6 : SIZES.height * 0.7,
        }}>
        <View
          style={{
            flex: 1,
          }}>
          {/* {renderHeaderBar()} */}
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={['transparent', 'black']}
              style={{
                width: '100%',
                height: 150,
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              {/* season
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.body4,
                    }}
                  >
                    {selectedMovie?.details?.season}
                  </Text> */}

              {/* name */}
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h1,
                  marginTop: SIZES.base,
                }}>
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
          flexDirection: 'row',
          marginTop: SIZES.base,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* age */}
        <View style={[styles.categoryContainer, {marginLeft: 0}]}>
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
            }}>
            {popularity + 'K'}
          </Text>
        </View>

        {/* genre */}
        <View
          style={[
            styles.categoryContainer,
            {paddingHorizontal: SIZES.padding},
          ]}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h4,
            }}>
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
            }}>
            {data.movieDetails.vote_average}
          </Text>
        </View>
      </View>
    );
  }

  function getGenre(movieGenre){
    if(movieGenre!=null){
        var genres=[];
        for(var i=0;i<2 && i<movieGenre.length;i++){
            genres.push(movieGenre[i].name);
        }
    return genres.join(', ');
    }
  }

  function renderMovieDetail() {

    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.padding,
          justifyContent: 'space-around',
        }}>
        {/* content */}
        <View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            {/* release date */}
            <View style={{flex: 1}}>
              <Text>
                <Text style={{color: COLORS.white, ...FONTS.h4}}>
                  Release date:
                </Text>
                <Text style={{color: COLORS.lightGray, ...FONTS.body4}}>
                  {' ' + data.movieDetails.release_date}
                </Text>
              </Text>
            </View>
            {/* duration */}
            <View style={{flex: 1}}>
              <Text style={{textAlign:"right"}}>
                <Text style={{color: COLORS.white, ...FONTS.h4}}>
                  Duration:
                </Text>
                <Text style={{color: COLORS.lightGray, ...FONTS.body4}}>
                  {` ${hours} hr ${minutes} min`}
                </Text>
              </Text>
            </View>
          </View>

          {/* overview */}
          <View
            style={{
              flexDirection: 'column',
            }}>
            <Text style={{color: COLORS.white, ...FONTS.h4}}>Overview</Text>
            <Text style={{color: COLORS.lightGray, ...FONTS.body4}}>
              {data.movieDetails.overview}
            </Text>
            <Text style={{...FONTS.h1}}>{'\n'}</Text>
          </View>
        </View>
      </View>
    );
  }

  function bookNowBtn() {
    return (
      <View>
        <TouchableOpacity
          style={{
            height: 60,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: Platform.OS === 'ios' ? SIZES.padding * 2 : 0,
            backgroundColor: COLORS.primary,
            borderRadius: 15,
            position: 'absolute',
            bottom: 0,
          }}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
            }}>
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        //contentContainerStyle={{flex: 3, backgroundColor: COLORS.black }}
        style={{backgroundColor: COLORS.black}}>
        {/* header */}
        {renderHeaderSection()}
        {/* category&ratings */}
        {renderCategory()}

        {/* themoviedetails */}
        {renderMovieDetail()}
      </ScrollView>

      {renderHeaderBar()}

      {/* button */}
      {bookNowBtn()}
    </>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SIZES.base,
    paddingHorizontal: SIZES.base,
    paddingVertical: 3,
    borderRadius: SIZES.base,
    backgroundColor: COLORS.gray1,
  },
});

export default MovieDetail;
