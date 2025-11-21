import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { Brain, Lock, Sparkles } from 'lucide-react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const isSmallScreen = SCREEN_WIDTH < 360;
const isMediumScreen = SCREEN_WIDTH >= 360 && SCREEN_WIDTH < 400;
const isShortScreen = SCREEN_HEIGHT < 700;

const getResponsiveSize = (small: number, medium: number, large: number) => {
  if (isSmallScreen) return small;
  if (isMediumScreen) return medium;
  return large;
};

export default function OnboardingSlide3() {
  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0, scale: 0.9, rotateY: '15deg' }}
        animate={{ opacity: 1, scale: 1, rotateY: '0deg' }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 80,
          delay: 200,
        }}
        style={styles.heroContainer}
      >
        <View style={styles.mainCard}>
          <MotiView
            from={{ scale: 0, rotate: '-180deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            transition={{
              type: 'spring',
              damping: 12,
              stiffness: 100,
              delay: 400,
            }}
            style={styles.brainIconWrapper}
          >
            <Brain size={iconSize} color="#f59e0b" strokeWidth={1.5} />
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ delay: 600, duration: 400 }}
            style={[styles.badge, styles.badgeLeft]}
          >
            <Lock size={badgeIconSize} color="#f59e0b" strokeWidth={2} />
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateX: 20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ delay: 700, duration: 400 }}
            style={[styles.badge, styles.badgeRight]}
          >
            <Sparkles size={badgeIconSize} color="#f59e0b" strokeWidth={2} />
          </MotiView>
        </View>

        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1.3 }}
          transition={{
            type: 'timing',
            duration: 2500,
            loop: true,
            repeatReverse: true,
          }}
          style={styles.glowEffect}
        />
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600, delay: 800 }}
        style={styles.textContainer}
      >
        <Text style={styles.title}>Smart & Private</Text>
        <Text style={styles.description}>
          AI-powered insights with total privacy.
        </Text>
      </MotiView>
    </View>
  );
}

const cardSize = getResponsiveSize(160, 180, 200);
const iconWrapperSize = getResponsiveSize(80, 90, 100);
const badgeSize = getResponsiveSize(36, 40, 44);
const iconSize = getResponsiveSize(44, 50, 56);
const badgeIconSize = getResponsiveSize(14, 15, 16);
const glowSize = getResponsiveSize(220, 250, 280);
const heroHeight = isShortScreen ? getResponsiveSize(200, 230, 260) : getResponsiveSize(240, 260, 280);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: getResponsiveSize(20, 24, 32),
  },
  heroContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: isShortScreen ? 40 : 60,
    height: heroHeight,
  },
  mainCard: {
    width: cardSize,
    height: cardSize,
    borderRadius: getResponsiveSize(20, 24, 28),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: isSmallScreen ? 8 : 12 },
    shadowOpacity: 0.25,
    shadowRadius: isSmallScreen ? 20 : 24,
    position: 'relative',
  },
  brainIconWrapper: {
    width: iconWrapperSize,
    height: iconWrapperSize,
    borderRadius: iconWrapperSize / 2,
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    width: badgeSize,
    height: badgeSize,
    borderRadius: badgeSize / 2,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  badgeLeft: {
    left: getResponsiveSize(-8, -9, -10),
    top: getResponsiveSize(30, 35, 40),
  },
  badgeRight: {
    right: getResponsiveSize(-8, -9, -10),
    bottom: getResponsiveSize(30, 35, 40),
  },
  glowEffect: {
    position: 'absolute',
    width: glowSize,
    height: glowSize,
    borderRadius: glowSize / 2,
    backgroundColor: '#f59e0b',
    zIndex: -1,
  },
  textContainer: {
    alignItems: 'center',
    maxWidth: SCREEN_WIDTH - 80,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: getResponsiveSize(28, 32, 36),
    fontWeight: '700',
    color: '#1a1a2e',
    textAlign: 'center',
    marginBottom: isShortScreen ? 12 : 16,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: getResponsiveSize(15, 16, 17),
    fontWeight: '400',
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: getResponsiveSize(22, 24, 26),
  },
});
