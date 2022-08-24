import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Button,
    Keyboard,
  } from "react-native";
  import React from "react";
  import { TextInput } from "react-native-gesture-handler";
  import { COLORS, SIZES, FONTS, icons } from "../constants";
  import { AppIcon } from "../components";
  import DeviceStorage from "../database/deviceStorage"

    function validation(email,password){

      if(email=="admin@gmail.com"&&password=="123"){
        DeviceStorage.saveData("signIn",true)
        return true;
      }
      else
      return false;
    }


  export default {validation};

