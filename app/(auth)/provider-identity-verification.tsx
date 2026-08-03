import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Platform,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

export default function ProviderIdentityVerificationScreen() {
  const router = useRouter();
  
  const [frontId, setFrontId] = useState<string | null>(null);
  const [backId, setBackId] = useState<string | null>(null);
  const [license, setLicense] = useState<string | null>(null);

  const pickImage = async (setSide: (uri: string | null) => void) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setSide(result.assets[0].uri);
    }
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/jpeg', 'image/png'],
    });

    if (!result.canceled) {
      setLicense(result.assets[0].name);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={24} color="#0A1C3B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ZONOMO</Text>
          <View style={styles.initialBadge}>
            <Text style={styles.initialText}>A</Text>
          </View>
        </View>

        {/* Title and Progress */}
        <View style={styles.titleRow}>
          <Text style={styles.mainTitle}>Identity Verification</Text>
          <Text style={styles.stepText}>Step 2 of 3</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarFill} />
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Feather name="shield" size={20} color="#00796B" style={styles.infoIcon} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoCardTitle}>Why we verify</Text>
            <Text style={styles.infoCardBody}>
              Identity verification helps us build a safe community. Your documents are stored securely with end to end encryption and are only used for professional screening.
            </Text>
          </View>
        </View>

        {/* Government ID Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="id-card" size={18} color="#0A1C3B" style={{marginRight: 8}} />
            <Text style={styles.sectionTitle}>Government ID</Text>
            <Text style={styles.requiredText}>(Required)</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Please upload clear photos of both sides of your valid government issued identification. This is required for account activation.
          </Text>

          {/* Front ID Box */}
          <TouchableOpacity style={styles.uploadBox} onPress={() => pickImage(setFrontId)}>
            {frontId ? (
              <Image source={{uri: frontId}} style={styles.previewImage} />
            ) : (
              <>
                <Feather name="camera" size={24} color="#8A94A6" style={{marginBottom: 8}} />
                <Text style={styles.uploadBoxTitle}>Front of ID</Text>
                <Text style={styles.uploadBoxSubtitle}>JPEG or PNG</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Back ID Box */}
          <TouchableOpacity style={styles.uploadBox} onPress={() => pickImage(setBackId)}>
            {backId ? (
              <Image source={{uri: backId}} style={styles.previewImage} />
            ) : (
              <>
                <Feather name="camera" size={24} color="#8A94A6" style={{marginBottom: 8}} />
                <Text style={styles.uploadBoxTitle}>Back of ID</Text>
                <Text style={styles.uploadBoxSubtitle}>JPEG or PNG</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Professional License Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="file-alt" size={18} color="#0A1C3B" style={{marginRight: 8}} />
            <Text style={styles.sectionTitle}>Professional License</Text>
            <Text style={styles.optionalText}>(Optional)</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Upload your business registration, liability insurance, or relevant trade license. This step is optional but recommended for faster verification.
          </Text>

          <TouchableOpacity style={styles.uploadBox} onPress={pickDocument}>
            <Feather name="file-plus" size={24} color="#8A94A6" style={{marginBottom: 8}} />
            {license ? (
              <Text style={styles.uploadBoxTitle} numberOfLines={1} ellipsizeMode="middle">{license}</Text>
            ) : (
              <>
                <Text style={styles.uploadBoxTitle}>Drop file here or click to upload</Text>
                <Text style={styles.uploadBoxSubtitle}>PDF, JPG up to 10MB</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Verification Checklist */}
        <View style={styles.checklistContainer}>
          <Text style={styles.checklistTitle}>VERIFICATION CHECKLIST</Text>
          
          <View style={styles.checklistItem}>
            <MaterialIcons name="check-circle" size={18} color="#00A86B" style={{marginRight: 8}} />
            <Text style={styles.checklistText}>ID is not expired</Text>
          </View>
          <View style={styles.checklistItem}>
            <MaterialIcons name="check-circle" size={18} color="#00A86B" style={{marginRight: 8}} />
            <Text style={styles.checklistText}>All four corners visible</Text>
          </View>
          <View style={styles.checklistItem}>
            <MaterialIcons name="check-circle" size={18} color="#00A86B" style={{marginRight: 8}} />
            <Text style={styles.checklistText}>Information is legible</Text>
          </View>
          <View style={styles.checklistItem}>
            <MaterialIcons name="check-circle" size={18} color="#00A86B" style={{marginRight: 8}} />
            <Text style={styles.checklistText}>Name matches profile</Text>
          </View>
        </View>

      </ScrollView>
      
      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerBackBtn} onPress={() => router.back()}>
          <Feather name="arrow-left" size={18} color="#0A1C3B" style={{marginRight: 6}} />
          <Text style={styles.footerBackText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.submitBtn}
          onPress={() => router.replace('/(auth)/provider-step3')}
        >
          <Text style={styles.submitBtnText}>Submit for Review</Text>
          <Feather name="loader" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A1C3B',
    letterSpacing: 1,
  },
  initialBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E6F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialText: {
    color: '#3B82F6',
    fontWeight: 'bold',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0A1C3B',
  },
  stepText: {
    fontSize: 12,
    color: '#0A1C3B',
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#EEF2F6',
    borderRadius: 2,
    marginBottom: 24,
  },
  progressBarFill: {
    width: '66%',
    height: '100%',
    backgroundColor: '#00796B',
    borderRadius: 2,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#E6F4F1',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 4,
  },
  infoCardBody: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 18,
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A1C3B',
  },
  requiredText: {
    fontSize: 12,
    color: '#EF4444',
    marginLeft: 6,
    fontWeight: '600',
  },
  optionalText: {
    fontSize: 12,
    color: '#8A94A6',
    marginLeft: 6,
    fontWeight: '600',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#8A94A6',
    marginBottom: 16,
    lineHeight: 18,
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    backgroundColor: '#F8FAFC',
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 4,
  },
  uploadBoxTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0A1C3B',
    marginBottom: 4,
  },
  uploadBoxSubtitle: {
    fontSize: 11,
    color: '#8A94A6',
  },
  checklistContainer: {
    backgroundColor: '#EBF4FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  checklistTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1E3A8A',
    letterSpacing: 1,
    marginBottom: 16,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checklistText: {
    fontSize: 13,
    color: '#1E3A8A',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 0 : 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F2F5',
  },
  footerBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  footerBackText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0A1C3B',
  },
  submitBtn: {
    backgroundColor: '#00796B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
  }
});
