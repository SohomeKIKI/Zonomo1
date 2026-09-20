import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Share } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { customerService } from '../../../services/customerService';

export default function ProviderProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const [provider, setProvider] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleShare = async () => {
    try {
      if (provider) {
        await Share.share({
          message: `Check out ${provider.name} on Zonomo!`,
        });
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchProvider = async () => {
      setIsLoading(true);
      try {
        const data = await customerService.getProviderDetails(id as string);
        setProvider(data);
      } catch (error) {
        console.error('Failed to fetch provider details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      fetchProvider();
    }
  }, [id]);

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
      {/* HEADER SECTION */}
      <View style={styles.headerBackground}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileHeader}>
          <View style={styles.profileAvatarContainer}>
            {/* Placeholder for actual image */}
            <View style={styles.profileAvatarPlaceholder}>
              <Ionicons name="person" size={40} color="#999" />
            </View>
          </View>
          <View style={styles.profileHeaderInfo}>
            <Text style={styles.profileName}>{provider.name}</Text>
            {provider.isVerified && (
              <View style={styles.verifiedBadgeContainer}>
                <Ionicons name="shield-checkmark" size={14} color="#00C49F" />
                <Text style={styles.verifiedBadgeText}>Verified Professional</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContentContainer} showsVerticalScrollIndicator={false}>
        
        {/* STATS ROW */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="construct-outline" size={24} color="#00838F" style={styles.statIcon} />
            <View>
              <Text style={styles.statLabel}>Jobs</Text>
              <Text style={styles.statLabel}>Completed</Text>
              <Text style={styles.statValue}>{provider.jobsCompleted}</Text>
            </View>
          </View>
          
          <View style={styles.statCard}>
            <Ionicons name="star" size={24} color="#F5A623" style={styles.statIcon} />
            <View>
              <Text style={styles.statLabel}>Client Rating</Text>
              <View style={styles.ratingValueRow}>
                <Text style={styles.statValue}>{provider.rating}</Text>
                <Text style={styles.statSubValue}> ({provider.reviewsCount})</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ABOUT SECTION */}
        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>{provider.about}</Text>
          
          {provider.specialties && provider.specialties.length > 0 && (
            <>
              <Text style={styles.subSectionTitle}>Specialties</Text>
              <View style={styles.chipsContainer}>
                {provider.specialties.map((spec: string, index: number) => (
                  <View key={index} style={styles.chip}>
                    <Text style={styles.chipText}>{spec}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {provider.languages && provider.languages.length > 0 && (
            <>
              <Text style={styles.subSectionTitle}>Languages</Text>
              <View style={styles.chipsContainer}>
                {provider.languages.map((lang: string, index: number) => (
                  <View key={index} style={styles.chip}>
                    <Text style={styles.chipText}>{lang}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>

        {/* REVIEWS SECTION */}
        <View style={styles.reviewsHeaderContainer}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.reviewsScrollContainer}>
          {provider.reviews?.map((review: any) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewCardHeader}>
                <View style={styles.reviewAvatar}>
                  <Text style={styles.reviewAvatarText}>{review.avatarText}</Text>
                </View>
                <View style={styles.reviewHeaderInfo}>
                  <Text style={styles.reviewName}>{review.name}</Text>
                  <View style={styles.reviewStars}>
                    {[1,2,3,4,5].map((star) => (
                      <Ionicons 
                        key={star} 
                        name={star <= Math.floor(review.rating) ? "star" : (star - 0.5 <= review.rating ? "star-half" : "star-outline")} 
                        size={14} 
                        color="#00838F" 
                      />
                    ))}
                  </View>
                </View>
              </View>
              <Text style={styles.reviewText} numberOfLines={3}>{review.text}</Text>
            </View>
          ))}
        </ScrollView>
        
        {/* ADDING EXTRA PADDING AT BOTTOM FOR FIXED FOOTER */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FIXED FOOTER */}
      <View style={styles.fixedFooter}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push({ pathname: '/(customer)/booking/book-slot', params: { providerId: provider.id } })}
        >
          <Ionicons name="cash-outline" size={20} color="#FFFFFF" style={{marginRight: 8}} />
          <Text style={styles.primaryButtonText}>Request Service</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
          <Ionicons name="share-social-outline" size={24} color="#0A2540" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/(customer)/(tabs)/profile')}>
          <View style={[styles.navAvatarSmall, { marginLeft: 0 }]}>
            <Text style={{fontSize: 12, fontWeight: 'bold'}}>M</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="chatbox-ellipses-outline" size={24} color="#0A2540" />
        </TouchableOpacity>
      </View>
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
  headerBackground: {
    backgroundColor: '#1C2A44',
    paddingBottom: 24,
  },
  headerTopRow: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navAvatarSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#9CA3AF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16, // Reduced from 64 since we have a proper top row now
  },
  profileAvatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    padding: 3,
    marginRight: 16,
  },
  profileAvatarPlaceholder: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  verifiedBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 196, 159, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(0, 196, 159, 0.3)',
  },
  verifiedBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#00C49F',
    marginLeft: 6,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  statIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginTop: 4,
  },
  ratingValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  statSubValue: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 2,
  },
  cardSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A2540',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 20,
  },
  subSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 10,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    backgroundColor: '#E0F2F1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  chipText: {
    color: '#2E5BFF', // Used blue text from screenshot roughly
    fontSize: 12,
    fontWeight: '600',
  },
  reviewsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  viewAllText: {
    color: '#00838F',
    fontWeight: '600',
    fontSize: 14,
  },
  reviewsScrollContainer: {
    gap: 12,
    paddingBottom: 8,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: 260,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  reviewCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  reviewAvatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
  },
  reviewHeaderInfo: {
    flex: 1,
  },
  reviewName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  reviewStars: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewText: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  fixedFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 32, // Safe area padding
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#00695C',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  iconButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  }
});
