import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  PlatformColor
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuthStore } from '../../store/useAuthStore';
import { authService } from '../../services/authService';
import { customerService } from '../../services/customerService';
import { ActivityIndicator, Alert } from 'react-native';

type Gender = 'Male' | 'Female' | 'Other' | null;

export default function CompleteProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    phone?: string, 
    role?: string, 
    name?: string, 
    email?: string, 
    dateOfBirth?: string, 
    gender?: string
  }>();
  
  const updateUser = useAuthStore(state => state.updateUser);
  
  const [fullName, setFullName] = useState(params.name || '');
  const [email, setEmail] = useState(params.email || '');
  const [gender, setGender] = useState<Gender>((params.gender as Gender) || null);
  
  // Date Picker State
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(params.dateOfBirth ? new Date(params.dateOfBirth) : null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // Validation State
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getInitial = () => {
    if (fullName.trim().length > 0) {
      return fullName.trim().charAt(0).toUpperCase();
    }
    return '';
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError && text.includes('@')) {
      setEmailError('');
    }
  };

  const validateEmail = () => {
    if (email.trim().length > 0 && !email.includes('@')) {
      setEmailError('Please enter a valid email containing "@"');
      return false;
    }
    setEmailError('');
    return true;
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'dd-mm-yyyy';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSaveAndContinue = async () => {
    if (!validateEmail()) {
      return;
    }
    if (!fullName.trim() || !gender || !dateOfBirth) {
      Alert.alert("Missing Fields", "Please complete all fields.");
      return;
    }
    
    try {
      setIsLoading(true);
      
      const authState = useAuthStore.getState();
      const userId = authState.user?.id;
      const currentRefreshToken = authState.refreshToken;
      
      if (!userId || !currentRefreshToken) {
        Alert.alert("Error", "Authentication session invalid.");
        return;
      }
      
      const dobString = dateOfBirth.toISOString().split('T')[0];
      
      const payload = {
        name: fullName.trim(),
        email: email.trim(),
        gender: gender.toLowerCase(),
        dateOfBirth: dobString
      };
      
      // Update profile
      await customerService.updateProfile(userId, payload);
      
      // Refresh token to get updated claims
      const refreshRes = await authService.refreshToken(currentRefreshToken);
      
      if (refreshRes && refreshRes.success && refreshRes.accessToken) {
        // The endpoint may return isProfileCompleted: true now.
        // Update local store with new tokens and updated user object.
        authState.setAuthData(
          refreshRes.accessToken,
          refreshRes.refreshToken || currentRefreshToken,
          {
            ...authState.user!,
            name: payload.name,
            email: payload.email,
            gender: payload.gender,
            dateOfBirth: payload.dateOfBirth,
            isProfileCompleted: true
          },
          authState.role,
          authState.isNewUser
        );
        
        router.replace('/(auth)/account-ready');
      } else {
        throw new Error("Failed to refresh session");
      }
      
    } catch (e: any) {
      Alert.alert("Error", e.response?.data?.message || e.message || "Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#0A1C3B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complete Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Avatar Section */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarCircle}>
              {getInitial() ? (
                <Text style={styles.avatarText}>{getInitial()}</Text>
              ) : (
                <Ionicons name="person" size={40} color="#A0AABF" />
              )}
            </View>
            <TouchableOpacity style={styles.editIconContainer}>
              <MaterialIcons name="edit" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            
            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color="#8A94A6" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your full name"
                  placeholderTextColor="#A0AABF"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
            </View>

            {/* Email Address */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={[styles.inputWrapper, emailError ? styles.inputErrorBorder : null, params.email ? { backgroundColor: '#F1F5F9' } : null]}>
                <MaterialCommunityIcons name="email-outline" size={20} color="#8A94A6" style={styles.inputIcon} />
                <TextInput
                  style={[styles.textInput, params.email ? { color: '#8A94A6' } : null]}
                  placeholder="name@example.com"
                  placeholderTextColor="#A0AABF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={handleEmailChange}
                  onBlur={validateEmail}
                  editable={!params.email}
                />
              </View>
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>

            {/* Gender */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Gender</Text>
              <View style={styles.genderContainer}>
                {['Male', 'Female', 'Other'].map((g) => (
                  <TouchableOpacity
                    key={g}
                    style={[
                      styles.genderButton,
                      gender === g ? styles.genderButtonActive : null
                    ]}
                    onPress={() => setGender(g as Gender)}
                  >
                    <Text style={[
                      styles.genderButtonText,
                      gender === g ? styles.genderButtonTextActive : null
                    ]}>
                      {g}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Date of Birth */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Date of Birth</Text>
              <TouchableOpacity 
                style={styles.inputWrapper} 
                onPress={() => setShowDatePicker(true)}
                activeOpacity={0.8}
              >
                <Ionicons name="calendar-outline" size={20} color="#8A94A6" style={styles.inputIcon} />
                <Text style={[styles.dateText, !dateOfBirth && { color: '#A0AABF' }]}>
                  {formatDate(dateOfBirth)}
                </Text>
                <Ionicons name="calendar" size={20} color="#0A1C3B" style={styles.inputRightIcon} />
              </TouchableOpacity>
              <Text style={styles.helperText}>Must be 18 years or older to use Zonomo services.</Text>
            </View>

          </View>
        </ScrollView>
        
        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <TouchableOpacity 
            style={[styles.primaryBtn, isLoading && { opacity: 0.7 }]}
            onPress={handleSaveAndContinue}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Text style={styles.primaryBtnText}>Save & Continue</Text>
                <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
              </>
            )}
          </TouchableOpacity>
          
          <Text style={styles.termsText}>
            By continuing, you agree to our <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>.
          </Text>
        </View>
        
        {/* DatePicker Modal/Overlay */}
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateOfBirth || new Date()}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onDateChange}
            maximumDate={new Date()}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F9FBFF',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A1C3B',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  avatarContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 40,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0A1C3B',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#00796B',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F9FBFF',
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A1C3B',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  inputErrorBorder: {
    borderColor: '#E53935',
  },
  inputIcon: {
    marginRight: 12,
  },
  inputRightIcon: {
    marginLeft: 'auto',
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#0A1C3B',
  },
  errorText: {
    color: '#E53935',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },
  dateText: {
    flex: 1,
    fontSize: 15,
    color: '#0A1C3B',
  },
  helperText: {
    fontSize: 12,
    color: '#8A94A6',
    marginTop: 6,
    fontStyle: 'italic',
  },
  genderContainer: {
    flexDirection: 'row',
    backgroundColor: '#EEF2F6',
    borderRadius: 10,
    padding: 4,
  },
  genderButton: {
    flex: 1,
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderButtonActive: {
    backgroundColor: '#0A1C3B',
  },
  genderButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5C6B81',
  },
  genderButtonTextActive: {
    color: '#FFFFFF',
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 10 : 24,
    paddingTop: 10,
    backgroundColor: '#F9FBFF',
  },
  primaryBtn: {
    backgroundColor: '#00796B',
    height: 54,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 11,
    color: '#8A94A6',
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 20,
  },
  linkText: {
    color: '#00796B',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
