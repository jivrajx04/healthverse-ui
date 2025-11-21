import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { Clock, CheckCircle2, Bell, Settings, Home, Search, Calendar, User, Sun, Moon, ChevronDown, ChevronUp } from 'lucide-react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useTheme, lightTheme, darkTheme } from '../../contexts/ThemeContext';
import { testRequestService, TestRequest as DBTestRequest, DashboardStats } from '../../services/TestRequestService';

type FilterType = 'pending' | 'completed' | 'all';

const getTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) {
    const diffMins = Math.floor(diffMs / (1000 * 60));
    return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else {
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  }
};

export default function LabHomeScreen() {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();
  const colors = isDark ? darkTheme : lightTheme;
  const [activeFilter, setActiveFilter] = useState<FilterType>('pending');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [testRequests, setTestRequests] = useState<DBTestRequest[]>([]);
  const [stats, setStats] = useState<DashboardStats>({ pending: 0, completed: 0, total: 0 });
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [requests, dashboardStats] = await Promise.all([
        testRequestService.getTestRequests(activeFilter),
        testRequestService.getDashboardStats(),
      ]);
      setTestRequests(requests);
      setStats(dashboardStats);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, [activeFilter]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [activeFilter])
  );

  const statCards = [
    { label: 'Pending Tests', value: stats.pending.toString(), icon: Clock, color: '#f59e0b', filter: 'pending' as FilterType },
    { label: 'Completed', value: stats.completed.toString(), icon: CheckCircle2, color: '#10b981', filter: 'completed' as FilterType },
    { label: 'Total Today', value: stats.total.toString(), icon: Clock, color: '#3b82f6', filter: 'all' as FilterType },
  ];

  const filteredRequests = testRequests;

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; color: string; emoji: string }> = {
      pending: { label: 'Pending', color: '#FFA500', emoji: '🟡' },
      processing: { label: 'Processing', color: '#007BFF', emoji: '🔵' },
      completed: { label: 'Completed', color: '#28A745', emoji: '🟢' },
    };
    return statusConfig[status] || statusConfig.pending;
  };

  const handleProcessRequest = (request: DBTestRequest) => {
    router.push({
      pathname: '/process-request',
      params: {
        requestId: request.id,
        requestData: JSON.stringify(request),
      },
    });
  };

  const handleViewReports = (request: DBTestRequest) => {
    router.push({
      pathname: '/view-reports',
      params: {
        requestId: request.id,
        requestData: JSON.stringify(request),
      },
    });
  };

  const toggleCardExpansion = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.containerBg }]}>
      <LinearGradient
        colors={colors.background}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>Welcome</Text>
            <Text style={[styles.username, { color: colors.text }]}>HealthCare Diagnostics</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={toggleTheme} style={[styles.iconButton, { backgroundColor: colors.iconButton, borderColor: colors.iconButtonBorder }]}>
              {isDark ? (
                <Sun size={22} color={colors.textSecondary} strokeWidth={2} />
              ) : (
                <Moon size={22} color={colors.textSecondary} strokeWidth={2} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.iconButton, borderColor: colors.iconButtonBorder }]}>
              <Bell size={22} color={colors.textSecondary} strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.iconButton, borderColor: colors.iconButtonBorder }]}>
              <Settings size={22} color={colors.textSecondary} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 200, type: 'spring' }}
          style={styles.statsContainer}
        >
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            const isActive = activeFilter === stat.filter;
            return (
              <TouchableOpacity
                key={stat.label}
                onPress={() => setActiveFilter(stat.filter)}
                activeOpacity={0.7}
                style={{ flex: 1 }}
              >
                <MotiView
                  from={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    scale: isActive ? 1.05 : 1,
                  }}
                  transition={{ delay: 300 + index * 100, type: 'spring' }}
                  style={[
                    styles.statCard,
                    {
                      backgroundColor: colors.cardBg,
                      borderColor: isActive ? stat.color : colors.cardBorder,
                      borderWidth: isActive ? 2 : 1,
                    }
                  ]}
                >
                  <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                    <Icon size={24} color={stat.color} strokeWidth={2} />
                  </View>
                  <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
                  <Text style={[styles.statLabel, { color: colors.textTertiary }]}>{stat.label}</Text>
                </MotiView>
              </TouchableOpacity>
            );
          })}
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 600, type: 'spring' }}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {activeFilter === 'pending' ? 'Pending Test Reports' :
               activeFilter === 'completed' ? 'Completed Reports' :
               'All Test Reports'}
            </Text>
            <Text style={[styles.sectionCount, { color: colors.textSecondary }]}>
              {filteredRequests.length}
            </Text>
          </View>

          {filteredRequests.map((request, index) => {
            const statusBadge = getStatusBadge(request.status);
            const isExpanded = expandedCard === request.id;

            return (
              <MotiView
                key={request.id}
                from={{ opacity: 0, translateX: -20 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: 700 + index * 100, type: 'spring' }}
                style={[styles.testCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
              >
                <TouchableOpacity
                  onPress={() => toggleCardExpansion(request.id)}
                  style={styles.cardTouchable}
                  activeOpacity={0.7}
                >
                  <View style={styles.testLeft}>
                    <View style={[
                      styles.priorityIndicator,
                      request.priority === 'high' ? styles.priorityHigh : styles.priorityNormal
                    ]} />
                    <View style={styles.testInfo}>
                      <View style={styles.nameStatusRow}>
                        <Text style={[styles.patientName, { color: colors.text }]}>
                          {request.patient_name}
                        </Text>
                        <View style={[styles.statusBadge, { backgroundColor: `${statusBadge.color}20` }]}>
                          <Text style={[styles.statusEmoji]}>{statusBadge.emoji}</Text>
                          <Text style={[styles.statusText, { color: statusBadge.color }]}>
                            {statusBadge.label}
                          </Text>
                        </View>
                      </View>
                      <Text style={[styles.testName, { color: colors.textTertiary }]}>
                        {request.tests.join(', ')}
                      </Text>
                      <Text style={[styles.testTime, { color: colors.textSecondary }]}>
                        {getTimeAgo(request.created_at)}
                      </Text>

                      {isExpanded && (
                        <MotiView
                          from={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ type: 'timing', duration: 300 }}
                          style={styles.expandedContent}
                        >
                          <View style={styles.expandedRow}>
                            <Text style={[styles.expandedLabel, { color: colors.textTertiary }]}>Patient ID:</Text>
                            <Text style={[styles.expandedValue, { color: colors.text }]}>{request.patient_id}</Text>
                          </View>
                          <View style={styles.expandedRow}>
                            <Text style={[styles.expandedLabel, { color: colors.textTertiary }]}>Doctor:</Text>
                            <Text style={[styles.expandedValue, { color: colors.text }]}>{request.doctor_name}</Text>
                          </View>
                          <View style={styles.expandedRow}>
                            <Text style={[styles.expandedLabel, { color: colors.textTertiary }]}>Hospital:</Text>
                            <Text style={[styles.expandedValue, { color: colors.text }]}>{request.hospital_name}</Text>
                          </View>
                          <View style={styles.expandedRow}>
                            <Text style={[styles.expandedLabel, { color: colors.textTertiary }]}>Tests:</Text>
                            <Text style={[styles.expandedValue, { color: colors.text }]}>
                              {request.tests.join(', ')}
                            </Text>
                          </View>
                          {request.doctor_note && (
                            <View style={styles.expandedRow}>
                              <Text style={[styles.expandedLabel, { color: colors.textTertiary }]}>Note:</Text>
                              <Text style={[styles.expandedValue, { color: colors.text }]}>
                                "{request.doctor_note}"
                              </Text>
                            </View>
                          )}
                        </MotiView>
                      )}
                    </View>
                    <View style={styles.expandIcon}>
                      {isExpanded ? (
                        <ChevronUp size={20} color={colors.textSecondary} strokeWidth={2} />
                      ) : (
                        <ChevronDown size={20} color={colors.textSecondary} strokeWidth={2} />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>

                <View style={styles.actionButtonContainer}>
                  {request.status === 'pending' ? (
                    <TouchableOpacity
                      style={styles.processButton}
                      onPress={() => handleProcessRequest(request)}
                    >
                      <LinearGradient
                        colors={['#f59e0b', '#d97706']}
                        style={styles.processGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        <Text style={styles.processText}>Process Request</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.viewButton}
                      onPress={() => handleViewReports(request)}
                    >
                      <View style={[styles.viewButtonInner, { backgroundColor: colors.accentLight }]}>
                        <Text style={[styles.viewButtonText, { color: colors.accent }]}>View Reports</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              </MotiView>
            );
          })}

          {filteredRequests.length === 0 && (
            <View style={[styles.emptyState, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
              <Text style={[styles.emptyText, { color: colors.textTertiary }]}>
                No {activeFilter === 'all' ? '' : activeFilter} requests found
              </Text>
            </View>
          )}
        </MotiView>
      </ScrollView>

      <View style={styles.bottomNav}>
        <View style={[styles.navContainer, { backgroundColor: colors.navBg, borderColor: colors.iconButtonBorder }]}>
          <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
            <View style={[styles.navButtonInner, styles.navButtonActive]}>
              <Home size={24} color="#ffffff" strokeWidth={2} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
            <View style={[styles.navButtonInner, { backgroundColor: colors.navInactive }]}>
              <Search size={24} color={colors.textSecondary} strokeWidth={2} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
            <View style={[styles.navButtonInner, { backgroundColor: colors.navInactive }]}>
              <Calendar size={24} color={colors.textSecondary} strokeWidth={2} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
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
    backgroundColor: '#E0F2FF',
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
    marginBottom: 32,
  },
  greeting: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  username: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.1)',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#94a3b8',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
  },
  sectionCount: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#64748b',
  },
  testCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.1)',
  },
  cardTouchable: {
    flex: 1,
  },
  testLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
    marginBottom: 12,
  },
  priorityIndicator: {
    width: 4,
    height: 60,
    borderRadius: 2,
    marginTop: 4,
  },
  priorityHigh: {
    backgroundColor: '#ef4444',
  },
  priorityNormal: {
    backgroundColor: '#3b82f6',
  },
  testInfo: {
    flex: 1,
  },
  nameStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
    gap: 8,
  },
  patientName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusEmoji: {
    fontSize: 10,
  },
  statusText: {
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
  },
  testName: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
    marginBottom: 4,
  },
  testTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  expandIcon: {
    marginLeft: 8,
  },
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(59, 130, 246, 0.1)',
    gap: 8,
  },
  expandedRow: {
    flexDirection: 'row',
    gap: 8,
  },
  expandedLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#94a3b8',
    width: 80,
  },
  expandedValue: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    flex: 1,
  },
  actionButtonContainer: {
    alignItems: 'center',
    marginTop: 4,
  },
  processButton: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '70%',
  },
  processGradient: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  processText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  viewButton: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '70%',
  },
  viewButtonInner: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  viewButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  emptyState: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.1)',
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
    shadowColor: '#f59e0b',
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
    backgroundColor: 'rgba(241, 245, 249, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonActive: {
    backgroundColor: '#f59e0b',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});
