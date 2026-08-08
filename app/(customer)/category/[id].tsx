import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Define Types
export interface Subcategory {
  id: string;
  name: string;
}

export interface Provider {
  id: string;
  name: string;
  initials: string;
  serviceId: string;
  serviceName: string;
  rating: number;
  reviews: number;
  distance: string;
  price: string;
  isOnline: boolean;
  lastSeen?: string;
}

import { useEffect } from 'react';

// Mock Data (Placeholders for Backend Data)
const categoryData: Record<string, { subcategories: Subcategory[], providers: Provider[] }> = {
  'repairs-and-fixes': {
    subcategories: [
      { id: 'all', name: 'All' },
      { id: 'elec', name: 'Electrician' },
      { id: 'plumb', name: 'Plumber' },
      { id: 'carp', name: 'Carpenter' },
      { id: 'ac', name: 'AC Repair' }
    ],
    providers: [
      {
        id: '1',
        name: 'Rajesh Kumar',
        initials: 'RK',
        serviceId: 'elec',
        serviceName: 'Expert Electrician',
        rating: 4.8,
        reviews: 120,
        distance: '2.5 km away',
        price: '₹250/hr',
        isOnline: true,
      },
      {
        id: '2',
        name: 'Amit Singh',
        initials: 'AS',
        serviceId: 'plumb',
        serviceName: 'Master Plumber',
        rating: 4.9,
        reviews: 84,
        distance: '1.8 km away',
        price: '₹300/hr',
        isOnline: true,
      },
      {
        id: '3',
        name: 'Vikram Sharma',
        initials: 'VS',
        serviceId: 'carp',
        serviceName: 'Furniture Carpenter',
        rating: 4.7,
        reviews: 56,
        distance: '3.2 km away',
        price: '₹200/hr',
        isOnline: false,
        lastSeen: '2h',
      },
      {
        id: '4',
        name: 'Priya Patel',
        initials: 'PP',
        serviceId: 'ac',
        serviceName: 'AC Service & Repair',
        rating: 4.9,
        reviews: 150,
        distance: '1.2 km away',
        price: '₹400/hr',
        isOnline: true,
      }
    ]
  },
  'cleaning': {
    subcategories: [
      { id: 'all', name: 'All' },
      { id: 'home', name: 'Home Cleaning' },
      { id: 'pest', name: 'Pest Control' },
      { id: 'car', name: 'Car Cleaning' }
    ],
    providers: [
      {
        id: 'c1',
        name: 'Neha Sharma',
        initials: 'NS',
        serviceId: 'home',
        serviceName: 'Deep Home Cleaning',
        rating: 4.8,
        reviews: 95,
        distance: '1.5 km away',
        price: '₹500/hr',
        isOnline: true,
      },
      {
        id: 'c2',
        name: 'Suresh Verma',
        initials: 'SV',
        serviceId: 'pest',
        serviceName: 'Professional Pest Control',
        rating: 4.6,
        reviews: 62,
        distance: '3.0 km away',
        price: '₹800/service',
        isOnline: false,
        lastSeen: '1h',
      },
      {
        id: 'c3',
        name: 'Ravi Teja',
        initials: 'RT',
        serviceId: 'car',
        serviceName: 'Car Wash & Polish',
        rating: 4.9,
        reviews: 210,
        distance: '4.2 km away',
        price: '₹350/service',
        isOnline: true,
      }
    ]
  },
  'personal-care': {
    subcategories: [
      { id: 'all', name: 'All' },
      { id: 'salon', name: 'Salon at Home' },
      { id: 'beauty', name: 'Beautician' },
      { id: 'spa', name: 'Spa & Massage' }
    ],
    providers: [
      {
        id: 'p1',
        name: 'Aisha Khan',
        initials: 'AK',
        serviceId: 'beauty',
        serviceName: 'Bridal & Party Makeup',
        rating: 4.9,
        reviews: 130,
        distance: '2.1 km away',
        price: '₹1200/service',
        isOnline: true,
      },
      {
        id: 'p2',
        name: 'Sandeep Malhotra',
        initials: 'SM',
        serviceId: 'salon',
        serviceName: 'Premium Men\'s Grooming',
        rating: 4.7,
        reviews: 78,
        distance: '4.5 km away',
        price: '₹350/service',
        isOnline: false,
        lastSeen: '45m',
      },
      {
        id: 'p3',
        name: 'Pooja Reddy',
        initials: 'PR',
        serviceId: 'spa',
        serviceName: 'Relaxing Spa & Massage',
        rating: 4.8,
        reviews: 205,
        distance: '1.8 km away',
        price: '₹800/hr',
        isOnline: true,
      }
    ]
  },
  'health-and-wellness': {
    subcategories: [
      { id: 'all', name: 'All' },
      { id: 'physio', name: 'Physiotherapy' },
      { id: 'yoga', name: 'Yoga Trainer' },
      { id: 'diet', name: 'Dietitian' }
    ],
    providers: [
      {
        id: 'h1',
        name: 'Dr. Arjun Das',
        initials: 'AD',
        serviceId: 'physio',
        serviceName: 'Expert Physiotherapist',
        rating: 4.9,
        reviews: 215,
        distance: '1.2 km away',
        price: '₹1000/session',
        isOnline: true,
      },
      {
        id: 'h2',
        name: 'Simran Kaur',
        initials: 'SK',
        serviceId: 'yoga',
        serviceName: 'Certified Yoga Instructor',
        rating: 4.8,
        reviews: 142,
        distance: '3.5 km away',
        price: '₹600/hr',
        isOnline: false,
        lastSeen: '10m',
      },
      {
        id: 'h3',
        name: 'Sneha Gupta',
        initials: 'SG',
        serviceId: 'diet',
        serviceName: 'Clinical Nutritionist',
        rating: 4.7,
        reviews: 89,
        distance: '5.0 km away',
        price: '₹800/consultation',
        isOnline: true,
      }
    ]
  },
  'care-and-assist': {
    subcategories: [
      { id: 'all', name: 'All' },
      { id: 'baby', name: 'Babysitter' },
      { id: 'elder', name: 'Elder Care' },
      { id: 'nurse', name: 'Nursing Staff' }
    ],
    providers: [
      {
        id: 'ca1',
        name: 'Sunita Devi',
        initials: 'SD',
        serviceId: 'baby',
        serviceName: 'Experienced Babysitter',
        rating: 4.9,
        reviews: 215,
        distance: '1.2 km away',
        price: '₹300/hr',
        isOnline: true,
      },
      {
        id: 'ca2',
        name: 'Kishore Singh',
        initials: 'KS',
        serviceId: 'elder',
        serviceName: 'Certified Elder Caretaker',
        rating: 4.8,
        reviews: 142,
        distance: '3.5 km away',
        price: '₹500/hr',
        isOnline: false,
        lastSeen: '10m',
      },
      {
        id: 'ca3',
        name: 'Sister Mary',
        initials: 'SM',
        serviceId: 'nurse',
        serviceName: 'Registered Nurse',
        rating: 4.7,
        reviews: 89,
        distance: '5.0 km away',
        price: '₹1200/shift',
        isOnline: true,
      }
    ]
  },
  'relocation': {
    subcategories: [
      { id: 'all', name: 'All' },
      { id: 'packers', name: 'Packers & Movers' },
      { id: 'cargo', name: 'Cargo & Logistics' },
      { id: 'truck', name: 'Mini Truck Rental' }
    ],
    providers: [
      {
        id: 'r1',
        name: 'Agarwal Movers',
        initials: 'AM',
        serviceId: 'packers',
        serviceName: 'Premium Packing & Moving',
        rating: 4.9,
        reviews: 430,
        distance: '5.2 km away',
        price: '₹5000/move',
        isOnline: true,
      },
      {
        id: 'r2',
        name: 'Speed Logistics',
        initials: 'SL',
        serviceId: 'cargo',
        serviceName: 'Intercity Cargo Service',
        rating: 4.6,
        reviews: 210,
        distance: '8.5 km away',
        price: '₹2000/trip',
        isOnline: false,
        lastSeen: '2h',
      },
      {
        id: 'r3',
        name: 'Rajesh Transports',
        initials: 'RT',
        serviceId: 'truck',
        serviceName: 'Tata Ace for Hire',
        rating: 4.7,
        reviews: 155,
        distance: '3.0 km away',
        price: '₹600/trip',
        isOnline: true,
      }
    ]
  }
};

