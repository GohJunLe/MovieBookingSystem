import React from "react";
import { MovieDetail, SignIn,SignUp, GetStarted } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./navigation/tabs";
import DeviceStorage from "./database/deviceStorage";

const Stack = createStackNavigator();

const App = () => {

  // if(DeviceStorage.getData("signIn")==null){
   DeviceStorage.saveData("signIn",false)
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Home"}
      >
        <Stack.Screen name="Home" component={Tabs} />

        <Stack.Screen name="MovieDetail" component={MovieDetail} />

        <Stack.Screen name="GetStarted" component={Tabs} />

        <Stack.Screen name="SignIn" component={SignIn} />

        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
};

export default App;
