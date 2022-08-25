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
import DeviceStorage from "../database/deviceStorage";

function validation(email, password) {
  const emailRegex = new RegExp(
    "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
  );
  const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,50})");

  let emailToken = false;
  let passwordToken = false;

  if (emailRegex.test(email) && email.length != 0) {
    emailToken = true;
  }

  if (passwordRegex.test(password) && password.length != 0) {
    passwordToken = true;
  }

  if (emailToken && passwordToken) {
    return true;
  } else {
    return false;
  }
}

export default { validation };
