import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Image } from 'react-native';
import { useBooks } from '../BookContext';

const DetailsScreen = ({ route }) => {
  const { book } = route.params;
  const { borrowBook, returnBook, isBookBorrowed } = useBooks();

  const borrowed = isBookBorrowed(book.id);

  const handleBorrowReturn = () => {
    if (borrowed) {
      returnBook(book.id);
    } else {
      borrowBook(book);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: book.coverUrl }} 
          style={styles.coverImage} 
          onError={() => console.log("Failed to load image")}
        />
      </View>
      
      <View style={styles.detailsBox}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>by {book.author}</Text>
        
        <View style={styles.separator} />
        
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.description}>{book.description}</Text>
        
        <View style={styles.separator} />

        <Text style={styles.statusText}>
          **Status:** {borrowed ? 'Borrowed' : 'Available'}
        </Text>
        
        <View style={styles.buttonContainer}>
          <Button
            title={borrowed ? 'Return Book' : 'Borrow Book'}
            onPress={handleBorrowReturn}
            color={borrowed ? '#dc3545' : '#007bff'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  coverImage: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  detailsBox: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  author: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  statusText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 15,
    color: '#28a745',
  },
  buttonContainer: {
    marginTop: 20,
  }
});

export default DetailsScreen;