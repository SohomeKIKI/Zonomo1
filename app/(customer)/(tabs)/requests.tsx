import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Linking, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function RequestsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);

  type Booking = {
    id: string;
    providerName: string;
    serviceName: string;
    date: string;
    time: string;
    status: string;
    phone: string;
    providerId: string;
    price?: string;
    otp?: string;
  };

  // Mock Data for an active booking
  const [activeBookings, setActiveBookings] = useState<Booking[]>([
    {
      id: 'BKG-784291',
      providerName: 'Rajesh Kumar',
      serviceName: 'Expert Electrician',
      date: 'Today, Oct 15',
      time: '02:00 PM',
      status: 'Upcoming',
      otp: '4921',
      phone: '+919876543210',
      providerId: '1',
      price: '₹1680'
    }
  ]);

  const [historyBookings] = useState<Booking[]>([
    {
      id: 'BKG-651230',
      providerName: 'Amit Singh',
      serviceName: 'Master Plumber',
      date: 'Oct 10, 2026',
      time: '10:00 AM',
      status: 'Completed',
      phone: '+919876543211',
      providerId: '2',
      price: '₹1200'
    }
  ]);

  const handleCancel = (id: string) => {
    setCancelBookingId(id);
  };

  const confirmCancel = () => {
    if (cancelBookingId) {
      setActiveBookings(prev => prev.filter(b => b.id !== cancelBookingId));
      setCancelBookingId(null);
    }
  };

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const currentList = activeTab === 'active' ? activeBookings : historyBookings;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Toggle tabs for Active/History */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={activeTab === 'active' ? styles.activeTab : styles.inactiveTab}
            onPress={() => setActiveTab('active')}
          >
            <Text style={activeTab === 'active' ? styles.activeTabText : styles.inactiveTabText}>
              Active ({activeBookings.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={activeTab === 'history' ? styles.activeTab : styles.inactiveTab}
            onPress={() => setActiveTab('history')}
          >
            <Text style={activeTab === 'history' ? styles.activeTabText : styles.inactiveTabText}>
              History
            </Text>
          </TouchableOpacity>
        </View>

        {currentList.length > 0 ? (
          currentList.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              
              {/* Header: ID and Status */}
              <View style={styles.cardHeader}>
                <Text style={styles.bookingId}>ID: {booking.id}</Text>
                <View style={[styles.statusBadge, booking.status === 'Completed' && styles.statusBadgeCompleted]}>
                  <Text style={[styles.statusText, booking.status === 'Completed' && styles.statusTextCompleted]}>
                    {booking.status}
                  </Text>
                </View>
              </View>

              {/* Provider Info */}
              <View style={styles.providerInfo}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{booking.providerName.charAt(0)}</Text>
                </View>
                <View style={styles.providerDetails}>
                  <Text style={styles.providerName}>{booking.providerName}</Text>
                  <Text style={styles.serviceName}>{booking.serviceName}</Text>
                </View>
              </View>
              
              <View style={styles.divider} />

              {/* Schedule Info */}
              <View style={styles.scheduleRow}>
                <View style={styles.scheduleItem}>
                  <Ionicons name="calendar-outline" size={16} color="#4B5563" />
                  <Text style={styles.scheduleText}>{booking.date}</Text>
                </View>
                <View style={styles.scheduleItem}>
                  <Ionicons name="time-outline" size={16} color="#4B5563" />
                  <Text style={styles.scheduleText}>{booking.time}</Text>
                </View>
                {activeTab === 'history' && 'price' in booking && (
                  <View style={styles.scheduleItem}>
                    <Ionicons name="cash-outline" size={16} color="#00838F" />
                    <Text style={[styles.scheduleText, { color: '#00838F', fontWeight: '700' }]}>{booking.price}</Text>
                  </View>
                )}
              </View>

              <View style={styles.divider} />

              {/* OTP Section (Only for active bookings) */}
              {activeTab === 'active' && 'otp' in booking && (
                <View style={styles.otpContainer}>
                  <View style={styles.otpHeader}>
                    <Ionicons name="lock-closed-outline" size={18} color="#00838F" />
                    <Text style={styles.otpTitle}>Start Service OTP</Text>
                  </View>
                  <Text style={styles.otpValue}>{booking.otp}</Text>
                  <Text style={styles.otpHelper}>Share this OTP with the provider when they arrive to start the work.</Text>
                </View>
              )}

              {/* Actions (Only for active bookings) */}
              {activeTab === 'active' && (
                <View style={styles.actionRow}>
                  <TouchableOpacity 
                    style={styles.secondaryBtn}
                    onPress={() => handleCancel(booking.id)}
                  >
                    <Text style={styles.secondaryBtnText}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.primaryBtn, { backgroundColor: '#F0F9FF', borderWidth: 1, borderColor: '#0284C7' }]}
                    onPress={() => router.push({ pathname: '/(customer)/booking/negotiate', params: { providerId: booking.providerId } })}
                  >
                    <Ionicons name="chatbubble-ellipses-outline" size={16} color="#0284C7" />
                    <Text style={[styles.primaryBtnText, { color: '#0284C7' }]}>Chat</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.primaryBtn}
                    onPress={() => handleCall(booking.phone)}
                  >
                    <Ionicons name="call" size={16} color="#FFFFFF" />
                    <Text style={styles.primaryBtnText}>Call</Text>
                  </TouchableOpacity>
                </View>
              )}

            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No {activeTab} bookings</Text>
            <Text style={styles.emptyDesc}>You don't have any {activeTab} services scheduled.</Text>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* CUSTOM CANCEL MODAL */}
      <Modal
        visible={!!cancelBookingId}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconContainer}>
              <Ionicons name="warning" size={32} color="#DC2626" />
            </View>
            <Text style={styles.modalTitle}>Cancel Booking?</Text>
            <Text style={styles.modalDesc}>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </Text>
            
            <View style={styles.modalActionRow}>
              <TouchableOpacity 
                style={styles.modalKeepBtn}
                onPress={() => setCancelBookingId(null)}
              >
                <Text style={styles.modalKeepBtnText}>Keep Booking</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalCancelBtn}
                onPress={confirmCancel}
              >
                <Text style={styles.modalCancelBtnText}>Yes, Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0A2540',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeTab: {
    flex: 1,
    backgroundColor: '#0A2540',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  inactiveTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  inactiveTabText: {
    color: '#6B7280',
    fontWeight: '500',
    fontSize: 14,
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bookingId: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  statusBadge: {
    backgroundColor: '#DEF7EC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#03543F',
    fontSize: 12,
    fontWeight: '700',
  },
  statusBadgeCompleted: {
    backgroundColor: '#E5E7EB',
  },
  statusTextCompleted: {
    color: '#374151',
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E0F2F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#00838F',
  },
  providerDetails: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  serviceName: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 16,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
  },
  otpContainer: {
    backgroundColor: '#F0FDFA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCFBF1',
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  otpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  otpTitle: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '700',
    color: '#00838F',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  otpValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0A2540',
    letterSpacing: 4,
    marginBottom: 8,
  },
  otpHelper: {
    fontSize: 12,
    color: '#0F766E',
    textAlign: 'center',
    lineHeight: 18,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: '#4B5563',
    fontWeight: '600',
    fontSize: 14,
  },
  primaryBtn: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#00695C',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDesc: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  modalIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  modalDesc: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  modalActionRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalKeepBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  modalKeepBtnText: {
    color: '#374151',
    fontWeight: '700',
    fontSize: 15,
  },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#DC2626',
    alignItems: 'center',
  },
  modalCancelBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  }
});
