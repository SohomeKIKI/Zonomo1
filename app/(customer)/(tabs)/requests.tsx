import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RequestsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Requests Tab</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#0A2540' }
});
