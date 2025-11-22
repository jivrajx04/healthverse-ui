import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import {
  X,
  Calendar,
  FileText,
  User,
  Activity,
  Pill,
} from 'lucide-react-native';
import {
  useTheme,
  lightTheme,
  darkTheme,
} from '@/modules/shared/contexts/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'appointment' | 'lab' | 'prescription' | 'followup' | 'system';
}

interface NotificationPanelProps {
  visible: boolean;
  onClose: () => void;
}

const staticNotifications: Notification[] = [
  {
    id: '1',
    title: 'Dr. Sarah Johnson',
    message: 'Your appointment is confirmed for tomorrow at 10:00 AM',
    time: '2h ago',
    isRead: false,
    type: 'appointment',
  },
  {
    id: '2',
    title: 'HealthCare Diagnostics',
    message: 'Your blood test results are now available',
    time: '5h ago',
    isRead: false,
    type: 'lab',
  },
  {
    id: '3',
    title: 'Health Reminder',
    message: 'Time to take your evening medication',
    time: '8h ago',
    isRead: true,
    type: 'prescription',
  },
  {
    id: '4',
    title: 'Dr. Michael Chen',
    message: 'Follow-up appointment scheduled for next week',
    time: '2d ago',
    isRead: true,
    type: 'followup',
  },
  {
    id: '5',
    title: 'City Hospital',
    message: 'Your prescription is ready for pickup',
    time: '3d ago',
    isRead: true,
    type: 'prescription',
  },
  {
    id: '6',
    title: 'Health App',
    message: 'Your health score improved by 5 points this month',
    time: '1w ago',
    isRead: true,
    type: 'system',
  },
];

export default function NotificationPanel({
  visible,
  onClose,
}: NotificationPanelProps) {
  const { isDark } = useTheme();
  const colors = isDark ? darkTheme : lightTheme;
  const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(onClose);
  };

  if (!visible) return null;

  const todayNotifications = staticNotifications.filter((n) =>
    n.time.includes('h ago'),
  );
  const weekNotifications = staticNotifications.filter((n) =>
    n.time.includes('d ago'),
  );
  const monthNotifications = staticNotifications.filter((n) =>
    n.time.includes('w ago'),
  );

  const getIconForType = (type: string) => {
    switch (type) {
      case 'appointment':
      case 'followup':
        return Calendar;
      case 'lab':
        return FileText;
      case 'prescription':
        return Pill;
      case 'system':
        return Activity;
      default:
        return User;
    }
  };

  const getIconColor = (type: string) => {
    // Use theme-based colors instead of hardcoded ones
    switch (type) {
      case 'appointment':
      case 'followup':
        return colors.accent || '#00F5FF'; // Use theme accent color
      case 'lab':
        return colors.success || '#10B981';
      case 'prescription':
        return colors.warning || '#8B5CF6';
      case 'system':
        return colors.secondary || '#F59E0B';
      default:
        return colors.textTertiary || '#6B7280';
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: colors.containerBg },
        { transform: [{ translateX: slideAnim }] },
      ]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.cardBg }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Notifications
        </Text>
        <TouchableOpacity
          onPress={handleClose}
          style={[
            styles.closeButton,
            { backgroundColor: colors.accent + '20' },
          ]}
        >
          <X size={24} color={colors.accent} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Today Section */}
        {todayNotifications.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.accent }]}>
                TODAY
              </Text>
              <View
                style={[
                  styles.sectionLine,
                  { backgroundColor: colors.accent + '20' },
                ]}
              />
            </View>
            {todayNotifications.map((notification, index) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                isLast={index === todayNotifications.length - 1}
                getIconForType={getIconForType}
                getIconColor={getIconColor}
                colors={colors}
              />
            ))}
          </View>
        )}

        {/* This Week Section */}
        {weekNotifications.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.accent }]}>
                THIS WEEK
              </Text>
              <View
                style={[
                  styles.sectionLine,
                  { backgroundColor: colors.accent + '20' },
                ]}
              />
            </View>
            {weekNotifications.map((notification, index) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                isLast={index === weekNotifications.length - 1}
                getIconForType={getIconForType}
                getIconColor={getIconColor}
                colors={colors}
              />
            ))}
          </View>
        )}

        {/* This Month Section */}
        {monthNotifications.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.accent }]}>
                THIS MONTH
              </Text>
              <View
                style={[
                  styles.sectionLine,
                  { backgroundColor: colors.accent + '20' },
                ]}
              />
            </View>
            {monthNotifications.map((notification, index) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                isLast={index === monthNotifications.length - 1}
                getIconForType={getIconForType}
                getIconColor={getIconColor}
                colors={colors}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </Animated.View>
  );
}

function NotificationItem({
  notification,
  isLast,
  getIconForType,
  getIconColor,
  colors,
}: {
  notification: Notification;
  isLast: boolean;
  getIconForType: (type: string) => React.ComponentType<any>;
  getIconColor: (type: string) => string;
  colors: any;
}) {
  const IconComponent = getIconForType(notification.type);
  const iconColor = getIconColor(notification.type);

  return (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !notification.isRead && [
          styles.unreadItem,
          { backgroundColor: colors.accent + '10' },
        ],
      ]}
    >
      <View style={styles.notificationContent}>
        <View
          style={[styles.iconContainer, { backgroundColor: iconColor + '15' }]}
        >
          <IconComponent size={20} color={iconColor} strokeWidth={2} />
        </View>

        <View style={styles.textContainer}>
          <View style={styles.notificationHeader}>
            <Text style={[styles.notificationTitle, { color: colors.text }]}>
              {notification.title}
            </Text>
            {!notification.isRead && (
              <View
                style={[styles.unreadDot, { backgroundColor: colors.accent }]}
              />
            )}
          </View>
          <Text
            style={[
              styles.notificationMessage,
              { color: colors.textSecondary },
            ]}
          >
            {notification.message}
          </Text>
          <Text
            style={[styles.notificationTime, { color: colors.textTertiary }]}
          >
            {notification.time}
          </Text>
        </View>
      </View>

      {!isLast && (
        <View
          style={[styles.separator, { backgroundColor: colors.cardBorder }]}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: Math.min(SCREEN_WIDTH * 0.85, 400),
    zIndex: 1000,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
  },
  closeButton: {
    padding: 8,
    borderRadius: 12,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Inter-Bold',
    marginRight: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionLine: {
    flex: 1,
    height: 1,
  },
  notificationItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  unreadItem: {
    // backgroundColor will be set dynamically
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
    marginTop: 6,
  },
  notificationMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  separator: {
    height: 1,
    marginLeft: 52, // Align with text content
    marginTop: 12,
  },
});
