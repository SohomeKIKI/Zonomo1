import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Image } from 'expo-image';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '../store/authStore';

// Keep the native splash screen visible while we render our custom animated one
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appReady, setAppReady] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const { isAuthenticated, role } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!appReady) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to location flow if not authenticated
      router.replace('/(auth)/location');
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect away from auth screens if authenticated
      if (role === 'provider') {
        router.replace('/(provider)/(tabs)');
      } else {
        router.replace('/(customer)/(tabs)');
      }
    }
  }, [isAuthenticated, segments, role, appReady]);

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
