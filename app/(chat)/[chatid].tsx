import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const Page = () => {
    const {chatid} = useLocalSearchParams()
    console.log(chatid);
  return (
    <View>
      <Text>Page</Text>
    </View>
  )
}

export default Page

