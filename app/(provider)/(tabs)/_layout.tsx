import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export default function ProviderTabsLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        tabBarActiveTintColor: '#5CE1E6', // Bright cyan from the mock
        tabBarInactiveTintColor: '#8A8A8A',
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen 
        name="requests" 
        options={{ 
          title: 'Requests', 
          tabBarIcon: ({color}) => <Ionicons name="clipboard-outline" size={24} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'My Jobs', 
          tabBarIcon: ({color}) => <Ionicons name="briefcase-outline" size={24} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="earnings" 
        options={{ 
          title: 'Earnings', 
          tabBarIcon: ({color}) => <Ionicons name="cash-outline" size={24} color={color} /> 
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
