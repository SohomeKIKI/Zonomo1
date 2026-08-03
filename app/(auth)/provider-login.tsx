import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image } from 'expo-image';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function ProviderLoginScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendCode = () => {
    if (phoneNumber.trim().length < 10) return;
    // Pass role and phone to verify-otp
    router.push({
      pathname: '/(auth)/verify-otp',
      params: { phone: phoneNumber, role: 'provider' }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.providerBadge}>
              <Text style={styles.providerBadgeText}>PRO</Text>
            </View>
            <Image 
              source={require('../../assets/images/LOGO.png')}
              style={styles.logo}
              contentFit="contain"
            />
            <Text style={styles.brandName}>ZONOMO</Text>
            <Text style={styles.welcomeText}>Provider Portal</Text>
            <Text style={styles.subtitle}>
              Grow your business with Zonomo. Log in to manage your bookings and services.
            </Text>
          </View>

          {/* Login Card */}
          <View style={styles.card}>
            <Text style={styles.inputLabel}>Mobile Number</Text>
            
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCodeBox}>
                <Text style={styles.countryCodeText}>🇮🇳 +91</Text>
                <MaterialIcons name="keyboard-arrow-down" size={20} color="#0A1C3B" />
              </View>
              <TextInput 
                style={styles.textInput}
                placeholder="000 000 0000"
                placeholderTextColor="#A0AABF"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                maxLength={10}
              />
            </View>

            <TouchableOpacity 
              style={[styles.primaryBtn, phoneNumber.length < 10 && styles.primaryBtnDisabled]}
              onPress={handleSendCode}
              disabled={phoneNumber.length < 10}
            >
              <Text style={styles.primaryBtnText}>Send Verification Code</Text>
              <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.customerBtn} 
              onPress={() => router.replace('/(auth)/login')}
            >
              <FontAwesome5 name="user" size={16} color="#0A1C3B" />
              <Text style={styles.customerBtnText}>I am a Customer</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Securty Badge */}
          <View style={styles.securityBadge}>
            <MaterialIcons name="verified-user" size={16} color="#00796B" />
            <Text style={styles.securityText}>Verified Zonomo Partner</Text>
          </View>

        </ScrollView>
        
        {/* Bottom Links */}
        <View style={styles.bottomLinks}>
          <View style={styles.row}>
            <Text style={styles.linkText}>Terms of Service</Text>
            <View style={styles.dot} />
            <Text style={styles.linkText}>Privacy Policy</Text>
          </View>
          <Text style={styles.copyright}>© 2024 ZONOMO INC.</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8', // Slightly darker blue-grey for provider
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  providerBadge: {
    position: 'absolute',
    top: -10,
    right: 60,
    backgroundColor: '#E6A23C', // Accent color for PRO
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 10,
  },
  providerBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#0A1C3B',
  },
  brandName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0A1C3B',
    letterSpacing: 1,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#5C6B81',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 18,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
    marginBottom: 30,
    borderTopWidth: 4,
    borderTopColor: '#00796B', // Visual indicator for Provider side
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0A1C3B',
    marginBottom: 8,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    height: 50,
    marginBottom: 20,
  },
  countryCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2F6',
    paddingHorizontal: 12,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRightWidth: 0,
  },
  countryCodeText: {
    fontSize: 15,
    color: '#0A1C3B',
    marginRight: 4,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0A1C3B',
  },
  primaryBtn: {
    backgroundColor: '#0A1C3B', // Different button color for PRO
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  primaryBtnDisabled: {
    backgroundColor: '#6C7E95',
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  customerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#EEF2F6',
  },
  customerBtnText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0A1C3B',
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  securityText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#5C6B81',
  },
  bottomLinks: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  linkText: {
    fontSize: 12,
    color: '#5C6B81',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#C4C9D3',
    marginHorizontal: 10,
  },
  copyright: {
    fontSize: 10,
    color: '#8A94A6',
    letterSpacing: 1,
  },
});
