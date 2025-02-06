import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppNavigation from './src/navigation/AppNavigation';

/**
 * The main entry point for the app.
 * It wraps the entire app with a Redux Provider to allow access to the Redux store.
 * The SafeAreaView ensures content is rendered within safe areas of the device screen.
*/
function App() {
  return (
    <Provider store={store}> {/* Provides the Redux store to the app */}
      <SafeAreaView style={styles.container}> {/* Ensures safe content placement */}
        <AppNavigation /> {/* Main app navigation */}
      </SafeAreaView>
    </Provider>
  );
}

// Styles for the SafeAreaView container
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes up the full height of the screen
  },
});

export default App;
