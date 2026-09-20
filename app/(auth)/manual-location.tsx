import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const SUGGESTIONS = [
  { id: '1', title: 'High Street', subtitle: 'Central London, Greater London, W1' },
  { id: '2', title: 'Queens Road', subtitle: 'Cheetham Hill, Manchester, M8' },
  { id: '3', title: 'Victoria Square', subtitle: 'Birmingham City Centre, B1' },
  { id: '4', title: 'Church Lane', subtitle: 'Headington, Oxford, OX3' },
];

export default function ManualLocationScreen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: typeof SUGGESTIONS[0] }) => (
    <TouchableOpacity 
      style={styles.suggestionItem}
      onPress={() => {
        // Save logic here
        router.replace('/(auth)/login');
      }}
    >
      <View style={styles.pinContainer}>
        <MaterialIcons name="location-pin" size={20} color="#00A86B" />
      </View>
      <View style={styles.suggestionTextContainer}>
        <Text style={styles.suggestionTitle}>{item.title}</Text>
        <Text style={styles.suggestionSubtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#0A1C3B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Address</Text>
        <View style={{ width: 24 }} />
        {/* Spacer */}
      </View>

      <View style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#8A94A6" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search for your area..."
            placeholderTextColor="#8A94A6"
          />
        </View>

        {/* Current Location Option */}
        <TouchableOpacity 
          style={styles.currentLocationBtn}
          onPress={() => {
            // Fetch GPS location
            router.replace('/(auth)/login');
          }}
        >
          <View style={styles.currentLocIconBox}>
            <MaterialIcons name="my-location" size={20} color="#00A86B" />
          </View>
          <View style={styles.currentLocTextContainer}>
            <Text style={styles.currentLocTitle}>Current Location</Text>
            <Text style={styles.currentLocSubtitle}>Enable location for better results</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#C4C9D3" />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>SUGGESTIONS</Text>

        <FlatList
          data={SUGGESTIONS}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.disabledButton}>
          <Text style={styles.disabledButtonText}>Save and Continue</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A1C3B',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#0A1C3B',
  },
  currentLocationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  currentLocIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6FFF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  currentLocTextContainer: {
    flex: 1,
  },
  currentLocTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A1C3B',
    marginBottom: 2,
  },
  currentLocSubtitle: {
    fontSize: 13,
    color: '#8A94A6',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#5C6B81',
    letterSpacing: 1,
    marginBottom: 16,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  pinContainer: {
    marginTop: 2,
    marginRight: 16,
  },
  suggestionTextContainer: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0A1C3B',
    marginBottom: 4,
  },
  suggestionSubtitle: {
    fontSize: 13,
    color: '#8A94A6',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F2F5',
    backgroundColor: '#FFFFFF',
  },
  disabledButton: {
    backgroundColor: '#E8EAED',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButtonText: {
    color: '#A0AABF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
