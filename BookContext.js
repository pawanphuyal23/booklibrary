import React, { createContext, useState, useContext } from 'react';
import { database, MAX_BORROWED_BOOKS } from './firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { Alert } from 'react-native';

const BookContext = createContext();

export const useBooks = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const booksRef = ref(database, 'books');
    
    onValue(booksRef, (snapshot) => {
      const data = snapshot.val();
      const loadedBooks = [];
      if (data) {
        Object.keys(data).forEach(key => {
          loadedBooks.push({ id: key, ...data[key] });
        });
      }
      setAllBooks(loadedBooks);
      setIsLoading(false);
    }, (error) => {
      console.error("Firebase fetch error: ", error);
      Alert.alert("Error", "Failed to load books.");
      setIsLoading(false);
    });
  }, []);

  const borrowBook = (book) => {
    if (borrowedBooks.length >= MAX_BORROWED_BOOKS) {
      Alert.alert(
        "Borrow Limit Reached",
        `You cannot borrow more than ${MAX_BORROWED_BOOKS} books. Please return a book first.`
      );
      return false;
    }

    if (!borrowedBooks.some(b => b.id === book.id)) {
      setBorrowedBooks(prev => [...prev, book]);
      Alert.alert("Success", `${book.title} has been borrowed.`);
      return true;
    }
    return false;
  };

  const returnBook = (bookId) => {
    setBorrowedBooks(prev => prev.filter(book => book.id !== bookId));
    Alert.alert("Success", "The book has been returned.");
  };

  const isBookBorrowed = (bookId) => {
    return borrowedBooks.some(book => book.id === bookId);
  };

  const contextValue = {
    allBooks,
    borrowedBooks,
    isLoading,
    borrowBook,
    returnBook,
    isBookBorrowed,
  };

  return (
    <BookContext.Provider value={contextValue}>
      {children}
    </BookContext.Provider>
  );
};