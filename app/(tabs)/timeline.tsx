import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { Clock, Upload, FileText, Pill, Receipt, FileHeart, Sun, Moon, Home, Search, Calendar, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTheme, lightTheme, darkTheme } from '../../contexts/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface TimelineEvent {
  id: string;
  type: 'report' | 'prescription' | 'invoice' | 'discharge' | 'consultation';
  title: string;
  date: string;
  timestamp: number;
  description: string;
}

export default function TimelineScreen() {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();
  const colors = isDark ? darkTheme : lightTheme;

  const [events, setEvents] = useState<TimelineEvent[]>([
    {
      id: '1',
      type: 'report',
      title: 'Blood Work Complete',
      date: 'Jan 15, 2025',
      timestamp: Date.now() - 86400000 * 5,
      description: 'Complete Blood Count analysis results',
    },
    {
      id: '2',
      type: 'prescription',
      title: 'New Medication',
      date: 'Jan 12, 2025',
      timestamp: Date.now() - 86400000 * 8,
      description: 'Diabetes medication prescribed',
    },
    {
      id: '3',
      type: 'consultation',
      title: 'Cardiology Checkup',
      date: 'Jan 8, 2025',
      timestamp: Date.now() - 86400000 * 12,
      description: 'Routine cardiac examination',
    },
    {
      id: '4',
      type: 'invoice',
      title: 'Payment Processed',
      date: 'Jan 5, 2025',
      timestamp: Date.now() - 86400000 * 15,
      description: 'Consultation fee payment',
    },
  ]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'report':
        return FileText;
      case 'prescription':
        return Pill;
      case 'invoice':
        return Receipt;
      case 'discharge':
        return FileHeart;
      default:
        return FileText;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'report':
        return '#6366F1';
      case 'prescription':
        return '#10B981';
      case 'invoice':
        return '#F59E0B';
      case 'discharge':
        return '#EF4444';
      case 'consultation':
        return '#3B82F6';
      default:
        return '#6366F1';
    }
  };

  const handleUploadDocument = () => {
    router.push('/(tabs)/upload-document');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.containerBg }]}>
      <LinearGradient
        colors={colors.background as any}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>Medical History</Text>
            <Text style={[styles.username, { color: colors.text }]}>Your Timeline</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={toggleTheme} style={[styles.iconButton, { backgroundColor: colors.iconButton, borderColor: colors.iconButtonBorder }]}>
              {isDark ? (
                <Sun size={22} color={colors.textSecondary} strokeWidth={2} />
              ) : (
                <Moon size={22} color={colors.textSecondary} strokeWidth={2} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={handleUploadDocument} style={[styles.iconButton, { backgroundColor: colors.accentLight, borderColor: colors.accent }]}>
              <Upload size={22} color={colors.accent} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 200, type: 'spring' }}
          style={styles.statsRow}
        >
          <View style={[styles.statBox, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>{events.length}</Text>
            <Text style={[styles.statLabel, { color: colors.textTertiary }]}>Total Events</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>3</Text>
            <Text style={[styles.statLabel, { color: colors.textTertiary }]}>This Month</Text>
          </View>
        </MotiView>

        <TouchableOpacity onPress={handleUploadDocument} style={styles.uploadButton}>
          <LinearGradient
            colors={['#6366F1', '#818CF8']}
            style={styles.uploadGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Upload size={20} color="#ffffff" strokeWidth={2} />
            <Text style={styles.uploadText}>Upload Medical Document</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.timelineContainer}>
          <View style={[styles.timelineLine, { backgroundColor: colors.cardBorder }]} />

          {events.map((event, index) => {
            const Icon = getEventIcon(event.type);
            const color = getEventColor(event.type);
            const isLast = index === events.length - 1;

            return (
              <MotiView
                key={event.id}
                from={{ opacity: 0, translateX: -30, scale: 0.9 }}
                animate={{ opacity: 1, translateX: 0, scale: 1 }}
                transition={{ delay: 400 + index * 100, type: 'spring', damping: 15 }}
                style={styles.timelineItem}
              >
                <MotiView
                  from={{ scale: 0, rotate: '-180deg' }}
                  animate={{ scale: 1, rotate: '0deg' }}
                  transition={{ delay: 500 + index * 100, type: 'spring', damping: 12 }}
                  style={[styles.timelineNode, { backgroundColor: color, borderColor: colors.containerBg }]}
                >
                  <Icon size={18} color="#ffffff" strokeWidth={2.5} />
                </MotiView>

                <View style={[styles.eventCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
                  <View style={styles.eventHeader}>
                    <View style={[styles.eventTypeBox, { backgroundColor: `${color}15` }]}>
                      <Text style={[styles.eventType, { color }]}>{event.type}</Text>
                    </View>
                    <Text style={[styles.eventDate, { color: colors.textTertiary }]}>{event.date}</Text>
                  </View>
                  <Text style={[styles.eventTitle, { color: colors.text }]}>{event.title}</Text>
                  <Text style={[styles.eventDescription, { color: colors.textSecondary }]}>{event.description}</Text>

                  <View style={styles.eventFooter}>
                    <TouchableOpacity style={[styles.viewButton, { borderColor: color }]}>
                      <Text style={[styles.viewButtonText, { color }]}>View Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </MotiView>
            );
          })}
        </View>

        <View style={styles.spacing} />
      </ScrollView>

      <View style={styles.bottomNav}>
        <View style={[styles.navContainer, { backgroundColor: colors.navBg, borderColor: colors.iconButtonBorder }]}>
          <TouchableOpacity onPress={() => router.push('/(tabs)/patient-home')} style={styles.navButton} activeOpacity={0.7}>
            <View style={[styles.navButtonInner, { backgroundColor: colors.navInactive }]}>
              <Home size={24} color={colors.textSecondary} strokeWidth={2} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
            <View style={[styles.navButtonInner, { backgroundColor: colors.navInactive }]}>
              <Search size={24} color={colors.textSecondary} strokeWidth={2} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
            <View style={[styles.navButtonInner, styles.navButtonActive]}>
              <Clock size={24} color="#ffffff" strokeWidth={2} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(tabs)/profile')} style={styles.navButton} activeOpacity={0.7}>
            <View style={[styles.navButtonInner, { backgroundColor: colors.navInactive }]}>
              <User size={24} color={colors.textSecondary} strokeWidth={2} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  username: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    marginTop: 4,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  uploadButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 32,
  },
  uploadGradient: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  uploadText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  timelineContainer: {
    position: 'relative',
    paddingLeft: 20,
  },
  timelineLine: {
    position: 'absolute',
    left: 18,
    top: 30,
    bottom: 0,
    width: 2,
  },
  timelineItem: {
    marginBottom: 32,
    position: 'relative',
  },
  timelineNode: {
    position: 'absolute',
    left: -20,
    top: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    zIndex: 2,
  },
  eventCard: {
    marginLeft: 36,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventTypeBox: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  eventType: {
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  eventDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  eventTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 6,
  },
  eventDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginBottom: 12,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  viewButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1.5,
  },
  viewButtonText: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
  },
  spacing: {
    height: 40,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    alignItems: 'center',
  },
  navContainer: {
    flexDirection: 'row',
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 1,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 16,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonActive: {
    backgroundColor: '#6366F1',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});
