import { Stack } from 'expo-router';

export default function CustomerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="category/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="profile/personal-info" options={{ title: 'Personal Information', headerShown: true }} />
      <Stack.Screen name="profile/addresses" options={{ title: 'Saved Addresses', headerShown: true }} />
      <Stack.Screen name="profile/payment" options={{ title: 'Payment Methods', headerShown: true }} />
      <Stack.Screen name="profile/notifications" options={{ title: 'Notifications', headerShown: true }} />
      <Stack.Screen name="profile/language" options={{ title: 'Language', headerShown: true }} />
      <Stack.Screen name="profile/help" options={{ title: 'Help Center', headerShown: true }} />
      <Stack.Screen name="profile/privacy" options={{ title: 'Privacy Policy', headerShown: true }} />
      {/* 
      <Stack.Screen name="service" options={{ title: 'Service Details', headerShown: true }} />
      <Stack.Screen name="booking" options={{ title: 'Book Service', headerShown: true }} />
      */}
    </Stack>
  );
}
