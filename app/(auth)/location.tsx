import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function LocationScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.content}>
        {/* Top Graphic Placeholder */}
        <View style={styles.graphicContainer}>
          <View style={styles.circleGraphic}>
            <View style={styles.innerCircle}>
              <MaterialIcons name="location-pin" size={50} color="#0A1C3B" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Verified Trust</Text>
              </View>
            </View>
            <View style={styles.shieldFloat}>
                <Feather name="shield" size={16} color="#0A1C3B" />
            </View>
            <View style={styles.checkFloat}>
                <Feather name="check-circle" size={16} color="#00A86B" />
            </View>
          </View>
        </View>

        {/* Text Content */}
        <Text style={styles.title}>Enable Location Services</Text>
        <Text style={styles.subtitle}>
          To find the best service providers near you, we need your location.
        </Text>

        {/* Privacy Card */}
        <View style={styles.privacyCard}>
          <View style={styles.iconBox}>
            <Feather name="shield" size={20} color="#00796B" />
          </View>
          <View style={styles.privacyTextContainer}>
            <Text style={styles.privacyTitle}>Your Privacy Matters</Text>
            <Text style={styles.privacyDesc}>
              We only use your location to show local pros. Your exact address is never shared without your permission.
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom Actions */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => {
            // Placeholder for GPS location fetch
            console.log('Requesting GPS...');
            router.replace('/(auth)/login');
          }}
        >
          <Text style={styles.primaryButtonText}>Allow Location</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => router.push('/(auth)/manual-location')}
        >
          <Text style={styles.secondaryButtonText}>Enter Address Manually</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          By enabling, you agree to our <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphicContainer: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  circleGraphic: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#EEF2F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#E0E7EE',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    bottom: 15,
    backgroundColor: '#00796B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  shieldFloat: {
    position: 'absolute',
    left: 10,
    bottom: 30,
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  checkFloat: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0A1C3B',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#5C6B81',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  privacyCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#E8F5F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  privacyTextContainer: {
    flex: 1,
  },
  privacyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A1C3B',
    marginBottom: 4,
  },
  privacyDesc: {
    fontSize: 12,
    color: '#5C6B81',
    lineHeight: 18,
  },
  actions: {
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#1A2B4C',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#EAECEF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  secondaryButtonText: {
    color: '#1A2B4C',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#8A94A6',
  },
  linkText: {
    textDecorationLine: 'underline',
    color: '#00796B',
  },
});
