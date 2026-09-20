import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AddressesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Addresses</Text>
      <Text style={styles.subtitle}>Manage your locations.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#0A2540', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666' }
});
