import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Heart, Activity } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function PremiumHealthIcon() {
  return (
    <View style={styles.container}>
      <MotiView
        from={{ scale: 0.95, opacity: 0.4 }}
        animate={{ scale: 1.05, opacity: 0.6 }}
        transition={{
          type: 'timing',
          duration: 3000,
          loop: true,
          repeatReverse: true,
        }}
        style={styles.glowOuter}
      />

      <MotiView
        from={{ scale: 0.9, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 0.7 }}
        transition={{
          type: 'timing',
          duration: 2500,
          loop: true,
          repeatReverse: true,
        }}
        style={styles.glowMiddle}
      />

      <MotiView
        from={{ scale: 0.8, rotate: '0deg' }}
        animate={{ scale: 1, rotate: '0deg' }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 100,
          delay: 300,
        }}
        style={styles.iconWrapper}
      >
        <LinearGradient
          colors={['rgba(138, 102, 208, 0.12)', 'rgba(72, 61, 139, 0.08)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientCircle}
        >
          <View style={styles.iconBorder}>
            <View style={styles.iconInner}>
              <View style={styles.heartIconWrapper}>
                <Heart size={32} color="#b794f6" strokeWidth={1.5} fill="rgba(183, 148, 246, 0.15)" />
              </View>

              <MotiView
                from={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'timing',
                  duration: 800,
                  delay: 600,
                }}
                style={styles.activityBadge}
              >
                <LinearGradient
                  colors={['rgba(10, 14, 31, 0.95)', 'rgba(26, 21, 53, 0.95)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.badgeGradient}
                >
                  <Activity size={14} color="#b794f6" strokeWidth={2} />
                </LinearGradient>
              </MotiView>
            </View>
          </View>
        </LinearGradient>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowOuter: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(138, 102, 208, 0.15)',
  },
  glowMiddle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(138, 102, 208, 0.2)',
  },
  iconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  gradientCircle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBorder: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(183, 148, 246, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconInner: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heartIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityBadge: {
    position: 'absolute',
    bottom: -12,
    right: -12,
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(183, 148, 246, 0.4)',
    shadowColor: '#8a66d0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  badgeGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
