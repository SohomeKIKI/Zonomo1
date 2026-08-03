import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
  Animated,
  PanResponder,
  Image,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SERVICES = [
  'Electrician', 'Plumber', 'Carpenter', 'AC Repair', 'Appliance Repair', 
  'Home Cleaning', 'Bathroom Cleaning', 'Kitchen Cleaning', 'Pest Control', 
  'Salon at Home', 'Beautician', 'Physiotherapy', 'Home Nursing', 
  'Yoga Trainer', 'Personal Trainer', 'Babysitter', 'Elder Care', 
  'Dog Walking', 'Pet Grooming', 'Packers & Mover'
];

export default function ProviderCompleteProfileScreen() {
  const router = useRouter();
  
  const [businessName, setBusinessName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [serviceModalVisible, setServiceModalVisible] = useState(false);
  const [radius, setRadius] = useState(10); // Default 10 KM
  
  // Custom Slider Logic
  const sliderWidth = SCREEN_WIDTH - 48; // padding 24 on each side
  const pan = useRef(new Animated.Value(sliderWidth * (10 / 50))).current; // initial position for 10km out of 50
  
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        let newX = gestureState.moveX - 24; // adjust for padding
        if (newX < 0) newX = 0;
        if (newX > sliderWidth) newX = sliderWidth;
        
        pan.setValue(newX);
        
        const newRadius = Math.max(1, Math.round((newX / sliderWidth) * 50));
        setRadius(newRadius);
      },
      onPanResponderRelease: () => {
        // Optional snap logic can go here
      }
    })
  ).current;

  // Validation
  const isValidNCR = (zip: string) => {
    return /^(11|121|122|2010|2013)\d+$/.test(zip) && zip.length === 6;
  };

  const isZipValid = zipCode.length === 0 || isValidNCR(zipCode);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Feather name="arrow-left" size={24} color="#0A1C3B" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>ZONOMO</Text>
            <View style={styles.initialBadge}>
              <Text style={styles.initialText}>A</Text>
            </View>
          </View>

          <Text style={styles.onboardingText}>ONBOARDING</Text>
          <View style={styles.titleRow}>
            <Text style={styles.mainTitle}>Profile Setup</Text>
            <Text style={styles.stepText}>Step 1 of 3</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarFill} />
          </View>

          {/* Verification Badge */}
          <View style={styles.verificationCard}>
            <View style={styles.verificationIconBox}>
              <MaterialIcons name="security" size={20} color="#3B82F6" />
            </View>
            <View style={styles.verificationTexts}>
              <Text style={styles.verificationTitle}>Identity Verification</Text>
              <Text style={styles.verificationSubtitle}>Required for marketplace trust</Text>
            </View>
            <View style={styles.pendingBadge}>
              <MaterialIcons name="access-time" size={12} color="#D97706" style={{marginRight: 4}}/>
              <Text style={styles.pendingText}>Pending</Text>
            </View>
          </View>

          {/* Business Details */}
          <View style={styles.sectionHeader}>
            <MaterialIcons name="work-outline" size={20} color="#0A1C3B" style={{marginRight: 8}}/>
            <Text style={styles.sectionTitle}>Business Details</Text>
          </View>

          <Text style={styles.inputLabel}>Business Name</Text>
          <TextInput 
            style={styles.textInput}
            placeholder="e.g. Apex Electrical Solutions"
            placeholderTextColor="#8A94A6"
            value={businessName}
            onChangeText={setBusinessName}
          />

          <Text style={styles.inputLabel}>Service Category</Text>
          <TouchableOpacity 
            style={styles.dropdownInput}
            onPress={() => setServiceModalVisible(true)}
          >
            <Text style={[styles.dropdownText, !selectedService && { color: '#8A94A6' }]}>
              {selectedService || "Select a service category"}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#0A1C3B" />
          </TouchableOpacity>

          {/* Service Area */}
          <View style={styles.sectionHeaderArea}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons name="location-on" size={20} color="#0A1C3B" style={{marginRight: 8}}/>
              <Text style={styles.sectionTitle}>Service Area</Text>
            </View>
            <Text style={styles.useCurrentLocText}>Use Current Location</Text>
          </View>

          <View style={styles.mapContainer}>
            <Image 
              source={require('../../assets/images/dummy-map.png')} 
              style={styles.mapImage}
            />
            {/* Overlay buttons on dummy map */}
            <View style={styles.mapControls}>
              <TouchableOpacity style={styles.mapControlBtn}><Feather name="plus" size={20} color="#000" /></TouchableOpacity>
              <TouchableOpacity style={styles.mapControlBtn}><Feather name="minus" size={20} color="#000" /></TouchableOpacity>
            </View>
          </View>

          <Text style={styles.inputLabel}>Primary Zip Code</Text>
          <TextInput 
            style={[styles.textInput, !isZipValid && styles.textInputError]}
            placeholder="e.g. 110001 (Delhi NCR)"
            placeholderTextColor="#8A94A6"
            keyboardType="number-pad"
            maxLength={6}
            value={zipCode}
            onChangeText={setZipCode}
          />
          {!isZipValid && (
            <Text style={styles.errorText}>Invalid Delhi NCR Pincode</Text>
          )}

          <Text style={styles.inputLabel}>Radius (KM)</Text>
          
          {/* Custom Slider */}
          <View style={styles.sliderContainer}>
            <View style={styles.sliderTrack} />
            <Animated.View style={[styles.sliderFill, { width: pan }]} />
            <Animated.View 
              style={[styles.sliderThumb, { transform: [{ translateX: pan }] }]} 
              {...panResponder.panHandlers}
            />
          </View>
          
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabelText}>1 KM</Text>
            <Text style={styles.sliderLabelTextActive}>{radius} KM</Text>
            <Text style={styles.sliderLabelText}>50 KM</Text>
          </View>

          {/* Benefits Cards */}
          <View style={styles.benefitsRow}>
            <View style={[styles.benefitCard, styles.benefitCardDark]}>
              <Feather name="check-circle" size={16} color="#00A86B" style={{marginBottom: 8}}/>
              <Text style={styles.benefitCardTextDark}>Get the "Verified" badge on your profile.</Text>
            </View>
            <View style={[styles.benefitCard, styles.benefitCardLight]}>
              <Feather name="trending-up" size={16} color="#0A1C3B" style={{marginBottom: 8}}/>
              <Text style={styles.benefitCardTextLight}>Rank higher in local search results.</Text>
            </View>
          </View>

        </ScrollView>
        
        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.continueBtn}
            onPress={() => router.push('/(auth)/provider-identity-verification')}
          >
            <Text style={styles.continueBtnText}>Continue to Verification</Text>
            <Feather name="arrow-right" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Services Modal */}
      <Modal visible={serviceModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Service Category</Text>
              <TouchableOpacity onPress={() => setServiceModalVisible(false)}>
                <Feather name="x" size={24} color="#0A1C3B" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={SERVICES}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity 
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedService(item);
                    setServiceModalVisible(false);
                  }}
                >
                  <Text style={[styles.modalItemText, selectedService === item && {color: '#00A86B', fontWeight: 'bold'}]}>
                    {item}
                  </Text>
                  {selectedService === item && (
                    <Feather name="check" size={20} color="#00A86B" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A1C3B',
    letterSpacing: 1,
  },
  initialBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E6F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialText: {
    color: '#3B82F6',
    fontWeight: 'bold',
  },
  onboardingText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#00A86B',
    letterSpacing: 1,
    marginBottom: 4,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0A1C3B',
  },
  stepText: {
    fontSize: 12,
    color: '#0A1C3B',
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#EEF2F6',
    borderRadius: 2,
    marginBottom: 24,
  },
  progressBarFill: {
    width: '33%',
    height: '100%',
    backgroundColor: '#00A86B',
    borderRadius: 2,
  },
  verificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    marginBottom: 32,
  },
  verificationIconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  verificationTexts: {
    flex: 1,
  },
  verificationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A1C3B',
  },
  verificationSubtitle: {
    fontSize: 12,
    color: '#8A94A6',
  },
  pendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  pendingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#D97706',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeaderArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A1C3B',
  },
  useCurrentLocText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00A86B',
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0A1C3B',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#0A1C3B',
    marginBottom: 16,
  },
  textInputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 16,
  },
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontSize: 15,
    color: '#0A1C3B',
  },
  mapContainer: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapControls: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapControlBtn: {
    padding: 8,
  },
  sliderContainer: {
    height: 40,
    justifyContent: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    width: '100%',
    position: 'absolute',
  },
  sliderFill: {
    height: 4,
    backgroundColor: '#00A86B',
    borderRadius: 2,
    position: 'absolute',
    left: 0,
  },
  sliderThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#00A86B',
    position: 'absolute',
    left: -12,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  sliderLabelText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#8A94A6',
  },
  sliderLabelTextActive: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0A1C3B',
  },
  benefitsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  benefitCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
  },
  benefitCardDark: {
    backgroundColor: '#1E293B',
    marginRight: 8,
  },
  benefitCardLight: {
    backgroundColor: '#F0F5FF',
    marginLeft: 8,
  },
  benefitCardTextDark: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 18,
  },
  benefitCardTextLight: {
    color: '#0A1C3B',
    fontSize: 12,
    lineHeight: 18,
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 0 : 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F2F5',
  },
  continueBtn: {
    backgroundColor: '#00796B',
    height: 54,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '70%',
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A1C3B',
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  modalItemText: {
    fontSize: 16,
    color: '#0A1C3B',
  }
});
