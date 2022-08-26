import React, { useRef, useEffect } from "react";
import {
  Animated,
  Text,
  TouchableNativeFeedback,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { theme, COLORS, SIZES, FONTS, icons } from "../constants";
import { AppIcon } from "../components";
import { ImageLoader } from "../components/GetStartAnimated";
import DeviceStorage from "../database/deviceStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetStarted = ({ navigation }) => {
  const {
    container,
    logoContainer,
    actionsContainer,
    welcomeContainer,
  } = styles;

  const [skipToken,setSkipToken]=React.useState("");
  getData()
  async function getData() {
    try {
      let value = await AsyncStorage.getItem("skipToken");
      if (value !== null) {
        setSkipToken(value);
        console.log("skipToken",value)
      }
    } catch (error) {
      console.log('## ERROR READING ITEM ##: ', error);
    }
  }


  function skip() {
    DeviceStorage.saveData("skipToken", "true");
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "Home",
        },
      ],
    });
  }

  return (
    <View style={container}>
      <View style={{ flex: 1 }}>
        <View style={logoContainer}>
          <ImageLoader source={AppIcon} />
        </View>
      </View>

      {skipToken=='true' ? (
        <></>
      ) : (
        <View
          style={{
            marginTop: Platform.OS === "ios" ? 40 : 20,
            position: "absolute",
            right: 0,
          }}
        >
          <TouchableOpacity
            onPress={skip}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 70,
              height: 40,
              borderRadius: 10,
              backgroundColor: COLORS.primary,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: COLORS.white, ...FONTS.h4 }}>SKIP</Text>
              <icons.ionicons
                name="play-skip-forward"
                size={20}
                color={COLORS.white}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ flex: 1 }}>
        <View style={welcomeContainer}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "gray", ...FONTS.h3 }}>
              Welcome to My Cinema Booking App
            </Text>
            <Text style={{ marginTop: 20, color: COLORS.white, ...FONTS.h1 }}>
              Get Started.
            </Text>
          </View>
        </View>

        <View style={actionsContainer}>
          <TouchableNativeFeedback
            onPress={() => navigation.push("SignIn")}
            background={TouchableNativeFeedback.Ripple("black")}
          >
            <View style={{ backgroundColor: COLORS.primary }}>
              <Text
                style={{
                  color: COLORS.black,
                  textAlign: "center",
                  ...FONTS.h2,
                  paddingVertical: 10,
                  borderRadius: 5,
                }}
              >
                Sign In
              </Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableOpacity onPress={() => navigation.push("SignUp")}>
            <Text
              style={{
                color: COLORS.white,
                textAlign: "center",
                ...FONTS.h2,
                paddingVertical: 10,
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 480,
  },
  welcomeContainer: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  actionsContainer: {
    alignSelf: "stretch",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
});

export default GetStarted;
