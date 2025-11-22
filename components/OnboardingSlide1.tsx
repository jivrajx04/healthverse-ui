import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { MotiView } from 'moti';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const isSmallScreen = SCREEN_WIDTH < 360;
const isMediumScreen = SCREEN_WIDTH >= 360 && SCREEN_WIDTH < 400;
const isShortScreen = SCREEN_HEIGHT < 700;

const getResponsiveSize = (small: number, medium: number, large: number) => {
  if (isSmallScreen) return small;
  if (isMediumScreen) return medium;
  return large;
};

export default function OnboardingSlide1() {
  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0, translateY: -30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 800, delay: 200 }}
        style={styles.heroContainer}
      >
        <MotiView
          from={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 400,
          }}
          style={styles.imageContainer}
        >
          <Image
            source={require('../assets/images/Gemini_Generated_Image_lf4jhdlf4jhdlf4j.png')}
            style={styles.doctorImage}
            resizeMode="cover"
          />
        </MotiView>

        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.15, scale: 1.2 }}
          transition={{
            type: 'timing',
            duration: 2000,
            loop: true,
            repeatReverse: true,
          }}
          style={styles.glowCircle}
        />
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600, delay: 600 }}
        style={styles.textContainer}
      >
        <Text style={styles.title}>Welcome to HealthOverse</Text>
        <Text style={styles.description}>
          Your complete medical history,{"\n"}
          unified in one secure place
        </Text>
      </MotiView>
    </View>
  );
}

const imageSize = getResponsiveSize(200, 240, 280);
const glowSize = getResponsiveSize(240, 280, 340);
const heroHeight = isShortScreen ? getResponsiveSize(240, 280, 320) : getResponsiveSize(280, 320, 360);

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
  imageContainer: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: isSmallScreen ? 3 : 4,
    borderColor: 'rgba(59, 130, 246, 0.35)',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: isSmallScreen ? 8 : 12 },
    shadowOpacity: 0.3,
    shadowRadius: isSmallScreen ? 16 : 20,
    elevation: 12,
  },
  doctorImage: {
    width: '100%',
    height: '100%',
  },
  glowCircle: {
    position: 'absolute',
    width: glowSize,
    height: glowSize,
    borderRadius: glowSize / 2,
    backgroundColor: '#3b82f6',
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
