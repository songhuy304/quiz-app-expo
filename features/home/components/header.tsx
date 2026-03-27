import { Logo } from '@/components/logo'
import { Text } from '@/components/ui'
import { Bell, Search } from 'lucide-react-native'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

const Header = () => {
  return (
    <View className="flex-row items-center justify-between pb-4">
      <View className="flex-row items-center gap-2">
        <Logo width={40} height={30} color="#6647FF" />
      </View>
      <View className="flex-row items-center gap-4">
        <TouchableOpacity>
          <Search size={22} color="#374151" strokeWidth={1.8} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Bell size={22} color="#374151" strokeWidth={1.8} />
        </TouchableOpacity>
      </View>
    </View>

  )
}

export { Header }
