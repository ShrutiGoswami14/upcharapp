import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfilePhotoPickerProps {
  avatarUri?: string;
  onPhotoSelected: (uri: string) => void;
}

export const ProfilePhotoPicker: React.FC<ProfilePhotoPickerProps> = ({
  avatarUri,
  onPhotoSelected,
}) => {
  const [currentUri, setCurrentUri] = useState<string | undefined>(avatarUri);

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
  ];

  const handleTogglePhoto = () => {
    // Cycle demo photos on tap
    const nextUri = currentUri
      ? sampleAvatars[(sampleAvatars.indexOf(currentUri) + 1) % sampleAvatars.length]
      : sampleAvatars[0];
    setCurrentUri(nextUri);
    onPhotoSelected(nextUri);
  };

  return (
    <View style={styles.cardContainer}>
      {/* Avatar with Edit Badge */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.avatarWrapper}
        onPress={handleTogglePhoto}
      >
        {currentUri ? (
          <Image source={{ uri: currentUri }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person-outline" size={30} color="#64748B" />
          </View>
        )}

        <View style={styles.cameraBadge}>
          <Ionicons name="camera" size={11} color="#FFFFFF" />
        </View>
      </TouchableOpacity>

      {/* Info & Add Photo Action */}
      <View style={styles.infoContainer}>
        <Text style={styles.titleText}>Profile Photo (Optional)</Text>
        <Text style={styles.subtitleText}>JPG, PNG up to 5MB</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.addPhotoButton}
          onPress={handleTogglePhoto}
        >
          <Ionicons name="cloud-upload-outline" size={14} color="#1E293B" />
          <Text style={styles.addPhotoText}>
            {currentUri ? 'Change Photo' : 'Add Photo'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#0080FF',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0080FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  infoContainer: {
    flex: 1,
    gap: 3,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  subtitleText: {
    fontSize: 11.5,
    color: '#64748B',
    marginBottom: 6,
  },
  addPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  addPhotoText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
  },
});
