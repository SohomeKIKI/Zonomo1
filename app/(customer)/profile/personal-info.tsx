import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PersonalInfoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Information</Text>
      <Text style={styles.subtitle}>Update your details here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#0A2540', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666' }
});
