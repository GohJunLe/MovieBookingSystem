import React from "react";
import { ActivityIndicator } from "react-native";
import { COLORS } from "../constants";

const Loading=({size,isLoading,style})=>{
    return(
        <ActivityIndicator color={COLORS.primary} size={size} animating={isLoading} style={style}/>
    );
}

export default Loading;