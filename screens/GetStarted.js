import React, { useRef, useEffect } from 'react';
import {Animated, Text,TouchableNativeFeedback,Button,View, StyleSheet, SafeAreaView,Image ,TouchableOpacity} from 'react-native';
import {
    theme,
    COLORS,
    SIZES,
    FONTS,
    icons
  } from "../constants";
  import {AppIcon} from "../components";
  import {ImageLoader} from "../components/GetStartAnimated"

const GetStarted = ({ navigation }) => {
  const {
    container,
    logoContainer,
    actionsContainer,
    welcomeContainer,
  } = styles;

  return (
      <SafeAreaView style={container}>
        {/* <View style={{
          marginTop: Platform.OS === "ios" ? 40 : 20,
          paddingHorizontal: SIZES.padding,
          position: "absolute"}}>
        <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 50,
              height: 50,
              borderRadius: 20,
              backgroundColor: COLORS.transparentWhite,
            }}
            onPress={() => navigation.navigate("SignIn")}
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
        </View> */}
        <View style={{ flex: 1}}>
          <View style={logoContainer}>
            <ImageLoader source={AppIcon}/>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={welcomeContainer}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color:"gray", ...FONTS.h3}}>Welcome to My Cinema Booking App</Text>
              <Text style={{ marginTop: 20,color:COLORS.white, ...FONTS.h1 }}>
                Get Started.
              </Text>
            </View>
          </View>
          <View style={actionsContainer}>
            <TouchableNativeFeedback 
            onPress={() => navigation.push("SignIn")}
            background={TouchableNativeFeedback.Ripple('black')}>
                <View style={{backgroundColor:COLORS.primary}}>
              <Text style={{color: COLORS.black,textAlign:"center",...FONTS.h2,paddingVertical:10, borderRadius: 5}}>
            Sign In</Text></View>
              </TouchableNativeFeedback>

            <TouchableNativeFeedback
            onPress={() => navigation.push("SignUp")}>
              <Text
            style={{ color: COLORS.white, textAlign:"center", ...FONTS.h2, paddingVertical:10}}
          >
            Sign Up</Text>
              </TouchableNativeFeedback>

          </View>
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop:450
  },
  welcomeContainer: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsContainer: {
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    marginBottom:30
  },
});

export default GetStarted;
