import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BookSlotScreen() {
  const router = useRouter();
  const { providerId } = useLocalSearchParams();
  
  // Generate next 7 days
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        fullDate: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' })
      });
    }
    return dates;
  };
  
  const [dates] = useState(generateDates());
  const [selectedDate, setSelectedDate] = useState(dates[0].fullDate);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Simulated booked slots for demonstration
  const bookedSlots: Record<string, string[]> = {
    [dates[0].fullDate]: ['09:00 AM', '02:00 PM'],
    [dates[1].fullDate]: ['11:00 AM', '04:00 PM', '05:00 PM']
  };

  const currentBookedSlots = bookedSlots[selectedDate] || [];

  const timeSlots = {
    Morning: ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM'],
    Afternoon: ['12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'],
    Evening: ['04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM']
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      router.push({
        pathname: '/(customer)/booking/cart',
        params: { 
          providerId, 
          date: selectedDate, 
          time: selectedTime 
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0A2540" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Date & Time</Text>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* DATE SELECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateScroll}>
            {dates.map((dateObj) => {
              const isSelected = selectedDate === dateObj.fullDate;
              return (
                <TouchableOpacity 
                  key={dateObj.fullDate} 
                  style={[styles.dateCard, isSelected && styles.dateCardActive]}
                  onPress={() => setSelectedDate(dateObj.fullDate)}
                >
                  <Text style={[styles.dayName, isSelected && styles.textActive]}>{dateObj.dayName}</Text>
                  <Text style={[styles.dayNumber, isSelected && styles.textActive]}>{dateObj.dayNumber}</Text>
                  <Text style={[styles.monthName, isSelected && styles.textActive]}>{dateObj.month}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* TIME SELECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          
          {Object.entries(timeSlots).map(([period, slots]) => (
            <View key={period} style={styles.timePeriodGroup}>
              <Text style={styles.timePeriodTitle}>{period}</Text>
              <View style={styles.timeSlotsGrid}>
                {slots.map((time) => {
                  const isSelected = selectedTime === time;
                  const isBooked = currentBookedSlots.includes(time);
                  return (
                    <TouchableOpacity
                      key={time}
                      style={[
                        styles.timeSlotCard, 
                        isSelected && styles.timeSlotCardActive,
                        isBooked && styles.timeSlotCardBooked
                      ]}
                      onPress={() => {
                        if (!isBooked) setSelectedTime(time);
                      }}
                      disabled={isBooked}
                      activeOpacity={isBooked ? 1 : 0.2}
                    >
                      <Text style={[
                        styles.timeSlotText, 
                        isSelected && styles.textActive,
                        isBooked && styles.timeSlotTextBooked
                      ]}>{time}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
          
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.fixedFooter}>
        <TouchableOpacity 
          style={[styles.primaryButton, (!selectedDate || !selectedTime) && styles.primaryButtonDisabled]}
          disabled={!selectedDate || !selectedTime}
          onPress={handleConfirm}
        >
          <Text style={styles.primaryButtonText}>Continue to Cart</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A2540',
  },
  scrollContent: {
    flex: 1,
  },
  section: {
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  dateScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  dateCard: {
    width: 64,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  dateCardActive: {
    backgroundColor: '#00838F',
    borderColor: '#00838F',
  },
  dayName: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  monthName: {
    fontSize: 12,
    color: '#6B7280',
  },
  textActive: {
    color: '#FFFFFF',
  },
  timePeriodGroup: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  timePeriodTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 12,
  },
  timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeSlotCard: {
    width: '31%',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  timeSlotCardActive: {
    backgroundColor: '#00838F',
    borderColor: '#00838F',
  },
  timeSlotCardBooked: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
  },
  timeSlotText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  timeSlotTextBooked: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  fixedFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  primaryButton: {
    backgroundColor: '#00695C',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonDisabled: {
    backgroundColor: '#A7C0BD',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
