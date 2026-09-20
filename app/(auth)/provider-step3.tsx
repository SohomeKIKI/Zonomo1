import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function ProviderStep3Screen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={24} color="#0A1C3B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Verification Review</Text>
          <Text style={styles.brandTitle}>ZONOMO</Text>
        </View>

        {/* Title and Progress */}
        <View style={styles.titleRow}>
          <Text style={styles.stepTextLeft}>Onboarding Status</Text>
          <Text style={styles.stepTextRight}>Step 3 of 3</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarFill} />
        </View>
        <Text style={styles.completeText}>Complete</Text>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.shieldIconContainer}>
            <MaterialIcons name="security" size={40} color="#00796B" />
            <View style={styles.checkBadge}>
              <Feather name="check" size={12} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.heroTitle}>Verification Under Review</Text>
          <Text style={styles.heroSubtitle}>
            Excellent work! Your application is now in the hands of our verification team. We prioritize hyperlocal safety and reliability.
          </Text>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <View style={styles.infoHeader}>
            <Feather name="clock" size={20} color="#00796B" style={{marginRight: 8}} />
            <Text style={styles.infoTitle}>What happens next?</Text>
          </View>
          <Text style={styles.infoBody}>
            Our team typically reviews documents within <Text style={styles.boldText}>24-48 hours.</Text> You'll receive a push notification and an email at your registered address once the process is complete.
          </Text>
        </View>

        {/* Application Summary */}
        <Text style={styles.summaryTitle}>APPLICATION SUMMARY</Text>
        
        <View style={styles.summaryCard}>
          <View style={styles.summaryIconBox}>
            <FontAwesome5 name="id-badge" size={20} color="#0A1C3B" />
          </View>
          <View style={styles.summaryTexts}>
            <Text style={styles.summaryCardTitle}>Identity Verification</Text>
            <Text style={styles.summaryCardSubtitle}>Gov-issued ID & Selfie</Text>
          </View>
          <View style={styles.inReviewBadge}>
            <MaterialIcons name="access-time" size={12} color="#D97706" style={{marginRight: 4}}/>
            <Text style={styles.inReviewText}>In Review</Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryIconBox}>
            <FontAwesome5 name="briefcase" size={20} color="#0A1C3B" />
          </View>
          <View style={styles.summaryTexts}>
            <Text style={styles.summaryCardTitle}>Business Details</Text>
            <Text style={styles.summaryCardSubtitle}>Service Area & Bio</Text>
          </View>
          <View style={styles.inReviewBadge}>
            <MaterialIcons name="access-time" size={12} color="#D97706" style={{marginRight: 4}}/>
            <Text style={styles.inReviewText}>In Review</Text>
          </View>
        </View>

        {/* Dashboard Button */}
        <TouchableOpacity 
          style={styles.dashboardBtn}
          onPress={() => {
            const useAuthStore = require('../../store/authStore').useAuthStore;
            useAuthStore.getState().login('mock-token', 'provider');
            router.replace('/(provider)/(tabs)');
          }}
        >
          <Text style={styles.dashboardBtnText}>Go to Dashboard</Text>
          <MaterialIcons name="dashboard" size={18} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Links */}
        <TouchableOpacity style={styles.linkRow}>
          <Feather name="help-circle" size={16} color="#00796B" style={{marginRight: 6}} />
          <Text style={styles.linkTextGreen}>View Verification FAQ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkRow}>
          <Text style={styles.linkTextGray}>Need help? Contact Support</Text>
        </TouchableOpacity>

      </ScrollView>
      
      {/* Visual Bottom Tab Bar (Static Mockup) */}
      <View style={styles.bottomTabBar}>
        <View style={styles.tabItem}>
          <Feather name="clipboard" size={24} color="#0A1C3B" />
          <Text style={styles.tabTextActive}>Onboarding</Text>
        </View>
        <View style={styles.tabItem}>
          <Feather name="headphones" size={24} color="#8A94A6" />
          <Text style={styles.tabTextInactive}>Support</Text>
        </View>
        <View style={styles.tabItem}>
          <Feather name="help-circle" size={24} color="#8A94A6" />
          <Text style={styles.tabTextInactive}>Help</Text>
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A1C3B',
    flex: 1,
    textAlign: 'center',
    marginLeft: -10, // balance the back button
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0A1C3B',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  stepTextLeft: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A1C3B',
  },
  stepTextRight: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A1C3B',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#EEF2F6',
    borderRadius: 2,
    marginBottom: 6,
  },
  progressBarFill: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00796B',
    borderRadius: 2,
  },
  completeText: {
    fontSize: 12,
    color: '#00796B',
    textAlign: 'right',
    fontWeight: '600',
    marginBottom: 32,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  shieldIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E6F4F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  checkBadge: {
    position: 'absolute',
    bottom: 18,
    right: 22,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#00796B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E6F4F1',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0A1C3B',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#8A94A6',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  infoBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A1C3B',
  },
  infoBody: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#0A1C3B',
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0A1C3B',
    letterSpacing: 1,
    marginBottom: 16,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  summaryIconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  summaryTexts: {
    flex: 1,
  },
  summaryCardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0A1C3B',
    marginBottom: 4,
  },
  summaryCardSubtitle: {
    fontSize: 13,
    color: '#8A94A6',
  },
  inReviewBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  inReviewText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#D97706',
  },
  dashboardBtn: {
    backgroundColor: '#00796B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 24,
  },
  dashboardBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  linkTextGreen: {
    fontSize: 14,
    color: '#00796B',
  },
  linkTextGray: {
    fontSize: 14,
    color: '#8A94A6',
  },
  bottomTabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F2F5',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabTextActive: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0A1C3B',
    marginTop: 4,
  },
  tabTextInactive: {
    fontSize: 10,
    color: '#8A94A6',
    marginTop: 4,
  }
});
