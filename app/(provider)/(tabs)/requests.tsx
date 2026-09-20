import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProviderRequestsScreen() {
  return (
    <View style={styles.container}>
      <Text>Requests Tab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
