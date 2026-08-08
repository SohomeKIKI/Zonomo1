import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CustomerHomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchMap = [
    { keywords: ['plumb', 'pipe', 'leak', 'water'], categoryId: 'repairs-and-fixes', subcategoryId: 'plumb', displayName: 'Plumber' },
    { keywords: ['electric', 'wire', 'light', 'fan', 'switch'], categoryId: 'repairs-and-fixes', subcategoryId: 'elec', displayName: 'Electrician' },
    { keywords: ['carpenter', 'wood', 'furniture', 'bed', 'door'], categoryId: 'repairs-and-fixes', subcategoryId: 'carp', displayName: 'Carpenter' },
    { keywords: ['ac', 'air condition', 'cooling'], categoryId: 'repairs-and-fixes', subcategoryId: 'ac', displayName: 'AC Repair' },
    { keywords: ['clean', 'sweep', 'mop', 'home'], categoryId: 'cleaning', subcategoryId: 'home', displayName: 'Home Cleaning' },
    { keywords: ['pest', 'bug', 'insect', 'cockroach', 'termite'], categoryId: 'cleaning', subcategoryId: 'pest', displayName: 'Pest Control' },
    { keywords: ['car', 'wash'], categoryId: 'cleaning', subcategoryId: 'car', displayName: 'Car Cleaning' },
    { keywords: ['salon', 'hair', 'cut', 'shave'], categoryId: 'personal-care', subcategoryId: 'salon', displayName: 'Salon at Home' },
    { keywords: ['beauty', 'makeup', 'facial'], categoryId: 'personal-care', subcategoryId: 'beauty', displayName: 'Beautician' },
    { keywords: ['spa', 'massage', 'relax'], categoryId: 'personal-care', subcategoryId: 'spa', displayName: 'Spa & Massage' },
    { keywords: ['physio', 'pain', 'therapy'], categoryId: 'health-and-wellness', subcategoryId: 'physio', displayName: 'Physiotherapy' },
    { keywords: ['yoga', 'fitness', 'exercise'], categoryId: 'health-and-wellness', subcategoryId: 'yoga', displayName: 'Yoga Trainer' },
    { keywords: ['diet', 'food', 'nutrition'], categoryId: 'health-and-wellness', subcategoryId: 'diet', displayName: 'Dietitian' },
    { keywords: ['baby', 'child', 'nanny'], categoryId: 'care-and-assist', subcategoryId: 'baby', displayName: 'Babysitter' },
    { keywords: ['elder', 'old', 'senior'], categoryId: 'care-and-assist', subcategoryId: 'elder', displayName: 'Elder Care' },
    { keywords: ['nurse', 'medical', 'injection'], categoryId: 'care-and-assist', subcategoryId: 'nurse', displayName: 'Nursing Staff' },
    { keywords: ['pack', 'move', 'shift', 'relocate'], categoryId: 'relocation', subcategoryId: 'packers', displayName: 'Packers & Movers' },
    { keywords: ['cargo', 'logistic', 'transport'], categoryId: 'relocation', subcategoryId: 'cargo', displayName: 'Cargo & Logistics' },
    { keywords: ['truck', 'tata ace', 'mini truck'], categoryId: 'relocation', subcategoryId: 'truck', displayName: 'Mini Truck Rental' },
  ];

  const searchSuggestions = searchQuery.length >= 2 
    ? searchMap.filter(item => item.keywords.some(k => k.includes(searchQuery.toLowerCase())))
    : [];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    const query = searchQuery.toLowerCase();
    
    // Find matching category
    const match = searchMap.find(item => 
      item.keywords.some(keyword => query.includes(keyword))
    );

    if (match) {
      router.push({
        pathname: '/category/[id]',
        params: { id: match.categoryId, subcategoryId: match.subcategoryId }
      } as any);
    } else {
      Alert.alert("No results found", "We couldn't find a specific service matching your search. Try exploring our categories!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        
        {/* Header - Location and Initial */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>M</Text>
            </View>
            <View>
              <View style={styles.locationHeaderContainer}>
                <Ionicons name="location" size={18} color="#0A2540" />
                <Text style={styles.locationTitle}>Sec 45, Noida 201303</Text>
              </View>
              <Text style={styles.greetingSubtitle}>Find the best local services today.</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#0A2540" />
          </TouchableOpacity>
        </View>

        {/* Search Bar with Suggestions */}
        <View style={{ zIndex: 10 }}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#8A8A8A" style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search for 'Plumbing', 'Yoga'..."
              placeholderTextColor="#8A8A8A"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => {
                setTimeout(() => setIsSearchFocused(false), 200);
              }}
              returnKeyType="search"
            />
          </View>

          {isSearchFocused && searchSuggestions.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {searchSuggestions.map((suggestion, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.suggestionItem}
                  onPress={() => {
                    setSearchQuery('');
                    setIsSearchFocused(false);
                    router.push({
                      pathname: '/category/[id]',
                      params: { id: suggestion.categoryId, subcategoryId: suggestion.subcategoryId }
                    } as any);
                  }}
                >
                  <Ionicons name="search-outline" size={16} color="#8A8A8A" style={{marginRight: 8}} />
                  <Text style={styles.suggestionText}>{suggestion.displayName}</Text>
                  <Text style={styles.suggestionSubText}>in {suggestion.categoryId.replace(/-/g, ' ')}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Explore Categories Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore Categories</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Categories Grid (6 Blocks) */}
        <View style={styles.categoriesGrid}>
          
          {/* Block 1: Repairs & Fixes */}
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => router.push('/category/repairs-and-fixes' as any)}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="hammer-outline" size={24} color="#1565C0" />
            </View>
            <Text style={styles.categoryName}>Repairs & Fixes</Text>
            <Text style={styles.categorySub}>• Electrician</Text>
            <Text style={styles.categorySub}>• Plumber</Text>
          </TouchableOpacity>

          {/* Block 2: Cleaning & Pest */}
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => router.push('/category/cleaning' as any)}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="sparkles-outline" size={24} color="#2E7D32" />
            </View>
            <Text style={styles.categoryName}>Cleaning</Text>
            <Text style={styles.categorySub}>• Home Cleaning</Text>
            <Text style={styles.categorySub}>• Pest Control</Text>
          </TouchableOpacity>

          {/* Block 3: Personal Care */}
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => router.push('/category/personal-care' as any)}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#FCE4EC' }]}>
              <Ionicons name="cut-outline" size={24} color="#C2185B" />
            </View>
            <Text style={styles.categoryName}>Personal Care</Text>
            <Text style={styles.categorySub}>• Salon at Home</Text>
            <Text style={styles.categorySub}>• Beautician</Text>
          </TouchableOpacity>

          {/* Block 4: Health & Wellness */}
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => router.push('/category/health-and-wellness' as any)}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="fitness-outline" size={24} color="#E65100" />
            </View>
            <Text style={styles.categoryName}>Health & Wellness</Text>
            <Text style={styles.categorySub}>• Physiotherapy</Text>
            <Text style={styles.categorySub}>• Yoga Trainer</Text>
          </TouchableOpacity>

          {/* Block 5: Care & Assist */}
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => router.push('/category/care-and-assist' as any)}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#F3E5F5' }]}>
              <Ionicons name="heart-outline" size={24} color="#6A1B9A" />
            </View>
            <Text style={styles.categoryName}>Care & Assist</Text>
            <Text style={styles.categorySub}>• Babysitter</Text>
            <Text style={styles.categorySub}>• Elder Care</Text>
          </TouchableOpacity>

          {/* Block 6: Relocation */}
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => router.push('/category/relocation' as any)}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#E0F7FA' }]}>
              <Ionicons name="cube-outline" size={24} color="#006064" />
            </View>
            <Text style={styles.categoryName}>Relocation</Text>
            <Text style={styles.categorySub}>• Packers & Movers</Text>
            <Text style={styles.categorySub}>• AC Repair</Text>
          </TouchableOpacity>

        </View>

        {/* Verified Professionals Card */}
        <View style={styles.verifiedCard}>
          <Text style={styles.verifiedTitle}>Verified Professionals Only</Text>
          <Text style={styles.verifiedText}>
            Every provider on ZONOMO undergoes a multi-step background check for your peace of mind.
          </Text>
          <View style={styles.safetyBadge}>
            <Ionicons name="shield-checkmark" size={16} color="#00C49F" />
            <Text style={styles.safetyText}>Safety Guaranteed</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A2540',
  },
  locationHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A2540',
    marginLeft: 4,
  },
  greetingSubtitle: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  verifiedCard: {
    backgroundColor: '#1B2A47',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  verifiedTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  verifiedText: {
    fontSize: 14,
    color: '#9BA5B7',
    lineHeight: 20,
    marginBottom: 20,
  },
  safetyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  safetyText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#00C49F',
    marginLeft: 6,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A2540',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00838F',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0A2540',
    marginBottom: 8,
  },
  categorySub: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 56, // below search container
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    maxHeight: 250,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  suggestionText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#0A2540',
  },
  suggestionSubText: {
    fontSize: 13,
    color: '#8A8A8A',
    marginLeft: 6,
    textTransform: 'capitalize',
  }
});
