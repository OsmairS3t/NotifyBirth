import { Tabs } from 'expo-router/tabs';
import { MaterialIcons } from '@expo/vector-icons'

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
         headerStyle: {
          backgroundColor: '#000000',
         },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#d6a65d',
        tabBarInactiveBackgroundColor: '#FF9900',
        tabBarActiveBackgroundColor: '#FF9900',
        tabBarStyle: {
            height: 70,
            backgroundColor: '#FF9900',
        },
      }}
    >
      <Tabs.Screen
        name="cadastro"
        options={{
          title: "",
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="app-registration" size={32} color={color} />
        )
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="home" size={32} color={color} />
        )
        }}
      />

      <Tabs.Screen
        name="lista"
        options={{
          title: "",
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="list" size={32} color={color} />
        )
        }}
      />
    </Tabs>
  );
}