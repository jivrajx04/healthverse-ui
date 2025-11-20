import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Users, Heart, Shield } from 'lucide-react-native';

const features = [
  { icon: Users, delay: 400 },
  { icon: Heart, delay: 600 },
  { icon: Shield, delay: 800 },
];

export default function OnboardingSlide2() {
  return (
    <View style={styles.container}>
      <MotiView style={styles.heroContainer}>
        <View style={styles.cardsContainer}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <MotiView
                key={index}
                from={{ opacity: 0, translateY: 40, scale: 0.8 }}
                animate={{ opacity: 1, translateY: 0, scale: 1 }}
                transition={{
                  type: 'spring',
                  damping: 12,
                  stiffness: 90,
                  delay: feature.delay,
                }}
                style={[
                  styles.card,
                  index === 1 && styles.cardCenter,
                ]}
              >
                <View style={styles.iconWrapper}>
                  <Icon size={32} color="#a855f7" strokeWidth={2} />
                </View>
              </MotiView>
            );
          })}
        </View>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600, delay: 1000 }}
        style={styles.textContainer}
      >
        <Text style={styles.title}>Care for Family</Text>
        <Text style={styles.description}>
          Manage every member in one secure app.
        </Text>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  heroContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
    height: 280,
  },
  cardsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  card: {
    width: 90,
    height: 120,
    borderRadius: 24,
    backgroundColor: 'rgba(45, 27, 61, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ec4899',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 6,
  },
  cardCenter: {
    height: 140,
    backgroundColor: 'rgba(168, 85, 247, 0.15)',
    borderColor: 'rgba(168, 85, 247, 0.4)',
    transform: [{ translateY: -10 }],
    shadowColor: '#a855f7',
    shadowOpacity: 0.5,
    shadowRadius: 24,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    maxWidth: 320,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 17,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 26,
  },
});