export default function CategoryDetailsScreen() {
  const router = useRouter();
  const { id, subcategoryId } = useLocalSearchParams();
  
  const categoryIdStr = typeof id === 'string' ? id : 'repairs-and-fixes';
  const initialData = categoryData[categoryIdStr] || categoryData['repairs-and-fixes'];
  const subcategoryIdStr = typeof subcategoryId === 'string' ? subcategoryId : 'all';
  
  // Component State
  const [subcategories, setSubcategories] = useState<Subcategory[]>(initialData.subcategories);
  const [providers, setProviders] = useState<Provider[]>(initialData.providers);
  const [activeSubcategoryId, setActiveSubcategoryId] = useState<string>(subcategoryIdStr);
  
  useEffect(() => {
    const newCatIdStr = typeof id === 'string' ? id : 'repairs-and-fixes';
    const newData = categoryData[newCatIdStr] || categoryData['repairs-and-fixes'];
    setSubcategories(newData.subcategories);
    setProviders(newData.providers);
    if (typeof subcategoryId === 'string' && subcategoryId) {
      setActiveSubcategoryId(subcategoryId);
    } else {
      setActiveSubcategoryId('all');
    }
  }, [id, subcategoryId]);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState<string>('default');

  // Derived state for filtered providers
  let filteredProviders = activeSubcategoryId === 'all' 
    ? [...providers] 
    : providers.filter(p => p.serviceId === activeSubcategoryId);
    
  if (sortBy === 'rating_high') {
    filteredProviders.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'price_low') {
    filteredProviders.sort((a, b) => parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, '')));
  } else if (sortBy === 'price_high') {
    filteredProviders.sort((a, b) => parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, '')));
  }

  // Format title (e.g., 'repairs-and-fixes' -> 'Repairs & Fixes')
  const getTitle = () => {
    if (id === 'repairs-and-fixes') return 'Repairs & Fixes';
    return typeof id === 'string' ? id.replace(/-/g, ' ') : 'Category';
  };

  const renderProvider = ({ item }: { item: Provider }) => (
    <View style={styles.providerCard}>
      {/* Top Row: Avatar & Name */}
      <View style={styles.providerHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.initials}</Text>
          </View>
          {item.isOnline ? (
            <View style={styles.onlineDot} />
          ) : (
            <View style={[styles.onlineDot, { backgroundColor: '#8A8A8A' }]} />
          )}
        </View>

        <View style={styles.providerInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.providerName}>{item.name}</Text>
            <View style={styles.verifiedBadge}>
              <Ionicons name="shield-checkmark" size={12} color="#00C49F" />
              <Text style={styles.verifiedText}>VERIFIED</Text>
            </View>
          </View>
          
          <Text style={styles.serviceNameText}>{item.serviceName}</Text>
          
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color="#F5A623" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewText}>({item.reviews} reviews)</Text>
          </View>

          <View style={styles.locationPriceRow}>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={14} color="#666" />
              <Text style={styles.locationText}>{item.distance}</Text>
            </View>
            <Text style={styles.priceText}>Starts at {item.price}</Text>
          </View>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{item.isOnline ? 'Online' : `Last seen ${item.lastSeen}`}</Text>
        </View>
      </View>

      {/* Bottom Row: Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.viewProfileBtn}>
          <Text style={styles.viewProfileText}>View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookNowBtn}>
          <Text style={styles.bookNowText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0A2540" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{getTitle()}</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={22} color="#0A2540" />
          </TouchableOpacity>
          <View style={styles.userAvatarSmall}>
            <Text style={styles.userAvatarSmallText}>M</Text>
          </View>
        </View>
      </View>

      {/* Subcategory Chips */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
          {subcategories.map((cat) => (
            <TouchableOpacity 
              key={cat.id}
              style={[styles.chip, activeSubcategoryId === cat.id && styles.activeChip]}
              onPress={() => setActiveSubcategoryId(cat.id)}
            >
              <Text style={[styles.chipText, activeSubcategoryId === cat.id && styles.activeChipText]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.filterChip} onPress={() => setFilterModalVisible(true)}>
            <Ionicons name="options-outline" size={16} color="#0A2540" />
            <Text style={styles.filterChipText}>Filters</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Summary Bar */}
      <View style={styles.summaryBar}>
        <Text style={styles.summaryText}>{filteredProviders.length} Professionals available</Text>
        <TouchableOpacity style={styles.moreFiltersBtn} onPress={() => setFilterModalVisible(true)}>
          <Ionicons name="options-outline" size={16} color="#00838F" />
          <Text style={styles.moreFiltersText}>More Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Provider List */}
      <FlatList
        data={filteredProviders}
        keyExtractor={item => item.id}
        renderItem={renderProvider}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Filter Modal */}
      <Modal visible={isFilterModalVisible} animationType="slide" transparent={true} onRequestClose={() => setFilterModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sort & Filter</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.filterSectionTitle}>Sort By</Text>
            
            <TouchableOpacity style={styles.filterOption} onPress={() => { setSortBy('default'); setFilterModalVisible(false); }}>
              <Text style={[styles.filterOptionText, sortBy === 'default' && styles.filterOptionTextActive]}>Recommended (Default)</Text>
              {sortBy === 'default' && <Ionicons name="checkmark" size={20} color="#00838F" />}
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.filterOption} onPress={() => { setSortBy('rating_high'); setFilterModalVisible(false); }}>
              <Text style={[styles.filterOptionText, sortBy === 'rating_high' && styles.filterOptionTextActive]}>Highest Rated</Text>
              {sortBy === 'rating_high' && <Ionicons name="checkmark" size={20} color="#00838F" />}
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterOption} onPress={() => { setSortBy('price_low'); setFilterModalVisible(false); }}>
              <Text style={[styles.filterOptionText, sortBy === 'price_low' && styles.filterOptionTextActive]}>Price: Low to High</Text>
              {sortBy === 'price_low' && <Ionicons name="checkmark" size={20} color="#00838F" />}
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterOption} onPress={() => { setSortBy('price_high'); setFilterModalVisible(false); }}>
              <Text style={[styles.filterOptionText, sortBy === 'price_high' && styles.filterOptionTextActive]}>Price: High to Low</Text>
              {sortBy === 'price_high' && <Ionicons name="checkmark" size={20} color="#00838F" />}
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#0A2540',
    textTransform: 'capitalize',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 4,
    marginRight: 12,
  },
  userAvatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarSmallText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A2540',
  },
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  chipsScroll: {
    paddingHorizontal: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  activeChip: {
    backgroundColor: '#0A2540',
    borderColor: '#0A2540',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0A2540',
  },
  activeChipText: {
    color: '#FFFFFF',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    backgroundColor: '#FFFFFF',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0A2540',
    marginLeft: 6,
  },
  summaryBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  summaryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  moreFiltersBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreFiltersText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00838F',
    marginLeft: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  providerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  providerHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1565C0',
  },
  onlineDot: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#00C49F',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  providerInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  providerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A2540',
    marginRight: 8,
  },
  serviceNameText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    fontStyle: 'italic',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2F1',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#00897B',
    marginLeft: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginLeft: 4,
    marginRight: 4,
  },
  reviewText: {
    fontSize: 13,
    color: '#666',
  },
  locationPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  priceText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0A2540',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#00838F',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewProfileBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00838F',
    marginRight: 8,
    alignItems: 'center',
  },
  viewProfileText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00838F',
  },
  bookNowBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#00838F',
    marginLeft: 8,
    alignItems: 'center',
  },
  bookNowText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 300,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0A2540',
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#333',
  },
  filterOptionTextActive: {
    color: '#00838F',
    fontWeight: '600',
  },
});
