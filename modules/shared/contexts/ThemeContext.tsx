import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@app_theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.log('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export const lightTheme = {
  background: ['#F8F9FF', '#FFFFFF', '#F5F7FF'],
  containerBg: '#FFFFFF',
  cardBg: 'rgba(255, 255, 255, 0.95)',
  cardBorder: 'rgba(99, 102, 241, 0.15)',
  text: '#0F172A',
  textSecondary: '#334155',
  textTertiary: '#78716C',
  iconButton: 'rgba(99, 102, 241, 0.08)',
  iconButtonBorder: 'rgba(99, 102, 241, 0.2)',
  navBg: 'rgba(255, 255, 255, 0.98)',
  navInactive: 'rgba(148, 163, 184, 0.7)',
  accent: '#6366F1',
  accentLight: 'rgba(99, 102, 241, 0.1)',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

export const darkTheme = {
  background: ['#0F172A', '#1E293B', '#1A1F3A'],
  containerBg: '#0F172A',
  cardBg: 'rgba(30, 41, 59, 0.85)',
  cardBorder: 'rgba(99, 102, 241, 0.25)',
  text: '#F8FAFC',
  textSecondary: '#CBD5E1',
  textTertiary: '#94A3B8',
  iconButton: 'rgba(99, 102, 241, 0.15)',
  iconButtonBorder: 'rgba(99, 102, 241, 0.35)',
  navBg: 'rgba(15, 23, 42, 0.95)',
  navInactive: 'rgba(71, 85, 105, 0.7)',
  accent: '#818CF8',
  accentLight: 'rgba(129, 140, 248, 0.15)',
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
};
