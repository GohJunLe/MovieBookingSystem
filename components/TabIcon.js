import React from "react"
import {
    View,
    Image,
} from "react-native"
import { COLORS, icons } from "../constants"

const TabIcon = ({ focused, icon }) => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <icons.ionicons name={icon} size={25} color={focused ? COLORS.primary : COLORS.gray}/>
        </View>
    )
}

export default TabIcon;