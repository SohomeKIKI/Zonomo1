import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { useAuthStore } from '../../store/authStore';

export default function AccountReadyScreen() {
  const router = useRouter();
  const login = useAuthStore(state => state.login);
  const user = useAuthStore(state => state.user);

  const handleContinue = () => {
    // Set authentication state. The user object is already in the store via updateUser.
    login('mock-token', 'customer', user || undefined);
    // Navigate to the main customer interface
    router.replace('/(customer)/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={100} color="#00796B" />
        </View>
        
        <Text style={styles.title}>Account Ready!</Text>
        <Text style={styles.subtitle}>
          Your profile has been created successfully. You are all set to start exploring local services.
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={styles.primaryBtn}
          onPress={handleContinue}
        >
          <Text style={styles.primaryBtnText}>Go to Home</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    marginBottom: 24,
    shadowColor: '#00796B',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
    backgroundColor: '#F9FBFF',
    borderRadius: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0A1C3B',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#5C6B81',
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  primaryBtn: {
    backgroundColor: '#00796B',
    height: 54,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
