import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { customerService } from '../../../services/customerService';
import { useAuthStore } from '../../../store/authStore';

export default function CartScreen() {
  const router = useRouter();
  const { providerId, date, time } = useLocalSearchParams();
  const { user } = useAuthStore();
  
  const [provider, setProvider] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // State for Service Location
  const [recipientName, setRecipientName] = useState(user?.fullName || 'John Doe');
  const [contactPhone, setContactPhone] = useState('+91 98765 43210');
  const [serviceAddress, setServiceAddress] = useState('123, Sector 15, Vashi, Navi Mumbai, 400703');

  // Modal State
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isValidatingLocation, setIsValidatingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  
  // Edit Form State
  const [editName, setEditName] = useState(recipientName);
  const [editPhone, setEditPhone] = useState(contactPhone);
  const [editAddress, setEditAddress] = useState(serviceAddress);

  const openEditModal = () => {
    setEditName(recipientName);
    setEditPhone(contactPhone);
    setEditAddress(serviceAddress);
    setLocationError('');
    setIsEditModalVisible(true);
  };

  const handleSaveLocation = async () => {
    if (!editPhone.trim()) {
      setLocationError('Phone number is required.');
      return;
    }
    setIsValidatingLocation(true);
    setLocationError('');
    
    try {
      const response = await customerService.validateServiceLocation(editAddress, providerId as string);
      if (response.isValid) {
        setRecipientName(editName);
        setContactPhone(editPhone);
        setServiceAddress(editAddress);
        setIsEditModalVisible(false);
      } else {
        setLocationError(response.message || 'Provider is not available for this location.');
      }
    } catch (error) {
      setLocationError('Error validating location. Please try again.');
    } finally {
      setIsValidatingLocation(false);
    }
  };

  const handleConfirmBooking = () => {
    if (!contactPhone || contactPhone.trim() === '') {
      openEditModal();
      setLocationError('Please provide a phone number to confirm booking.');
      return;
    }
    // Proceed with booking
    router.replace({ pathname: '/(customer)/booking/success', params: { providerName: provider?.name || 'Professional', date, time } });
  };

  // Price Breakdown (Mocking calculation, should come from backend)
  const basePrice = 1500;
  const taxes = 180;
  const total = basePrice + taxes;

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const data = await customerService.getProviderDetails(providerId as string);
        setProvider(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (providerId) {
      fetchProvider();
    } else {
      // Mock provider if no ID
      setProvider({ name: 'Service Professional' });
      setIsLoading(false);
    }
  }, [providerId]);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#00838F" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0A2540" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Summary</Text>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* PROVIDER DETAILS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Provider</Text>
          <View style={styles.rowItem}>
            <Ionicons name="person-circle-outline" size={24} color="#00838F" />
            <Text style={styles.rowText}>{provider?.name || 'Professional'}</Text>
          </View>
        </View>

        {/* SCHEDULE DETAILS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date & Time</Text>
          <View style={styles.rowItem}>
            <Ionicons name="calendar-outline" size={20} color="#6B7280" />
            <Text style={styles.rowText}>{date} at {time}</Text>
          </View>
        </View>

        {/* CUSTOMER DETAILS */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>Service Location</Text>
            <TouchableOpacity onPress={openEditModal}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowItem}>
            <Ionicons name="person-outline" size={20} color="#6B7280" />
            <Text style={styles.rowText}>{recipientName}</Text>
          </View>
          <View style={styles.rowItem}>
            <Ionicons name="call-outline" size={20} color="#6B7280" />
            <Text style={styles.rowText}>{contactPhone || 'Not Provided'}</Text>
          </View>
          <View style={styles.rowItem}>
            <Ionicons name="location-outline" size={20} color="#6B7280" />
            <Text style={styles.rowText}>{serviceAddress}</Text>
          </View>
        </View>

        {/* PRICE BREAKDOWN */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Base Rate</Text>
            <Text style={styles.priceValue}>₹{basePrice}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Taxes & Fees</Text>
            <Text style={styles.priceValue}>₹{taxes}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total Payable</Text>
            <Text style={styles.totalValue}>₹{total}</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.fixedFooter}>
        <View style={styles.footerPriceInfo}>
          <Text style={styles.footerTotalLabel}>Total</Text>
          <Text style={styles.footerTotalValue}>₹{total}</Text>
        </View>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleConfirmBooking}
        >
          <Text style={styles.primaryButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>

      {/* EDIT LOCATION MODAL */}
      {isEditModalVisible && (
        <View style={[StyleSheet.absoluteFill, { zIndex: 1000 }]}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.modalOverlay}
          >
            <View style={[styles.modalContent, { maxHeight: '80%' }]}>
              <Text style={styles.modalTitle}>Edit Service Location</Text>
              
              <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                {locationError ? <Text style={styles.errorText}>{locationError}</Text> : null}

                <Text style={styles.inputLabel}>Recipient Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={editName}
                  onChangeText={setEditName}
                  placeholder="Enter name"
                />

                <Text style={styles.inputLabel}>Contact Phone</Text>
                <TextInput
                  style={styles.textInput}
                  value={editPhone}
                  onChangeText={setEditPhone}
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                />

                <Text style={styles.inputLabel}>Address (Service Zone Checked)</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={editAddress}
                  onChangeText={setEditAddress}
                  placeholder="Enter full address"
                  multiline={true}
                  numberOfLines={3}
                />

                <View style={styles.modalActions}>
                  <TouchableOpacity 
                    style={styles.modalCancelButton}
                    onPress={() => setIsEditModalVisible(false)}
                  >
                    <Text style={styles.modalCancelText}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.modalSaveButton}
                    onPress={handleSaveLocation}
                    disabled={isValidatingLocation}
                  >
                    {isValidatingLocation ? (
                      <ActivityIndicator color="#FFF" size="small" />
                    ) : (
                      <Text style={styles.modalSaveText}>Verify & Save</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A2540',
  },
  scrollContent: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rowText: {
    fontSize: 14,
    color: '#4B5563',
    marginLeft: 8,
    flex: 1,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#4B5563',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#00838F',
  },
  fixedFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerPriceInfo: {
    flex: 1,
  },
  footerTotalLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  footerTotalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  primaryButton: {
    backgroundColor: '#00695C',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 160,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  editButtonText: {
    color: '#00838F',
    fontWeight: '600',
    fontSize: 14,
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
    padding: 24,
    minHeight: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    marginBottom: 12,
    backgroundColor: '#FEE2E2',
    padding: 8,
    borderRadius: 6,
    overflow: 'hidden',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  modalCancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  modalCancelText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
  },
  modalSaveButton: {
    backgroundColor: '#00838F',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSaveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
