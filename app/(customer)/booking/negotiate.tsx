import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { customerService } from '../../../services/customerService';

export default function NegotiateScreen() {
  const router = useRouter();
  const { providerId } = useLocalSearchParams();
  
  const [provider, setProvider] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [counterOffer, setCounterOffer] = useState('18500');

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
      // If no ID is passed, just load dummy data for testing
      setProvider({
        name: 'Marcus Rivera',
        rating: 4.9,
        reviewsCount: 124,
      });
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

  if (!provider) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <Text>Provider not found.</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 16 }}>
          <Text style={{ color: '#00838F' }}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#0A2540" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ZONOMO</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.avatarSmall}>
            <Text style={styles.avatarText}>M</Text>
          </View>
          <Ionicons name="notifications-outline" size={24} color="#0A2540" />
        </View>
      </View>

      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContentContainer} showsVerticalScrollIndicator={false}>
        
        {/* PROVIDER INFO CARD */}
        <View style={styles.providerCard}>
          <View style={styles.providerCardTop}>
            <View style={styles.providerAvatarPlaceholder}>
              <Ionicons name="person" size={24} color="#9CA3AF" />
            </View>
            <View style={styles.providerInfo}>
              <Text style={styles.providerName}>{provider.name}</Text>
              <View style={styles.providerMeta}>
                <View style={styles.verifiedBadge}>
                  <Ionicons name="shield-checkmark" size={12} color="#00838F" />
                  <Text style={styles.verifiedText}>Provider</Text>
                </View>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color="#F5A623" />
                  <Text style={styles.ratingText}>{provider.rating}</Text>
                  <Text style={styles.reviewsText}>({provider.reviewsCount})</Text>
                </View>
              </View>
            </View>
            <View style={styles.quoteBlock}>
              <Text style={styles.quoteLabel}>Current</Text>
              <Text style={styles.quoteLabel}>Quote</Text>
              <Text style={styles.quoteValue}>₹18,500</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.projectDetails}>
            <Text style={styles.projectDetailText}>
              <Text style={styles.projectDetailLabel}>Project: </Text>
              Smart Thermostat Installation
            </Text>
            <Text style={styles.projectDetailText}>
              <Text style={styles.projectDetailLabel}>Date: </Text>
              Oct 24, 2026 • 2:00 PM
            </Text>
          </View>
        </View>

        {/* NEGOTIATION CHAT */}
        <View style={styles.chatSection}>
          <View style={styles.timestampDivider}>
            <View style={styles.line} />
            <Text style={styles.timestampText}>NEGOTIATION STARTED</Text>
            <View style={styles.line} />
          </View>

          {/* PROVIDER BUBBLE */}
          <View style={styles.bubbleProvider}>
            <Text style={styles.bubbleTextProvider}>
              {"Hello! I can certainly help with the installation. Given the complexity of your wiring, my standard rate is ₹21,000 for this job."}
            </Text>
            <View style={styles.quoteInnerBlock}>
              <Text style={styles.innerQuoteLabel}>Provider Quote</Text>
              <Text style={styles.innerQuoteValue}>₹21,000</Text>
            </View>
          </View>
          <Text style={styles.timeLabelProvider}>10:15 AM</Text>

          {/* USER BUBBLE */}
          <View style={styles.bubbleUser}>
            <Text style={styles.bubbleTextUser}>
              {"That's a bit higher than I expected. Would you consider ₹16,000? It's a straightforward Nest installation."}
            </Text>
            <View style={styles.quoteInnerBlockUser}>
              <Text style={styles.innerQuoteLabelUser}>Your Offer</Text>
              <Text style={styles.innerQuoteValueUser}>₹16,000</Text>
            </View>
          </View>
          <Text style={styles.timeLabelUser}>10:22 AM</Text>
          
          {/* PROVIDER BUBBLE 2 */}
          <View style={styles.bubbleProvider}>
            <Text style={styles.bubbleTextProvider}>
              {"I understand. How about we meet in the middle at ₹18,500? I can guarantee the work and provide a 1-year warranty on the installation."}
            </Text>
            <View style={styles.quoteInnerBlock}>
              <Text style={styles.innerQuoteLabel}>Provider Quote</Text>
              <Text style={styles.innerQuoteValue}>₹18,500</Text>
            </View>
          </View>
          <Text style={styles.timeLabelProvider}>10:45 AM</Text>
          
          <View style={{height: 100}} />
        </View>
      </ScrollView>

      {/* FIXED ACTION BAR */}
      <View style={styles.bottomActionBar}>
        <TouchableOpacity style={styles.acceptButton}>
          <Text style={styles.acceptButtonText}>Accept Quote (₹18,500)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.counterButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.counterButtonText}>Counter-Offer</Text>
        </TouchableOpacity>
      </View>

      {/* COUNTER-OFFER MODAL */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>ENTER COUNTER-OFFER</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.priceInput}
                value={counterOffer}
                onChangeText={setCounterOffer}
                keyboardType="numeric"
                maxLength={6}
              />
            </View>
            <Text style={styles.helperText}>
              Average for this service in your area: ₹15,500 - ₹19,500
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCancelTxt}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirmBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalConfirmTxt}>Confirm Offer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0A2540',
    letterSpacing: 0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  providerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  providerCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  providerAvatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  providerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2F1',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#00838F',
    marginLeft: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 2,
  },
  quoteBlock: {
    alignItems: 'flex-end',
  },
  quoteLabel: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '500',
  },
  quoteValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#00838F',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 12,
  },
  projectDetails: {
    gap: 4,
  },
  projectDetailText: {
    fontSize: 12,
    color: '#4B5563',
  },
  projectDetailLabel: {
    color: '#6B7280',
  },
  chatSection: {
    flex: 1,
  },
  timestampDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  timestampText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    marginHorizontal: 12,
    letterSpacing: 0.5,
  },
  bubbleProvider: {
    backgroundColor: '#E5EEFF',
    borderRadius: 12,
    borderBottomLeftRadius: 4,
    padding: 16,
    maxWidth: '85%',
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  bubbleTextProvider: {
    fontSize: 14,
    color: '#1E293B',
    lineHeight: 20,
    marginBottom: 12,
  },
  quoteInnerBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    paddingTop: 12,
  },
  innerQuoteLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  innerQuoteValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  timeLabelProvider: {
    fontSize: 10,
    color: '#9CA3AF',
    alignSelf: 'flex-start',
    marginBottom: 20,
    marginLeft: 4,
  },
  bubbleUser: {
    backgroundColor: '#0A1930',
    borderRadius: 12,
    borderBottomRightRadius: 4,
    padding: 16,
    maxWidth: '85%',
    alignSelf: 'flex-end',
    marginBottom: 4,
  },
  bubbleTextUser: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    marginBottom: 12,
  },
  quoteInnerBlockUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 12,
  },
  innerQuoteLabelUser: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D1D5DB',
  },
  innerQuoteValueUser: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  timeLabelUser: {
    fontSize: 10,
    color: '#9CA3AF',
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginRight: 4,
  },
  bottomActionBar: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  acceptButton: {
    flex: 2,
    backgroundColor: '#00695C',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 8,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  counterButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  counterButtonText: {
    color: '#374151',
    fontWeight: '700',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#F5F7FA',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 12,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6B7280',
    marginRight: 8,
  },
  priceInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  helperText: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0A2540',
  },
  modalCancelTxt: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A2540',
  },
  modalConfirmBtn: {
    flex: 1,
    backgroundColor: '#00695C',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  modalConfirmTxt: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
