import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const mockEvents = [
  {
    id: 1,
    title: "Cupertino Farmers Market",
    location: "Main Street Cupertino",
    time: "Every Sunday, 9AM - 1PM",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9",
    attendees: 245,
    category: "Food & Drink"
  },
  {
    id: 2,
    title: "Tech Meetup at Apple Park",
    location: "Apple Park Visitor Center",
    time: "Tomorrow, 6PM - 8PM",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
    attendees: 189,
    category: "Technology"
  },
  {
    id: 3,
    title: "Yoga in the Park",
    location: "Memorial Park",
    time: "Every Saturday, 8AM - 9AM",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    attendees: 156,
    category: "Health & Wellness"
  },
  {
    id: 4,
    title: "Cupertino Art Walk",
    location: "Downtown Cupertino",
    time: "First Friday of Month, 5PM - 9PM",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
    attendees: 320,
    category: "Arts & Culture"
  }
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.location}>Cupertino, CA</Text>
          <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => router.push('/profile')}
        >
          <Ionicons name="person-circle-outline" size={32} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TouchableOpacity style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#666" />
        <Text style={styles.searchText}>Search events, venues, or categories</Text>
      </TouchableOpacity>

      {/* Events List */}
      <ScrollView style={styles.eventsContainer}>
        {mockEvents.map((event) => (
          <TouchableOpacity key={event.id} style={styles.eventCard}>
            <Image 
              source={{ uri: event.image }} 
              style={styles.eventImage}
            />
            <View style={styles.eventInfo}>
              <Text style={styles.eventCategory}>{event.category}</Text>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.eventDetails}>
                <Ionicons name="location-outline" size={16} color="#666" />
                <Text style={styles.eventDetailText}>{event.location}</Text>
              </View>
              <View style={styles.eventDetails}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.eventDetailText}>{event.time}</Text>
              </View>
              <View style={styles.eventFooter}>
                <View style={styles.attendeesContainer}>
                  <Ionicons name="people-outline" size={16} color="#666" />
                  <Text style={styles.attendeesText}>{event.attendees} attending</Text>
                </View>
                <TouchableOpacity style={styles.joinButton}>
                  <Text style={styles.joinButtonText}>Join</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
  },
  location: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  profileButton: {
    padding: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    margin: 16,
    padding: 12,
    borderRadius: 12,
  },
  searchText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 16,
  },
  eventsContainer: {
    flex: 1,
    padding: 16,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  eventInfo: {
    padding: 16,
  },
  eventCategory: {
    color: '#70C18C',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventDetailText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeesText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  joinButton: {
    backgroundColor: '#70C18C',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
