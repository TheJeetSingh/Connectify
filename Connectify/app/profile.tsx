import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const options = { headerShown: false };

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={64} color="#fff" />
            <TouchableOpacity style={styles.editIcon}>
              <Ionicons name="pencil" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.name}>Lucas Scott</Text>
        <Text style={styles.username}>@lucasscott3</Text>
        <View style={styles.optionsList}>
          {[
            'Interests',
            'Locations',
            'Visibility',
            'Notifications',
            'Appearance',
            'Language',
            'Privacy & Security',
            'Subscription',
          ].map((option) => (
            <TouchableOpacity key={option} style={styles.optionRow}>
              <Text style={styles.optionText}>{option}</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#6FC1A2',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#3A9C7C',
    borderRadius: 20,
    padding: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#222',
  },
  username: {
    fontSize: 16,
    color: '#888',
    marginBottom: 24,
  },
  optionsList: {
    width: '100%',
    marginTop: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 17,
    color: '#222',
  },
}); 