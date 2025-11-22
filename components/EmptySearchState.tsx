import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { SearchX } from 'lucide-react-native';
import { useTheme, lightTheme, darkTheme } from '../contexts/ThemeContext';

interface EmptySearchStateProps {
  message?: string;
}

export default function EmptySearchState({ message = 'No doctors found. Try another search.' }: EmptySearchStateProps) {
  const { isDark } = useTheme();
  const colors = isDark ? darkTheme : lightTheme;

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 15, delay: 100 }}
      style={styles.container}
    >
      <View style={[styles.content, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 400, delay: 200 }}
          style={[styles.iconContainer, { backgroundColor: colors.accentLight }]}
        >
          <SearchX size={48} color={colors.accent} strokeWidth={1.5} />
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 400, delay: 300 }}
        >
          <Text style={[styles.message, { color: colors.text }]}>{message}</Text>
          <Text style={[styles.hint, { color: colors.textTertiary }]}>
            Try searching for a different doctor, hospital, or specialty
          </Text>
        </MotiView>
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  content: {
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    maxWidth: 400,
    width: '100%',
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  message: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 24,
  },
  hint: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 20,
  },
});
