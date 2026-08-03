import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="location" />
      <Stack.Screen name="manual-location" />
      <Stack.Screen name="login" />
      <Stack.Screen name="provider-login" />
      <Stack.Screen name="verify-otp" />
      <Stack.Screen name="register" />
      <Stack.Screen name="complete-profile" />
      <Stack.Screen name="account-ready" />
    </Stack>
  );
}
