import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import "@/global.css"
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, Text, View } from "react-native"


// This is a layout file for the tabs in the app. It defines the structure and behavior of the tab navigation.
// This is just an example of resuability
/* 
const TabIcon = () => {
    return (
    <ImageBackground source={images.highlight}
                            className="flex flex-row w-full flex-1 min-w-28 min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden"
                        >
                                <Image source={icons.home}
                                    tintColor="#151312" className="size-5"
                                />
                                <Text className="text-secondary text-base font-semibold ml-2">Home</Text>
                        </ImageBackground>
    )
}*/
const TabIcon = ({ focused, icons, title }: any) => {
    if(focused) {
    return (
        <ImageBackground source={images.highlight}
                            className="flex flex-row flex-1 min-w-[112px] min-h-13 mt-4 justify-center items-center rounded-full overflow-hidden"
                        >
                        <Image source={icons} tintColor="#FFFFFF" className="size-5"/>
                        <Text className="text-secondary text-base font-semibold ml-2">{title}</Text>
        </ImageBackground>
    )}

    return (
        <View className="size-full justify-center items-center mt-4 rounded-full">
            <Image source={icons} tintColor="#A8B5DB" className="size-5" />
        </View>
    )
}
const _layout = () => {
  return (
        <Tabs screenOptions={{tabBarShowLabel: false, 
            tabBarItemStyle: {
                width: '100%',
                height: "100%",
                justifyContent: 'center',
                alignItems: 'center'
            },
            tabBarStyle: {
                backgroundColor: '#FFFFFF',
                borderRadius: 50,
                marginHorizontal: 20,
                marginBottom: 50,
                height: 52,
                position: 'absolute',
                overflow: 'hidden',
                borderWidth: 1,
            },
            
        }} >
            <Tabs.Screen name="index" options={{ title: "Home", headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icons={icons.home} title="Home" />
                )
             }} />
            <Tabs.Screen name="insights" options={{ title: "Insights", headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icons={icons.activity} title="Insights" />
                )
             }} />
            <Tabs.Screen name="subscriptions" options={{ title: "Calendar", headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icons={icons.calendar} title="Insights" />
                )
             }} />
        </Tabs>
  )
}

export default _layout