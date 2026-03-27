import React from 'react'
import { View } from 'react-native'

const LoadingScreen = () => {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <View className="flex-col gap-4 w-full flex items-center justify-center">
        <View
          className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
        >
          <View
            className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
          />
        </View>
      </View>
    </View>
  )
}

export { LoadingScreen }
