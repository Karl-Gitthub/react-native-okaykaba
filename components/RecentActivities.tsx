import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const RecentActivities = ({name, price, icon}:UpcomingSubscription) => {
  return (
    <TouchableOpacity className="upcoming-card">
      <View className="upcoming-row">
        <Image source={icon} className="upcoming-icon"/>
      </View>
      <Text className="upcoming-name">{name}</Text>
    </TouchableOpacity>
  )
}

export default RecentActivities