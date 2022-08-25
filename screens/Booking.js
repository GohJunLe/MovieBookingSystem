import React, { Component, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    ScrollView,
    FlatList,
    TouchableOpacity,
  } from "react-native";

import { COLORS, SIZES, FONTS, icons } from "../constants";
import {Options} from '../components';
import moment from 'moment';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);

const Booking = ({ route, navigation }) => {
      
    const { selectedMovie  } = route.params
    const [chosenDay, setChosenDay] = useState(null)
    const [chosenTime, setChosenTime] = useState(null)
    const [chosenLocation, setChosenLocation] = useState(null)

    const days = ["Today", "Tomorrow", moment().add(2, 'days').format('ddd, MMM D')]
    const times = ["17:00", "18:00", "19:00"]
    const locations = ["1st Avenue", "Kepong", "Rawang"]

    return(
      
        <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          paddingTop: SIZES.padding,
          justifyContent: "space-around",
          backgroundColor: COLORS.black
        }}
        >     
        <ScrollView style={{marginBottom: 100,}}>
              <View style = {{
                
                flexDirection: 'column',
                alignItems: 'center'
              }}>

              <Image
                source={{uri: "https://image.tmdb.org/t/p/w500"+selectedMovie.poster_path,}}
                resizeMode="cover"
                style={{
                  width: SIZES.width / 3,
                  height: SIZES.width / 3 + 60,
                  borderRadius: 20, 
                }}
              />
              <Text style={{ color: COLORS.white, ...FONTS.h2, flex: 0, alignItems: 'center', paddingTop: 20 }}>
                {selectedMovie?.title}
              </Text>
                <Text style={{ color: COLORS.white, ...FONTS.h2, flex: 0, alignItems: 'center', paddingTop: 20  }}>
                {getGenre(selectedMovie?.genres)}
              </Text>
              </View>

              <View >     
              <Text style={{color: COLORS.white, ...FONTS.h3,}}>
                Day
                </Text>        
              <Options           
                values={days}
                chosen={chosenDay}
                onChoose={onChooseDay}
                /> 
              </View>
              <View>
                <Text style={{color: COLORS.white, ...FONTS.h3,}}>
                  Date
                </Text>
                <Options
                values={times}
                chosen={chosenTime}
                onChoose={onChooseTime}
                />   
                </View> 
                <View>  
                  <Text style={{color: COLORS.white, ...FONTS.h3,}}>
                    Location
                    </Text>                 
                <Options
                
                values={locations}
                chosen={chosenLocation}
                onChoose={onChooseLocation}
                />                             
                </View>
                <View>  
                  <Text style={{color: COLORS.white, ...FONTS.h3,}}>
                    Location
                    </Text>                 
                <Options
                
                values={locations}
                chosen={chosenLocation}
                onChoose={onChooseLocation}
                />                             
                </View>
                <View>  
                  <Text style={{color: COLORS.white, ...FONTS.h3,}}>
                    Location
                    </Text>                 
                <Options
                
                values={locations}
                chosen={chosenLocation}
                onChoose={onChooseLocation}
                />                             
                </View>
            </ScrollView>                 
                  
          <View>
          <TouchableOpacity
            style={{
            height: 60,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: Platform.OS === "ios" ? SIZES.padding * 2 : 0,
            backgroundColor: COLORS.primary,
            borderRadius: 15,
            position: "absolute",
            bottom: 20,
            }}    

            onPress={() =>
              console.log
            }                    
          >                        
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
            }}
          >
            Book Now
          </Text>               
          </TouchableOpacity>     
          </View>
        </View>  
                                                                                  
    );
    

    function getGenre(movieGenre) {
        if (movieGenre != null) {
          var genres = [];
          for (var i = 0; i < 2 && i < movieGenre.length; i++) {
            genres.push(movieGenre[i].name);
          }
          return genres.join(", ");
        }
      }

    function onChooseTime(time) {
        setChosenTime(time)        
    }
    function onChooseDay(day){
        setChosenDay(day)        
    } 
    function onChooseLocation(location){
      setChosenLocation(location)      
    }
    

};


export default Booking
