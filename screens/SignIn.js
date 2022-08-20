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

const SignIn = ({navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  // console.log("previousScreen:"+route.params.previousScreen);
  function backBtn() {
    return (
      <View
        style={{
          marginTop: Platform.OS === "ios" ? 40 : 20,
          paddingHorizontal: SIZES.padding
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

  function signInTitle() {
    return (
      <View>
        <Text style={styles.title}>Welcome Back</Text>
      </View>
    );
  }

  function emailInput() {
    return (
      <View style={styles.formContainer}>
        <icons.ionicons
          name="mail-outline"
          size={25}
          style={styles.textInputIcon}
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={{ color: COLORS.gray1, width: "80%" }}
        />
      </View>
    );
  }

  function passwordInput() {
    return (
      <View style={styles.formContainer}>
        <View style={styles.textInputIcon}>
          <icons.ionicons name="lock-closed-outline" size={25} />
        </View>

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
          keyboardType={passwordVisible ? "visible-password" : "default"}
          style={{ color: COLORS.gray1, width: "80%" }}
        />
      </View>
    );
  }

  function forgotPassword() {
    return (
      <View style={{ marginRight: 50 }}>
        <TouchableOpacity>
          <Text
            onPress={() => console.log("Forgot password")}
            style={{ color: COLORS.white, textAlign: "right" }}
          >
            Forgot password?
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function signInBtn() {
    return (
      <View style={{ width: "80%", marginTop: 20 }}>
        <TouchableOpacity
          style={{
            height: 60,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.primary,
            borderRadius: 0,
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function createAcc() {
    return (
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity>
          <Text
            onPress={() => console.log("Create account")}
            style={{ color: COLORS.white, ...FONTS.h3 }}
          >
            Create an account
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: COLORS.black }} >
      {backBtn()}
      <View style={styles.container}>
        <View style={{ alignItems: "center"}}>
          {signInTitle()}
          <View style={{height:200}}>
            <Image
              source={AppIcon}
              resizeMode="contain"
              style={{ width: 400, marginTop:-150}}
            />
          </View>
          {emailInput()}

          {passwordInput()}
        </View>

        <View style={styles.passwordEye}>
          <icons.ionicons
            name={passwordVisible ? "eye-off" : "eye"}
            size={25}
            color="black"
            onPress={() =>
              passwordVisible
                ? setPasswordVisible(false)
                : setPasswordVisible(true)
            }
          />
        </View>

        {forgotPassword()}
        <View style={{ alignItems: "center" }}>
          {signInBtn()}
          {createAcc()}
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
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "white",
    height: 50,
    flexDirection: "row",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 10,
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

export default SignIn;
