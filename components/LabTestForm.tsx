import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Save, Check } from 'lucide-react-native';
import { useTheme, lightTheme, darkTheme } from '../contexts/ThemeContext';

interface LabTestFormProps {
  patientName: string;
  patientId: string;
  onSave: (data: any) => void;
  onClose: () => void;
}

const commonTests = [
  'Complete Blood Count (CBC)',
  'Blood Glucose',
  'Lipid Profile',
  'Liver Function Test',
  'Kidney Function Test',
  'Thyroid Function Test',
  'Urine Analysis',
  'HbA1c',
  'Vitamin D',
  'Vitamin B12',
];

export default function LabTestForm({ patientName, patientId, onSave, onClose }: LabTestFormProps) {
  const { isDark } = useTheme();
  const colors = isDark ? darkTheme : lightTheme;

  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [customTest, setCustomTest] = useState('');
  const [notes, setNotes] = useState('');
  const [urgency, setUrgency] = useState<'routine' | 'urgent'>('routine');

  const toggleTest = (test: string) => {
    if (selectedTests.includes(test)) {
      setSelectedTests(selectedTests.filter(t => t !== test));
    } else {
      setSelectedTests([...selectedTests, test]);
    }
  };

  const addCustomTest = () => {
    if (customTest.trim() && !selectedTests.includes(customTest.trim())) {
      setSelectedTests([...selectedTests, customTest.trim()]);
      setCustomTest('');
    }
  };

  const handleSave = () => {
    const labTestData = {
      patientId,
      patientName,
      tests: selectedTests,
      notes,
      urgency,
      date: new Date().toISOString(),
    };
    onSave(labTestData);
  };

  const isValid = selectedTests.length > 0;

  return (
    <View style={[styles.container, { backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(0, 0, 0, 0.5)' }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={[styles.content, { backgroundColor: colors.containerBg }]}>
          <View style={styles.header}>
            <View>
              <Text style={[styles.title, { color: colors.text }]}>Request Lab Tests</Text>
              <Text style={[styles.subtitle, { color: colors.textTertiary }]}>{patientName}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={[styles.closeButton, { backgroundColor: colors.cardBg }]}>
              <X size={24} color={colors.text} strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Select Tests</Text>
              <View style={styles.testsGrid}>
                {commonTests.map((test, index) => {
                  const isSelected = selectedTests.includes(test);
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => toggleTest(test)}
                      style={[
                        styles.testChip,
                        { backgroundColor: colors.cardBg, borderColor: colors.cardBorder },
                        isSelected && styles.testChipSelected,
                      ]}
                      activeOpacity={0.7}
                    >
                      {isSelected && (
                        <View style={styles.checkIcon}>
                          <Check size={14} color="#ffffff" strokeWidth={3} />
                        </View>
                      )}
                      <Text style={[
                        styles.testChipText,
                        { color: colors.text },
                        isSelected && styles.testChipTextSelected,
                      ]}>
                        {test}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Custom Test</Text>
              <View style={styles.customTestContainer}>
                <TextInput
                  style={[styles.customTestInput, { color: colors.text, backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
                  value={customTest}
                  onChangeText={setCustomTest}
                  placeholder="Enter custom test name"
                  placeholderTextColor={colors.textTertiary}
                  returnKeyType="done"
                  onSubmitEditing={addCustomTest}
                />
                <TouchableOpacity
                  onPress={addCustomTest}
                  disabled={!customTest.trim()}
                  style={[styles.addCustomButton, !customTest.trim() && styles.buttonDisabled]}
                >
                  <Text style={[styles.addCustomButtonText, { color: colors.accent }]}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Urgency</Text>
              <View style={styles.urgencyContainer}>
                <TouchableOpacity
                  onPress={() => setUrgency('routine')}
                  style={[
                    styles.urgencyButton,
                    { backgroundColor: colors.cardBg, borderColor: colors.cardBorder },
                    urgency === 'routine' && styles.urgencyButtonSelected,
                  ]}
                >
                  <Text style={[
                    styles.urgencyButtonText,
                    { color: colors.text },
                    urgency === 'routine' && styles.urgencyButtonTextSelected,
                  ]}>
                    Routine
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setUrgency('urgent')}
                  style={[
                    styles.urgencyButton,
                    { backgroundColor: colors.cardBg, borderColor: colors.cardBorder },
                    urgency === 'urgent' && styles.urgencyButtonUrgent,
                  ]}
                >
                  <Text style={[
                    styles.urgencyButtonText,
                    { color: colors.text },
                    urgency === 'urgent' && styles.urgencyButtonTextUrgent,
                  ]}>
                    Urgent
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Additional Notes</Text>
              <TextInput
                style={[styles.input, styles.textArea, { color: colors.text, backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
                value={notes}
                onChangeText={setNotes}
                placeholder="Any special instructions for the lab"
                placeholderTextColor={colors.textTertiary}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {selectedTests.length > 0 && (
              <View style={[styles.selectedSummary, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
                <Text style={[styles.selectedSummaryTitle, { color: colors.text }]}>
                  Selected Tests ({selectedTests.length})
                </Text>
                {selectedTests.map((test, index) => (
                  <View key={index} style={styles.selectedTestRow}>
                    <Text style={[styles.selectedTestText, { color: colors.textSecondary }]}>
                      {index + 1}. {test}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={handleSave}
              disabled={!isValid}
              style={[styles.saveButton, !isValid && styles.saveButtonDisabled]}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={isValid ? ['#f59e0b', '#d97706'] : ['#334155', '#1e293b']}
                style={styles.saveButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Save size={20} color="#ffffff" strokeWidth={2} />
                <Text style={styles.saveButtonText}>Send to Lab</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(99, 102, 241, 0.1)',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  testsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  testChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },
  testChipSelected: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  checkIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  testChipText: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
  },
  testChipTextSelected: {
    color: '#ffffff',
  },
  customTestContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  customTestInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  addCustomButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  addCustomButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  urgencyContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  urgencyButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  urgencyButtonSelected: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  urgencyButtonUrgent: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
  urgencyButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  urgencyButtonTextSelected: {
    color: '#ffffff',
  },
  urgencyButtonTextUrgent: {
    color: '#ffffff',
  },
  input: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  textArea: {
    minHeight: 100,
  },
  selectedSummary: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginTop: 8,
  },
  selectedSummaryTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  selectedTestRow: {
    paddingVertical: 6,
  },
  selectedTestText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    lineHeight: 18,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(99, 102, 241, 0.1)',
  },
  saveButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});
