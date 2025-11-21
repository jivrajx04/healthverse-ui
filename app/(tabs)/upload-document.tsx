import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, Modal, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { ArrowLeft, FileText, Upload, Check, X, File, Pill, Receipt, FileCheck } from 'lucide-react-native';
import { useTheme, lightTheme, darkTheme } from '../../contexts/ThemeContext';

type DocumentType = 'report' | 'prescription' | 'invoice' | 'discharge' | 'scan' | 'other';

interface DocumentTypeOption {
  id: DocumentType;
  label: string;
  icon: typeof FileText;
  color: string;
  description: string;
}

interface SelectedFile {
  id: string;
  name: string;
  size: number;
}

const documentTypes: DocumentTypeOption[] = [
  {
    id: 'report',
    label: 'Lab Report',
    icon: FileText,
    color: '#6366F1',
    description: 'Blood tests, pathology reports',
  },
  {
    id: 'prescription',
    label: 'Prescription',
    icon: Pill,
    color: '#10B981',
    description: 'Medication prescriptions',
  },
  {
    id: 'invoice',
    label: 'Invoice',
    icon: Receipt,
    color: '#F59E0B',
    description: 'Medical bills and payments',
  },
  {
    id: 'discharge',
    label: 'Discharge Summary',
    icon: FileCheck,
    color: '#3B82F6',
    description: 'Hospital discharge papers',
  },
  {
    id: 'scan',
    label: 'Scan Results',
    icon: FileText,
    color: '#8B5CF6',
    description: 'X-Ray, MRI, CT scan reports',
  },
  {
    id: 'other',
    label: 'Other',
    icon: File,
    color: '#EF4444',
    description: 'Other medical documents',
  },
];

