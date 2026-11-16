import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const listheading = ({title}: ListHeadingProps) => {
  return (
    <View className="list-head">
      <Text className="list-title">{title}</Text>

      <TouchableOpacity className="list-action" disabled accessibilityLabel="See all is not implemented yet">
        <Text className="list-action-text">Coming soon</Text>
      </TouchableOpacity>

      
    </View>
  )
}

export default listheading