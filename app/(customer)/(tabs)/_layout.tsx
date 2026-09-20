import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        tabBarActiveTintColor: '#0A2540', // Dark blue from the screenshot 
        tabBarInactiveTintColor: '#8A8A8A',
        headerShown: false, // We'll build custom headers on individual screens if needed
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home', 
          tabBarIcon: ({color}) => <Ionicons name="home" size={24} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="requests" 
        options={{ 
          title: 'Requests', 
          tabBarIcon: ({color}) => <Ionicons name="document-text-outline" size={24} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="chat" 
        options={{ 
          title: 'Chat', 
          tabBarIcon: ({color}) => <Ionicons name="chatbubble-outline" size={24} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Profile', 
          tabBarIcon: ({color}) => <Ionicons name="person-outline" size={24} color={color} /> 
        }} 
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingBottom: 10,
    paddingTop: 5,
    borderTopWidth: 1,
    borderColor: '#EAEAEA',
    backgroundColor: '#FFFFFF',
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
  }
});
