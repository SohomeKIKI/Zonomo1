import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// --- TYPES ---
export interface ActiveJob {
  id: string;
  title: string;
  status: string; // e.g., 'In Progress', 'Upcoming (1:00 PM)'
  customerName: string;
  timeRange: string;
  distance: string;
}

export interface ProviderDashboardData {
  providerName: string;
  isOnline: boolean;
  todayEarnings: number;
  earningsGrowth: number;
  pendingRequests: number;
  activeJobsCount: number;
  activeJobs: ActiveJob[];
}

// --- MOCK DATA ---
const INITIAL_DATA: ProviderDashboardData = {
  providerName: 'Ajay',
  isOnline: true,
  todayEarnings: 245.50,
  earningsGrowth: 12,
  pendingRequests: 4,
  activeJobsCount: 2,
  activeJobs: [
    {
      id: 'j1',
      title: 'Kitchen Tap Repair',
      status: 'In Progress',
      customerName: 'Sarah Jenkins',
      timeRange: '10:00 AM - 11:30 AM',
      distance: '2.5 miles away'
    },
    {
      id: 'j2',
      title: 'Pipe Leak Inspection',
      status: 'Upcoming (1:00 PM)',
      customerName: 'Marcus Chen',
      timeRange: '1:00 PM - 2:00 PM',
      distance: '4.1 miles away'
    }
  ]
};

export default function ProviderDashboardScreen() {
  const [data, setData] = useState<ProviderDashboardData>(INITIAL_DATA);

  const toggleOnlineStatus = () => {
    setData(prev => ({ ...prev, isOnline: !prev.isOnline }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100?img=11' }}
            style={styles.avatarImage}
          />
        </View>
        <Text style={styles.headerLogo}>ZONOMO</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#0A2540" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* GREETING CARD */}
        <View style={styles.greetingCard}>
          <View style={styles.greetingTextContainer}>
            <Text style={styles.greetingTitle}>Hi, {data.providerName}</Text>
            <Text style={styles.greetingSubtitle}>Ready for today's tasks?</Text>
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.onlineText}>{data.isOnline ? 'Online' : 'Offline'}</Text>
            <Switch
              trackColor={{ false: '#E0E0E0', true: '#1DD1A1' }}
              thumbColor={'#FFFFFF'}
              ios_backgroundColor="#E0E0E0"
              onValueChange={toggleOnlineStatus}
              value={data.isOnline}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
          </View>
        </View>

        {/* EARNINGS CARD */}
        <View style={styles.earningsCard}>
          <View>
            <Text style={styles.earningsLabel}>TODAY'S EARNINGS</Text>
            <Text style={styles.earningsAmount}>₹{data.todayEarnings.toFixed(2)}</Text>
            <Text style={styles.earningsGrowth}>+{data.earningsGrowth}% from yesterday</Text>
          </View>
          <View style={styles.earningsIconBg}>
            <Ionicons name="cash-outline" size={24} color="#5CE1E6" />
          </View>
        </View>

        {/* METRICS GRID */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricLabel}>Pending</Text>
              <Ionicons name="clipboard-outline" size={20} color="#666" />
            </View>
            <Text style={styles.metricValue}>{data.pendingRequests}</Text>
            <Text style={styles.metricSub}>New Requests</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <Text style={styles.metricLabel}>Active</Text>
              <Ionicons name="briefcase-outline" size={20} color="#1DD1A1" />
            </View>
            <Text style={styles.metricValue}>{data.activeJobsCount}</Text>
            <Text style={styles.metricSub}>In Progress</Text>
          </View>
        </View>

        {/* ACTIVE JOBS SECTION */}
        {data.isOnline && (
          <View style={styles.jobsSection}>
            <View style={styles.jobsHeader}>
              <Text style={styles.jobsTitle}>Active Jobs</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.jobsList}>
              {data.activeJobs.map((job, index) => (
                <View
                  key={job.id}
                  style={[
                    styles.jobCard,
                    index === data.activeJobs.length - 1 && { borderBottomWidth: 0 }
                  ]}
                >
                  <View style={styles.jobCardHeader}>
                    <Text style={styles.jobCardTitle}>{job.title}</Text>
                    <View style={[
                      styles.statusBadge,
                      job.status.includes('Progress') ? styles.statusBadgeProgress : styles.statusBadgeUpcoming
                    ]}>
                      <Ionicons
                        name={job.status.includes('Progress') ? "time-outline" : "calendar-outline"}
                        size={12}
                        color={job.status.includes('Progress') ? "#1DD1A1" : "#5C6BC0"}
                      />
                      <Text style={[
                        styles.statusText,
                        job.status.includes('Progress') ? styles.statusTextProgress : styles.statusTextUpcoming
                      ]}>
                        {' '}{job.status}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.customerRow}>
                    <Ionicons name="person-outline" size={14} color="#666" />
                    <Text style={styles.customerName}>{job.customerName}</Text>
                  </View>

                  <View style={styles.jobDetailsRow}>
                    <View style={styles.jobDetailItem}>
                      <Ionicons name="time-outline" size={14} color="#888" />
                      <Text style={styles.jobDetailText}>{job.timeRange}</Text>
                    </View>
                    <Text style={styles.dotSeparator}>•</Text>
                    <View style={styles.jobDetailItem}>
                      <Ionicons name="location-outline" size={14} color="#888" />
                      <Text style={styles.jobDetailText}>{job.distance}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EAEAEA',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  headerLogo: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0A2540',
    letterSpacing: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  greetingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  greetingTextContainer: {
    flex: 1,
  },
  greetingTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0A2540',
    marginBottom: 4,
  },
  greetingSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1DD1A1',
    marginRight: 4,
  },
  earningsCard: {
    backgroundColor: '#1E2A4F',
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#1E2A4F',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  earningsLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8A9DDE',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  earningsAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  earningsGrowth: {
    fontSize: 13,
    color: '#5CE1E6',
    fontWeight: '600',
  },
  earningsIconBg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(92, 225, 230, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0A2540',
    marginBottom: 4,
  },
  metricSub: {
    fontSize: 12,
    color: '#888',
  },
  jobsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  jobsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  jobsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A2540',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007BFF',
  },
  jobsList: {

  },
  jobCard: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  jobCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  jobCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A2540',
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusBadgeProgress: {
    backgroundColor: '#E8FBF5',
  },
  statusBadgeUpcoming: {
    backgroundColor: '#EAEFFF',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusTextProgress: {
    color: '#1DD1A1',
  },
  statusTextUpcoming: {
    color: '#5C6BC0',
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  customerName: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  jobDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobDetailText: {
    fontSize: 13,
    color: '#888',
    marginLeft: 4,
  },
  dotSeparator: {
    color: '#CCC',
    marginHorizontal: 8,
  }
});
