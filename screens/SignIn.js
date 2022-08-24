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
//import { TextInput } from "react-native-gesture-handler";
import { COLORS, SIZES, FONTS, icons } from "../constants";
import { AppIcon } from "../components";
import signInAuth from "../accountAuth/signIn_auth"
import HomeScreen from "../database/database_test";
import { HelperText, TextInput} from 'react-native-paper';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [passwordVisible, setPasswordVisible] = React.useState(false);

  React.useEffect(()=>{
    const controller = new AbortController();
    const signal = controller.signal;
    return () => controller.abort();

  },[])

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

  function signInTitle() {
    return (
      <View>
        <Text style={styles.title}>Welcome Back</Text>
      </View>
    );
  }

  // function emailInput() {
  //   return (
  //     <View style={styles.formContainer}>
  //       <icons.ionicons
  //         name="mail-outline"
  //         size={25}
  //         style={styles.textInputIcon}
  //       />

  //       <TextInput
  //         placeholder="Email"
  //         value={email}
  //         onChangeText={setEmail}
  //         keyboardType="email-address"
  //         style={{ color: COLORS.gray1, width: "80%" }}
  //       />
  //     </View>
  //   );
  // }

    function emailInput() {
    return (

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          underlineColor="transparent"
          activeUnderlineColor="black"
          left={<TextInput.Icon icon="email"/>}
          style={styles.formContainer}
        />
        
    );
  }

  // function passwordInput() {
  //   return (
  //     <View style={styles.formContainer}>
  //       <View style={styles.textInputIcon}>
  //         <icons.ionicons name="lock-closed-outline" size={25} />
  //       </View>

  //       <TextInput
  //         placeholder="Password"
  //         value={password}
  //         onChangeText={setPassword}
  //         secureTextEntry={!passwordVisible}
  //         keyboardType={passwordVisible ? "visible-password" : "default"}
  //         style={{ color: COLORS.gray1, width: "80%" }}
  //       />
  //     </View>
  //   );
  // }

  function passwordInput() {
    return (

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          underlineColor="transparent"
          activeUnderlineColor="black"
          left={<TextInput.Icon icon="lock"/>}
          right={<TextInput.Icon icon={passwordVisible ? "eye-off" : "eye"} forceTextInputFocus={false} onPress={() =>
            passwordVisible
              ? setPasswordVisible(false)
              : setPasswordVisible(true)
          }/>}
          secureTextEntry={!passwordVisible}
          keyboardType={passwordVisible ? "visible-password" : "default"}
          style={styles.formContainer}
        />
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
          onPress={result}
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

  function result(){
    if(signInAuth.validation(email,password)){
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Home',
          }, 
        ],
      })
    }else{
      console.log("Form NOT completed / WRONG email or password")
    }
    
  
    // <HomeScreen email="admin@gmail.com" password="12345678"/>

  }

  function createAcc() {
    return (
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity>
          <Text
            onPress={() => navigation.navigate("SignUp")}
            style={{ color: COLORS.white, ...FONTS.h3 }}
          >
            Don't have an account?
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
          {signInTitle()}
          <View style={{ height: 200 }}>
            <Image
              source={AppIcon}
              resizeMode="contain"
              style={{ width: 400, marginTop: -150 }}
            />
          </View>
          {emailInput()}

          {passwordInput()}
        </View>

        {/* <TouchableOpacity
          style={styles.passwordEye}
          onPress={() =>
            passwordVisible
              ? setPasswordVisible(false)
              : setPasswordVisible(true)
          }
        >
          <icons.ionicons
            name={passwordVisible ? "eye-off" : "eye"}
            size={25}
            color="black"
          />
        </TouchableOpacity> */}

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
    //paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "white",
    height: 55,
    //flexDirection: "row",

    //borderColor: "#e8e8e8",
    //borderWidth: 1,
    //borderRadius: 10,
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
