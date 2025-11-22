import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MotiView } from 'moti';
import { Search, X, ArrowLeft } from 'lucide-react-native';
import { useTheme, lightTheme, darkTheme } from '../contexts/ThemeContext';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  onBack?: () => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChangeText, onClear, onBack, placeholder = 'Search doctor, hospital, or disease...' }: SearchBarProps) {
  const { isDark } = useTheme();
  const colors = isDark ? darkTheme : lightTheme;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <MotiView
      from={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 400 }}
      style={styles.container}
    >
        {onBack && (
          <TouchableOpacity
            onPress={onBack}
            style={[styles.backButton, { backgroundColor: colors.accentLight }]}
            activeOpacity={0.7}
          >
            <ArrowLeft size={20} color={colors.accent} strokeWidth={2} />
          </TouchableOpacity>
        )}

      <View
        style={[
          styles.searchContainer,
          { backgroundColor: colors.cardBg, borderColor: isFocused ? colors.accent : colors.cardBorder },
        ]}
      >
      
        <View style={[styles.iconWrapper, { backgroundColor: colors.accentLight }]}>
          <Search size={20} color={colors.accent} strokeWidth={2} />
        </View>

        <TextInput
          style={[styles.input, { color: colors.text }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />

        {value.length > 0 && (
          <MotiView
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'timing', duration: 200 }}
          >
            <TouchableOpacity
              onPress={onClear}
              style={[styles.clearButton, { backgroundColor: colors.textTertiary }]}
              activeOpacity={0.7}
            >
              <X size={14} color="#ffffff" strokeWidth={2.5} />
            </TouchableOpacity>
          </MotiView>
        )}
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    gap: 12,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginBottom: 5,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    paddingVertical: 4,
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
