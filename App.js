import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BookProvider } from './BookContext';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import BorrowedScreen from './screens/BorrowedScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <BookProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: '📚 Book Library' }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={({ route }) => ({ title: route.params.bookTitle })}
          />
          <Stack.Screen
            name="Borrowed"
            component={BorrowedScreen}
            options={{ title: '📖 My Borrowed Books' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BookProvider>
  );
}