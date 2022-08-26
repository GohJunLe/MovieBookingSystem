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
import { icons, images, theme, COLORS, SIZES, FONTS, api } from "../constants";
import { Profiles, AppIcon, Loading } from "../components";
import axios from "axios";
const TransactionHistory = ({ navigation }) => {


  function renderHeader() {
    return (
      <View>
        <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 50,
                borderRadius: 20,
                backgroundColor: COLORS.transparentWhite,
                position:"absolute",
                marginTop: Platform.OS === "ios" ? 40 : 20,
                marginLeft: SIZES.padding,
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
        {/* title */}
        <View
          style={{
            alignItems: "center",
            marginTop: 25,
          }}
        >
         <Text style={{color: COLORS.white, ...FONTS.h2 }}>Transaction History</Text>
        </View>
      </View>
    );
  }

  const DATA = [
    {
      id: '1',
      title: 'First Item',
      isActive: true,
    },
    {
      id: '2',
      title: 'Second Item',
      isActive: true,
    },
    {
      id: '3',
      title: 'Third Item',
      isActive: false,
    },
    {
        id: '4',
        title: '4 Item',
        isActive: false,

      },
  ];

  function renderContent() {
    return (
      <View style={{ marginTop: SIZES.padding, marginBottom:60 }}>
        {/* list */}
        <FlatList
          data={DATA}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <TouchableHighlight
                // onPress={() =>
                //   navigation.navigate("MovieDetail", { selectedMovie: item.id, currentDate:currentDate })
                // }
              >
                <ImageBackground
                source={images.ticket_background}
                resizeMode="contain"
                style={{
                    //marginVertical:5,
                    //marginHorizontal:"5%",
                    height:200
                    //backgroundColor:COLORS.transparentWhite
                  }}
                
                >
                <View style={{
                      marginTop: 30,
                      marginLeft: 30,
                      width: SIZES.width / 3,
                      backgroundColor:COLORS.transparentBlack
                    }}>
  
                  {/* name */}
                  <Text
                    style={{
                        color:"black",
                      //marginTop: 30,
                      ...FONTS.h4,
                      width: SIZES.width / 3,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                        color:"black",
                      backgroundColor:item.isActive?"green":"red",
                      ...FONTS.h4,
                      width: SIZES.width / 3,
                    }}
                  >
                    {item.isActive?"Active":"Expired"}
                  </Text>
                </View>
                </ImageBackground>
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
       {renderContent()}
      
    </View>
  );
};

export default TransactionHistory;
