import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '../../store/authStore';

export default function VerifyOtpScreen() {
  const router = useRouter();
  const { phone, role } = useLocalSearchParams<{ phone: string; role: string }>();
  const [code, setCode] = useState('');
  const inputRef = useRef<TextInput>(null);
  
  const login = useAuthStore((state) => state.login);

  // Focus input automatically on mount
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  }, []);

  const handleVerify = () => {
    if (code.length < 6) return;
    
    // MOCK LOGIC: 
    // If code is '111111', pretend it's a new user and go to register
    // Otherwise, log them in as a returning user
    if (code === '111111') {
      if (role === 'provider') {
        router.push({
          pathname: '/(auth)/provider-complete-profile',
          params: { phone, role }
        });
      } else {
        router.push({
          pathname: '/(auth)/complete-profile',
          params: { phone, role }
        });
      }
    } else {
      // Login as returning user
      login('dummy_token_123', (role as 'customer' | 'provider') || 'customer');
      if (role === 'provider') {
        router.replace('/(provider)/(tabs)');
      } else {
        router.replace('/(customer)/(tabs)');
      }
    }
  };

  const renderCodeBoxes = () => {
    return [0, 1, 2, 3, 4, 5].map((index) => {
      const isFocused = code.length === index;
      return (
        <View 
          key={index} 
          style={[styles.codeBox, isFocused && styles.codeBoxActive]}
        >
          <Text style={styles.codeText}>{code[index] ? code[index] : '-'}</Text>
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#0A1C3B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Verify Phone</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text style={styles.title}>Confirm security code</Text>
            <Text style={styles.subtitle}>
              Enter the 6-digit code sent to <Text style={styles.boldText}>{phone || '+1 555-0123'}</Text>. 
              This helps us ensure your account's safety.
            </Text>

            <TouchableOpacity 
              activeOpacity={1} 
              style={styles.codeContainer}
              onPress={() => inputRef.current?.focus()}
            >
              {renderCodeBoxes()}
            </TouchableOpacity>

            <TextInput
              ref={inputRef}
              style={styles.hiddenInput}
              keyboardType="number-pad"
              maxLength={6}
              value={code}
              onChangeText={setCode}
              caretHidden
            />

            <TouchableOpacity style={styles.resendBtn}>
              <Text style={styles.resendText}>Resend Code</Text>
            </TouchableOpacity>

            <View style={styles.securityCard}>
              <View style={styles.shieldBox}>
                <MaterialIcons name="security" size={20} color="#00796B" />
              </View>
              <View style={styles.securityTextContainer}>
                <Text style={styles.securityTitle}>Secure Verification</Text>
                <Text style={styles.securityDesc}>
                  ZONOMO uses bank-grade encryption to protect your hyperlocal transaction data.
                </Text>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.primaryBtn, code.length < 6 && styles.primaryBtnDisabled]}
              onPress={handleVerify}
              disabled={code.length < 6}
            >
              <Text style={styles.primaryBtnText}>Verify & Continue</Text>
              <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A1C3B',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0A1C3B',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#5C6B81',
    lineHeight: 22,
    marginBottom: 30,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#0A1C3B',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  codeBox: {
    width: 45,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  codeBoxActive: {
    borderColor: '#00796B',
    borderWidth: 2,
  },
  codeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A1C3B',
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  resendBtn: {
    alignSelf: 'center',
    marginBottom: 40,
    padding: 10,
  },
  resendText: {
    color: '#00796B',
    fontWeight: 'bold',
    fontSize: 14,
  },
  securityCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  shieldBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E8F5F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  securityTextContainer: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A1C3B',
    marginBottom: 4,
  },
  securityDesc: {
    fontSize: 12,
    color: '#5C6B81',
    lineHeight: 18,
  },
  primaryBtn: {
    backgroundColor: '#00796B',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnDisabled: {
    backgroundColor: '#80CBC4',
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
