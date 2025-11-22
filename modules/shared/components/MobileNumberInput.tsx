import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Phone } from 'lucide-react-native';

interface MobileNumberInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  onSubmit?: () => void;
}

export default function MobileNumberInput({ value, onChangeText, error, onSubmit }: MobileNumberInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const isValid = value.length === 10 && /^\d+$/.test(value);
  const hasValue = value.length > 0;

  return (
    <View style={styles.container}>
      <MotiView
        animate={{
          borderColor: error
            ? 'rgba(255, 107, 107, 0.6)'
            : isFocused
            ? 'rgba(183, 148, 246, 0.4)'
            : 'rgba(255, 255, 255, 0.08)',
          shadowOpacity: isFocused ? 0.2 : 0,
        }}
        transition={{
          type: 'timing',
          duration: 250,
        }}
        style={[styles.inputContainer, isFocused && styles.inputFocused]}
      >
        <View style={styles.iconWrapper}>
          <Phone
            size={18}
            color={isFocused ? '#b794f6' : hasValue ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.3)'}
            strokeWidth={1.8}
          />
        </View>

        <View style={styles.inputWrapper}>
          <MotiView
            animate={{
              translateY: hasValue || isFocused ? -8 : 0,
              scale: hasValue || isFocused ? 0.85 : 1,
            }}
            transition={{
              type: 'timing',
              duration: 250,
            }}
            style={styles.labelContainer}
          >
            <Text style={[
              styles.label,
              (hasValue || isFocused) && styles.labelFloating,
              isFocused && styles.labelFocused,
            ]}>
              Mobile Number
            </Text>
          </MotiView>

          <View style={styles.inputRow}>
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChangeText}
              keyboardType="phone-pad"
              maxLength={10}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onSubmitEditing={onSubmit}
              returnKeyType="done"
              selectionColor="rgba(183, 148, 246, 0.5)"
              placeholder="0000000000"
              placeholderTextColor="rgba(255, 255, 255, 0.15)"
            />
          </View>
        </View>

        {isValid && (
          <MotiView
            from={{ scale: 0, opacity: 0, rotate: '-45deg' }}
            animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
            transition={{
              type: 'spring',
              damping: 12,
              stiffness: 150,
            }}
            style={styles.checkmark}
          >
            <View style={styles.checkmarkCircle}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          </MotiView>
        )}
      </MotiView>

      {error && (
        <MotiView
          from={{ opacity: 0, translateY: -4 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'timing',
            duration: 200,
          }}
          style={styles.errorContainer}
        >
          <Text style={styles.errorText}>{error}</Text>
        </MotiView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 18,
    minHeight: 68,
    shadowColor: '#b794f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    shadowRadius: 12,
    elevation: 0,
  },
  inputFocused: {
    elevation: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  iconWrapper: {
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
    height: 56,
  },
  labelContainer: {
    position: 'absolute',
    left: 0,
    top: 12,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.4)',
    letterSpacing: -0.3,
  },
  labelFloating: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  labelFocused: {
    color: '#b794f6',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 56,
  },
  countryCode: {
    fontSize: 16,
    fontFamily: 'DMSans-Medium',
    color: 'rgba(255, 255, 255, 0.85)',
    marginRight: 8,
    letterSpacing: -0.2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'DMSans-Medium',
    color: '#FFFFFF',
    letterSpacing: 0.2,
    padding: 0,
    lineHeight: 24,
  },
  checkmark: {
    marginLeft: 8,
  },
  checkmarkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(138, 202, 160, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(138, 202, 160, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(138, 202, 160, 1)',
  },
  errorContainer: {
    marginTop: 8,
    paddingLeft: 4,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 107, 107, 0.9)',
    letterSpacing: -0.2,
  },
});