export default function UploadDocumentScreen() {
  const { isDark } = useTheme();
  const colors = isDark ? darkTheme : lightTheme;
  const router = useRouter();

  const [selectedType, setSelectedType] = useState<DocumentType | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const simulateFileSelection = () => {
    const mockFiles: SelectedFile[] = [
      { id: '1', name: 'blood_test_results.pdf', size: 245678 },
      { id: '2', name: 'medical_report_2024.pdf', size: 156789 },
    ];
    setSelectedFiles(mockFiles);
  };

  const handleUpload = async () => {
    if (!selectedType || selectedFiles.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    await new Promise((resolve) => setTimeout(resolve, 2500));

    clearInterval(progressInterval);
    setUploadProgress(100);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setUploading(false);
    router.back();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const removeFile = (id: string) => {
    setSelectedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const selectedTypeData = documentTypes.find((t) => t.id === selectedType);

  return (
    <View style={[styles.container, { backgroundColor: colors.containerBg }]}>
      <LinearGradient colors={colors.background as any} style={styles.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />

      <View style={[styles.header, { paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 0) + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.headerButton, { backgroundColor: colors.accentLight }]}>
          <ArrowLeft size={22} color={colors.accent} strokeWidth={2} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: colors.text }]}>Upload Documents</Text>

        <View style={styles.headerButton} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 100, type: 'spring' }}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Select Document Type</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textTertiary }]}>
            Choose the category for your medical documents
          </Text>
        </MotiView>

        <View style={styles.typesGrid}>
          {documentTypes.map((type, index) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;

            return (
              <MotiView
                key={type.id}
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 200 + index * 80, type: 'spring' }}
                style={styles.typeCardWrapper}
              >
                <TouchableOpacity
                  onPress={() => setSelectedType(type.id)}
                  activeOpacity={0.7}
                  style={[
                    styles.typeCard,
                    {
                      backgroundColor: colors.cardBg,
                      borderColor: isSelected ? type.color : colors.cardBorder,
                      borderWidth: isSelected ? 2 : 1,
                    },
                  ]}
                >
                  <View style={[styles.typeIconContainer, { backgroundColor: `${type.color}15` }]}>
                    <Icon size={24} color={type.color} strokeWidth={2} />
                  </View>
                  <Text style={[styles.typeLabel, { color: colors.text }]}>{type.label}</Text>
                  <Text style={[styles.typeDescription, { color: colors.textTertiary }]} numberOfLines={2}>
                    {type.description}
                  </Text>

                  {isSelected && (
                    <MotiView
                      from={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', damping: 15 }}
                      style={[styles.selectedBadge, { backgroundColor: type.color }]}
                    >
                      <Check size={12} color="#ffffff" strokeWidth={3} />
                    </MotiView>
                  )}
                </TouchableOpacity>
              </MotiView>
            );
          })}
        </View>

        {selectedType && (
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring' }}
            style={styles.filesSection}
          >
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Select Files</Text>

            {selectedFiles.length === 0 ? (
              <TouchableOpacity
                onPress={simulateFileSelection}
                activeOpacity={0.7}
                style={[styles.uploadArea, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
              >
                <View style={[styles.uploadIcon, { backgroundColor: colors.accentLight }]}>
                  <Upload size={32} color={colors.accent} strokeWidth={2} />
                </View>
                <Text style={[styles.uploadText, { color: colors.text }]}>Tap to select files</Text>
                <Text style={[styles.uploadSubtext, { color: colors.textTertiary }]}>
                  PDF, JPG, PNG up to 10MB each
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.filesList}>
                {selectedFiles.map((file, index) => (
                  <MotiView
                    key={file.id}
                    from={{ opacity: 0, translateX: -20 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ delay: index * 100, type: 'spring' }}
                    style={[styles.fileItem, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
                  >
                    <View style={[styles.fileIconContainer, { backgroundColor: `${selectedTypeData?.color}15` }]}>
                      <File size={20} color={selectedTypeData?.color} strokeWidth={2} />
                    </View>
                    <View style={styles.fileInfo}>
                      <Text style={[styles.fileName, { color: colors.text }]} numberOfLines={1}>
                        {file.name}
                      </Text>
                      <Text style={[styles.fileSize, { color: colors.textTertiary }]}>{formatFileSize(file.size)}</Text>
                    </View>
                    <TouchableOpacity onPress={() => removeFile(file.id)} style={styles.removeButton}>
                      <X size={18} color={colors.textTertiary} strokeWidth={2} />
                    </TouchableOpacity>
                  </MotiView>
                ))}

                <TouchableOpacity
                  onPress={simulateFileSelection}
                  activeOpacity={0.7}
                  style={[styles.addMoreButton, { backgroundColor: colors.accentLight }]}
                >
                  <Upload size={16} color={colors.accent} strokeWidth={2} />
                  <Text style={[styles.addMoreText, { color: colors.accent }]}>Add More Files</Text>
                </TouchableOpacity>
              </View>
            )}
          </MotiView>
        )}

        {selectedType && selectedFiles.length > 0 && (
          <MotiView
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', delay: 200 }}
            style={styles.uploadButtonContainer}
          >
            <TouchableOpacity onPress={handleUpload} activeOpacity={0.8} style={styles.uploadButton}>
              <LinearGradient
                colors={['#6366F1', '#818CF8']}
                style={styles.uploadButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Upload size={20} color="#ffffff" strokeWidth={2} />
                <Text style={styles.uploadButtonText}>Upload {selectedFiles.length} Document{selectedFiles.length > 1 ? 's' : ''}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </MotiView>
        )}
      </ScrollView>

      <Modal visible={uploading} transparent animationType="fade">
        <View style={[styles.modalOverlay, { backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(0, 0, 0, 0.85)' }]}>
          <MotiView
            from={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 20 }}
            style={[styles.uploadingCard, { backgroundColor: colors.containerBg }]}
          >
            <View style={[styles.uploadingIconContainer, { backgroundColor: colors.accentLight }]}>
              <MotiView
                animate={{ rotate: uploadProgress < 100 ? '360deg' : '0deg' }}
                transition={{ type: 'timing', duration: 1000, loop: uploadProgress < 100 }}
              >
                {uploadProgress < 100 ? (
                  <Upload size={48} color={colors.accent} strokeWidth={2} />
                ) : (
                  <Check size={48} color="#10B981" strokeWidth={2} />
                )}
              </MotiView>
            </View>

            <Text style={[styles.uploadingTitle, { color: colors.text }]}>
              {uploadProgress < 100 ? 'Updating Timeline' : 'Upload Complete'}
            </Text>
            <Text style={[styles.uploadingSubtitle, { color: colors.textTertiary }]}>
              {uploadProgress < 100 ? 'Syncing your documents...' : 'Your timeline has been updated'}
            </Text>

            <View style={[styles.progressBar, { backgroundColor: colors.cardBg }]}>
              <MotiView
                animate={{ width: `${uploadProgress}%` }}
                transition={{ type: 'timing', duration: 200 }}
                style={styles.progressBarFill}
              >
                <LinearGradient
                  colors={uploadProgress < 100 ? ['#6366F1', '#818CF8'] : ['#10B981', '#059669']}
                  style={styles.progressBarGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
              </MotiView>
            </View>

            <Text style={[styles.progressText, { color: colors.textSecondary }]}>{uploadProgress}%</Text>
          </MotiView>
        </View>
      </Modal>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: 'transparent',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 20,
  },
  typesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  typeCardWrapper: {
    width: '48%',
  },
  typeCard: {
    borderRadius: 16,
    padding: 16,
    position: 'relative',
    minHeight: 140,
  },
  typeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  typeLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  typeDescription: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    lineHeight: 16,
  },
  selectedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filesSection: {
    marginBottom: 24,
  },
  uploadArea: {
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  uploadText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  uploadSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  filesList: {
    gap: 12,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  fileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  fileSize: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
  },
  removeButton: {
    padding: 4,
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  addMoreText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  uploadButtonContainer: {
    marginTop: 8,
  },
  uploadButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  uploadButtonGradient: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  uploadButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  uploadingCard: {
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '90%',
    maxWidth: 320,
  },
  uploadingIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  uploadingTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  uploadingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 24,
    textAlign: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    height: '100%',
  },
  progressBarGradient: {
    width: '100%',
    height: '100%',
  },
  progressText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
});
