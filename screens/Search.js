import React from "react";
import NowPlayingScreen from "./NowPlayingScreen"
import UpcomingScreen from "./UpcomingScreen"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  View
} from "react-native";
import {
  icons,
  images,
  COLORS,
  SIZES
} from "../constants";

const Search = (navigation) => {
    const Tab = createMaterialTopTabNavigator();
    function renderHeader() {
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: SIZES.padding,
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 50,
              height: 50,
            }}
            onPress={() => console.log("profile")}
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
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 50,
              height: 50,
            }}
          >
            <Image
              source={icons.airplay}
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.primary,
              }}
            />
          </TouchableOpacity>
        </View>
      );
    }
  
    return (

        <SafeAreaView style={{
            backgroundColor: COLORS.black,
            width: "100%", height: "110%"
            }}>
            {renderHeader()}

          <Tab.Navigator 
                  screenOptions={{
                    headerShown: false,
                    tabBarStyle: { backgroundColor: 'black' },
                    tabBarLabelStyle: { fontSize: 16 },
                    activeTintColor: 'red',
                    inactiveTintColor: 'white',
                  }}
                  tabBarOptions={{
                    activeTintColor: 'red',
                    inactiveTintColor: 'white',
                }}
                  initialRouteName={'Now Showing'}
                
          >
            <Tab.Screen name="Now Showing" component = {NowPlayingScreen} />
            <Tab.Screen name="Upcoming Movie" component= {UpcomingScreen} />
          </Tab.Navigator>
          </SafeAreaView>
    );
  };
  
  export default Search;
