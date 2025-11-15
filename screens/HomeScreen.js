import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useBooks } from '../BookContext';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const { allBooks, isLoading } = useBooks();
  const navigation = useNavigation();

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#4a90e2" />
        <Text style={styles.loadingText}>Loading Books...</Text>
      </View>
    );
  }

  const renderBookItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { book: item, bookTitle: item.title })}
    >
      <Image 
        source={{ uri: item.coverUrl || 'https://via.placeholder.com/60x90.png?text=No+Cover' }} 
        style={styles.coverThumbnail} 
      />
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.author}>by {item.author}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.borrowedButton}
        onPress={() => navigation.navigate('Borrowed')}
      >
        <Text style={styles.borrowedButtonText}>View Borrowed Books</Text>
      </TouchableOpacity>
      
      <FlatList
        data={allBooks}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No books found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 10, 
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row', 
    alignItems: 'center',
  },
  coverThumbnail: { 
    width: 60,
    height: 90,
    marginRight: 10,
    borderRadius: 4,
    resizeMode: 'cover',
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  author: {
    fontSize: 13,
    color: '#666',
    marginBottom: 5,
  },
  description: {
    fontSize: 11,
    color: '#999',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4a90e2',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
  borrowedButton: {
    backgroundColor: '#5cb85c',
    padding: 12,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  borrowedButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default HomeScreen;