import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Image } from 'expo-image';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '../store/authStore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Keep the native splash screen visible while we render our custom animated one
SplashScreen.preventAutoHideAsync();

// Configure Google Sign-In safely (prevents instant crash in Expo Go)
try {
  GoogleSignin.configure({
    webClientId: '3465385813-36f6ur9geoqsslb28e4p5k08couk94v6.apps.googleusercontent.com',
  });
} catch (e) {
  console.log('GoogleSignin failed to configure (expected if running in Expo Go without native modules)');
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appReady, setAppReady] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const { isAuthenticated, role } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return; // Ensure Root Layout is mounted

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to location flow if not authenticated
      setTimeout(() => router.replace('/(auth)/location'), 1);
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect away from auth screens if authenticated
      if (role === 'provider') {
        setTimeout(() => router.replace('/(provider)/(tabs)'), 1);
      } else {
        setTimeout(() => router.replace('/(customer)/(tabs)'), 1);
      }
    }
  }, [isAuthenticated, segments, role, navigationState]);

  useEffect(() => {
    // Simulate loading resources (fonts, etc.)
    setTimeout(() => {
      // Hide the native static splash screen quickly
      SplashScreen.hideAsync();
      
      // Animate our custom splash screen to fade out
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setAppReady(true);
      });
    }, 1500); // Wait 1.5 seconds before starting fade out
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }} />
        
        {/* Animated Splash Screen Overlay */}
        {!appReady && (
          <Animated.View 
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: '#ffffff',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
              }
            ]}
          >
            <Image 
              source={require('../assets/images/splash-image.png')} 
              style={{ width: 200, height: 200 }} 
              contentFit="contain" 
            />
          </Animated.View>
        )}
        </View>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
