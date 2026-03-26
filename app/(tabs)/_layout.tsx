import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { Home, LayoutGrid, Plus, PlusCircleIcon, User } from 'lucide-react-native';

const PRIMARY = 'hsl(250, 100%, 64%)';
function JoinIcon({ focused }: { focused: boolean }) {
  return (
    <View className="w-12 h-12 rounded-full bg-violet-500 items-center justify-center -mt-2 shadow-md shadow-violet-400">
      <Text className="text-white text-xl font-bold">Q</Text>
    </View>
  );
}

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          borderTopWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
          height: 80,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 2,
        },
        tabBarActiveTintColor: PRIMARY,
        tabBarInactiveTintColor: '#9ca3af',
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <Home
              color={focused ? color : '#9ca3af'}
            />
          ),
        }}
      />

      {/* Library */}
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ focused, color }) => (
            <LayoutGrid
              color={focused ? color : '#9ca3af'}
            />
          ),
        }}
      />

      {/* Join - center button */}
      <Tabs.Screen
        name="join"
        options={{
          title: 'Join',
          tabBarIcon: ({ focused }) => <JoinIcon focused={focused} />,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
            color: '#9ca3af',
            marginTop: 2,
          },
        }}
      />

      {/* Create */}
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ focused, color }) => (
            <PlusCircleIcon
              color={focused ? color : '#9ca3af'}
            />
          ),
        }}
      />

      {/* Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color }) => (
            <User
              color={focused ? color : '#9ca3af'}
            />
          ),
        }}
      />
    </Tabs>
  );
}
