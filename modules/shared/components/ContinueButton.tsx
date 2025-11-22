import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';

interface ContinueButtonProps {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function ContinueButton({ onPress, disabled = false, loading = false }: ContinueButtonProps) {
  return (
    <MotiView
      animate={{
        opacity: disabled ? 0.5 : 1,
        scale: disabled ? 0.98 : 1,
      }}
      transition={{
        type: 'timing',
        duration: 250,
      }}
      style={styles.wrapper}
    >
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={styles.container}
      >
        <MotiView
          animate={{
            scale: disabled ? 1 : 1,
          }}
          transition={{
            type: 'spring',
            damping: 15,
          }}
          style={styles.buttonWrapper}
        >
          <LinearGradient
            colors={disabled ? ['rgba(183, 148, 246, 0.3)', 'rgba(138, 102, 208, 0.3)'] : ['#b794f6', '#8a66d0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <View style={styles.glossOverlay} />

            {loading ? (
              <ActivityIndicator size="small" color="rgba(10, 14, 31, 0.9)" />
            ) : (
              <Text style={styles.text} allowFontScaling={false}>Continue</Text>
            )}
          </LinearGradient>
        </MotiView>
      </TouchableOpacity>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  container: {
    width: '100%',
    height: 58,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#8a66d0',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 12,
  },
  buttonWrapper: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  glossOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  text: {
    fontSize: 16,
    fontFamily: 'PlusJakarta-Bold',
    color: 'rgba(10, 14, 31, 0.95)',
    letterSpacing: -0.4,
  },
});
