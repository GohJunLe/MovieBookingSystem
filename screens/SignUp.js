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
  Alert,
} from "react-native";
import React from "react";
import { COLORS, SIZES, FONTS, icons } from "../constants";
import { AppIcon } from "../components";
import signUpAuth from "../accountAuth/signUp_auth";
import DeviceStorage from "../database/deviceStorage";
import { HelperText, TextInput, IconButton } from "react-native-paper";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [passwordVisible, setPasswordVisible] = React.useState(false);

  function backBtn() {
    return (
      <View
        style={{
          marginTop: Platform.OS === "ios" ? 40 : 20,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            borderRadius: 20,
            backgroundColor: COLORS.transparentWhite,
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
      </View>
    );
  }

  function signUpTitle() {
    return (
      <View>
        <Text style={styles.title}>Create Account</Text>
      </View>
    );
  }

  function emailInput() {
    return (
      // <View style={styles.formContainer}>
      //   <icons.ionicons
      //     name="mail-outline"
      //     size={25}
      //     style={styles.textInputIcon}
      //   />

      //   <TextInput
      //     placeholder="Email"
      //     value={email}
      //     onChangeText={setEmail}
      //     keyboardType="email-address"
      //     style={{ color: COLORS.gray1, width: "80%" }}
      //   />
      // </View>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        underlineColor="transparent"
        activeUnderlineColor="black"
        left={<TextInput.Icon icon="email" />}
        style={styles.formContainer}
      />
    );
  }

  function passwordInput() {
    return (
      <View style={{width: "100%"}}>
        <View style={{alignItems:"center" }}>
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            underlineColor="transparent"
            activeUnderlineColor="black"
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon
                icon={passwordVisible ? "eye-off" : "eye"}
                forceTextInputFocus={false}
                onPress={() =>
                  passwordVisible
                    ? setPasswordVisible(false)
                    : setPasswordVisible(true)
                }
              />
            }
            secureTextEntry={!passwordVisible}
            keyboardType={passwordVisible ? "visible-password" : "default"}
            style={styles.formContainer}
          />
        </View>
        <View style={{width:"80%",alignSelf:"center",height:20}}>
          <IconButton
            icon="information"
            color={COLORS.white}
            size={20}
            onPress={() => Alert.alert(
              "Password format",
              "Password must contain at least\n-1 lowercase alphabetical character\n-1 uppercase alphabetical character\n-1 numeric character\n-8 characters up to 50",
              [
                {
                  text: "OK",
                  style: "default",
                },
              ]
            )}
            style={{ alignSelf: "flex-end",marginTop:0}}
          />
        </View>
      </View>
    );
  }

  function signUpBtn() {
    return (
      <View style={{ width: "80%", marginTop: 20 }}>
        <TouchableOpacity
          onPress={result}
          style={{
            height: 60,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.primary,
            borderRadius: 0,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function result() {
    if (signUpAuth.validation(email, password)) {
      DeviceStorage.saveData("signIn2", "false");
      navigation.navigate("SignIn");
    } else {
      Alert.alert(
        "Form NOT completed / INVALID email or password",
        "Email must have '@' and '.'\nPassword must follow the password format(Click the info button under the eye)",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
    }
  }

  function signIn() {
    return (
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
            Already have an account?
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: COLORS.black }}>
      {backBtn()}
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          {signUpTitle()}
          <View style={{ height: 200 }}>
            <Image
              source={AppIcon}
              resizeMode="contain"
              style={{ width: 400, marginTop: -150 }}
            />
          </View>
          {emailInput()}

          {passwordInput()}

          {signUpBtn()}

          {signIn()}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    height: "100%",
  },
  title: {
    color: COLORS.white,
    ...FONTS.h1,
  },
  formContainer: {
    width: "80%",
    marginVertical: 5,
    backgroundColor: "white",
    height: 50,
  },
  textInputIcon: {
    marginRight: 5,
    paddingTop: 10,
    paddingRight: 8,
    borderRightWidth: 1,
    borderRightColor: "gray",
  },
  passwordEye: {
    position: "absolute",
    marginTop: 313,
    marginLeft: "82%",
  },
});

export default SignUp;
