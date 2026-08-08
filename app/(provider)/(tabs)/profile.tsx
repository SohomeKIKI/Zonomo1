import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../../store/authStore';
import { useRouter } from 'expo-router';

export default function ProviderProfileScreen() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/location');
  };

  const renderMenuOption = (icon: keyof typeof Ionicons.glyphMap, title: string, showChevron: boolean = true) => (
    <TouchableOpacity style={styles.menuOption}>
      <View style={styles.menuOptionLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={20} color="#0A2540" />
        </View>
        <Text style={styles.menuOptionText}>{title}</Text>
      </View>
      {showChevron && <Ionicons name="chevron-forward" size={20} color="#CCC" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* PROFILE HEADER */}
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?img=11' }} 
            style={styles.avatar} 
          />
          <Text style={styles.providerName}>Ajay Sharma</Text>
          <Text style={styles.providerEmail}>ajay.sharma@example.com</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Ionicons name="star" size={18} color="#FFD700" />
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Ionicons name="briefcase" size={18} color="#1DD1A1" />
              <Text style={styles.statValue}>142</Text>
              <Text style={styles.statLabel}>Jobs Done</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Ionicons name="time" size={18} color="#5CE1E6" />
              <Text style={styles.statValue}>2 yrs</Text>
              <Text style={styles.statLabel}>Experience</Text>
            </View>
          </View>
        </View>

        {/* SETTINGS MENU */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          {renderMenuOption('person-outline', 'Personal Information')}
          {renderMenuOption('card-outline', 'Bank Details & Payouts')}
          {renderMenuOption('map-outline', 'Service Areas')}
          {renderMenuOption('document-text-outline', 'My Documents')}
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          {renderMenuOption('notifications-outline', 'Notifications')}
          {renderMenuOption('globe-outline', 'Language')}
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Support</Text>
          {renderMenuOption('help-buoy-outline', 'Help Center')}
          {renderMenuOption('shield-checkmark-outline', 'Privacy Policy')}
        </View>

        {/* LOGOUT BUTTON */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.versionText}>Zonomo Provider App v1.0.0</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A2540',
  },
  profileHeader: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  providerName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0A2540',
    marginBottom: 4,
  },
  providerEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 16,
    width: '90%',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A2540',
    marginTop: 6,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#EAEAEA',
  },
  menuSection: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#888',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  menuOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(92, 225, 230, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0A2540',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  versionText: {
    fontSize: 12,
    color: '#CCC',
  },
});
