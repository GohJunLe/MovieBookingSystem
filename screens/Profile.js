import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableNativeFeedback,
  Dimensions,
  Share,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Avatar } from "react-native-paper";

import { COLORS, SIZES, FONTS, icons, api, images } from "../constants";
import { List, Divider } from "react-native-paper";

import { Loading } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceStorage from "../database/deviceStorage";

const Profile = ({ navigation }) => {
  const [signInToken, setSignInToken] = React.useState("");

  function logout() {
    DeviceStorage.saveData("signInToken", "false");
  }

  return (
    <View>
      {/* <View style={{flex:1}}> */}
      <Image
        source={images.profile_background}
        resizeMode="contain"
        style={{
          height: "27%",
          alignSelf: "center",
          ///flex:1
        }}
      />


      <View
        style={{
          backgroundColor: COLORS.black,
          height: "100%",
          paddingTop: "18%",
        }}
      >
        <Text
          style={{
            color: "white",
            ...FONTS.h1,
            alignSelf: "center",
            marginBottom: 50,
          }}
        >
          Username
        </Text>

        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(COLORS.primary)}
        >
          <View
            style={{
              backgroundColor: COLORS.black,
              paddingVertical: 10,
              paddingHorizontal: 20,
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 2 }}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h2,
                }}
              >
                View Profile
              </Text>
            </View>
            <View style={{ flex: 1 ,alignSelf:"center"}}>
              <icons.ionicons
                name="person"
                size={28}
                color="white"
                style={{ alignSelf: "flex-end" }}
              />
            </View>
          </View>
        </TouchableNativeFeedback>
        <View style={{ borderBottomColor: "gray", borderBottomWidth: 1 }} />

        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(COLORS.primary)}
          onPress={()=>navigation.push("TransactionHistory")}
        >
          <View
            style={{
              backgroundColor: COLORS.black,
              paddingVertical: 10,
              paddingHorizontal: 20,
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 2}}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h2,
                }}
              >
                Transaction History
              </Text>
            </View>
            <View style={{ flex: 1 ,alignSelf:"center"}}>
              <icons.fontAwesome
                name="history"
                size={28}
                color="white"
                style={{ alignSelf: "flex-end" }}
              />
            </View>
          </View>
        </TouchableNativeFeedback>
        <View style={{ borderBottomColor: "gray", borderBottomWidth: 1 }} />
      </View>

      <Avatar.Image
        size={150}
        source={images.profile_photo}
        style={{ position: "absolute", alignSelf: "center", top: "15%" }}
      />
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

export default Profile;
