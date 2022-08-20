
const cinema_logo=require("../assets/icons/cinema_logo.png")
const cinema_logo_2=require("../assets/icons/cinema_logo_2.png")
const cinema_logo_3=require("../assets/icons/cinema_logo_3.png")
const cinemaLogo_horizontal=require("../assets/icons/cinemaLogo_horizontal.png")
const cinemaLogo_vertical=require("../assets/icons/cinemaLogo_vertical.png")
const left_arrow = require("../assets/icons/left-arrow.png");
const play = require("../assets/icons/play.png");
const right_arrow = require("../assets/icons/right-arrow.png");
const search = require("../assets/icons/search.png");
const star = require("../assets/icons/star.png");
const fire = require("../assets/icons/fire.png");
const upload = require("../assets/icons/upload.png");

import React from "react"
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const ionicons = ({ name, size, color, style, onPress }) => {
    return(
        <Ionicons name={name} size={size} color={color} style={style} onPress={onPress}/>
    );
}

const antDesign = ({ name, size, color, style, onPress}) => {
    return(
        <AntDesign name={name} size={size} color={color} style={style} onPress={{onPress}}/>
    );
}

const fontAwesome = ({ name, size, color, style, onPress}) => {
    return(
        <FontAwesome name={name} size={size} color={color} style={style} onPress={{onPress}}/>
    );
}

export default {
    cinema_logo,
    cinema_logo_2,
    cinema_logo_3,
    cinemaLogo_horizontal,
    cinemaLogo_vertical,
    left_arrow,
    play,
    right_arrow,
    search,
    star,
    fire,
    upload,
    ionicons,
    antDesign,
    fontAwesome
    
}