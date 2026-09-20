import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ImageBackground } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40; // 20 padding on each side to align with scrollContent

const ads = [
  {
    id: '1',
    title: 'Expert Help\nFor Your Home',
    subtitle: 'SERVICES NEARBY',
    image: require('../assets/images/ad_home.jpg'),
  },
  {
    id: '2',
    title: 'Fast & Reliable\nService',
    subtitle: 'QUICK SUPPORT',
    image: require('../assets/images/ad_worker.jpg'),
  },
  {
    id: '3',
    title: 'Top Rated\nProfessionals',
    subtitle: 'VERIFIED',
    image: require('../assets/images/ad_tools.jpg'),
  },
];

export default function HorizontalAdsCarousel() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= ads.length) {
        nextIndex = 0;
      }
      scrollViewRef.current?.scrollTo({ x: nextIndex * CARD_WIDTH, animated: true });
      setActiveIndex(nextIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActiveIndex(Math.round(index));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={{ width: CARD_WIDTH }}
      >
        {ads.map((ad, index) => (
          <View key={ad.id} style={{ width: CARD_WIDTH }}>
            <ImageBackground
              source={ad.image}
              style={styles.imageBackground}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.overlay}>
                <Text style={styles.subtitle}>{ad.subtitle}</Text>
                <Text style={styles.title}>{ad.title}</Text>
              </View>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {ads.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
  },
  imageStyle: {
    borderRadius: 16,
  },
  overlay: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Very subtle overlay
    borderRadius: 16,
  },
  subtitle: {
    color: '#00E5FF', 
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#0a7ea4',
    width: 20,
  },
  inactiveDot: {
    backgroundColor: '#D1D5DB',
  },
});
