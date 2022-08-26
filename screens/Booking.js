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
import {Options, Cinema, Seats} from '../components';

import moment from 'moment';
import { LogBox } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified.']);


const Booking = ({ route, navigation }) => {
      
    const { selectedMovie  } = route.params
    const [chosenDay, setChosenDay] = useState(null)
    const [chosenTime, setChosenTime] = useState(null)
    const [chosenLocation, setChosenLocation] = useState(null)
    const [date, setDate] = useState(new Date())
    const today = new Date();
  let currentDate = "";
  let endDate = "";
  if (today.getMonth() + 1 < 10) {
    currentDate =
      today.getFullYear() +
      "-0" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    endDate = 
    today.getFullYear() +
    "-0" +
    (today.getMonth() + 2) +
    "-" +
    today.getDate();

  } else {
    currentDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    endDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 2) +
      "-" +
      today.getDate();
  }

    
    const times = ["10:00", "14:00", "18:00", "22:00"]
    const locations = ["1st Avenue", "Kepong", "Rawang", "Mines"]

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

              <View>
                <Text style={{color: COLORS.white, ...FONTS.h3,}}>
                  Date
                </Text> 
              <DatePicker 
              onSelectedChange={setDate} 
              options={{
                backgroundColor: COLORS.transparentBlack,
                textHeaderColor: '#FFA25B',
                textDefaultColor: '#F6E7C1',
                selectedTextColor: '#fff',
                mainColor: COLORS.primary,
                textSecondaryColor: '#D6C7A1',
              }}
              current = {currentDate}
              minimumDate={currentDate}
              maximumDate={endDate}
              mode="calendar"
              />
              </View> 
              <View>
                <Text style={{color: COLORS.white, ...FONTS.h3,}}>
                  Time
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
                
                {<View>
                  <Text style={{color: COLORS.white, ...FONTS.h3,}}>
                    Seat
                  </Text>  
                 
                  <Seats/>
                </View>}
                  
                  
                                  
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
