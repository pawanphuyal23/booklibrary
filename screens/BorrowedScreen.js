import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useBooks } from '../BookContext';

const BorrowedScreen = () => {
  const { borrowedBooks, returnBook } = useBooks();

  const renderBorrowedItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.author}>by {item.author}</Text>
      </View>
      <Button 
        title="Return" 
        onPress={() => returnBook(item.id)}
        color="#dc3545"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        You have borrowed {borrowedBooks.length} books.
      </Text>
      <FlatList
        data={borrowedBooks}
        renderItem={renderBorrowedItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>You haven't borrowed any books yet.</Text>
            <Text style={styles.emptyHint}>Go back to the Home screen to borrow one!</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    padding: 15,
    backgroundColor: '#e9ecef',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listContent: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  author: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  emptyContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyHint: {
    fontSize: 14,
    color: '#666',
  }
});

export default BorrowedScreen;