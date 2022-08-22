import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { Home,GetStarted } from "../screens"
import { COLORS } from "../constants"

import { TabIcon } from "../components"

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelPosition: "below-icon",
                style: {
                    backgroundColor: COLORS.black,
                    borderTopColor: "transparent",
                    height: 60
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon="home"
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Play"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon="play-circle"
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Search"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon="search"
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Profile"
                component={GetStarted}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon="person"
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;