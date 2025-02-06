import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { outlets, menuItems } from '../data/mockData';

const SearchScreen = () => {
    // State to hold the search query input
    const [query, setQuery] = useState('');

    // State to hold search results
    const [results, setResults] = useState([]);

    // State to hold the debounced query
    const [debouncedQuery, setDebouncedQuery] = useState('');

    // Debounce the search query to optimize performance
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300); // Delay before updating the debounced query

        // Clean up the timeout on query change
        return () => clearTimeout(timeoutId);
    }, [query]);

    // Update search results based on the debounced query
    useEffect(() => {
        if (debouncedQuery) {
            // Filter outlets based on the debounced query
            const filteredOutlets = outlets.filter(outlet =>
                outlet.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
            );

            // Filter menu items based on the debounced query
            const filteredMenuItems = menuItems.filter(item =>
                item.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
            );

            // Set the combined filtered results
            setResults([...filteredOutlets, ...filteredMenuItems]);
        } else {
            // Clear results if query is empty
            setResults([]);
        }
    }, [debouncedQuery]);

    // Render individual search result item
    const renderResult = ({ item }) => (
        <View style={styles.resultItem}>
            <Text style={styles.resultName}>{item.name}</Text>
            {item.description && (
                <Text style={styles.resultDescription}>{item.description}</Text>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                value={query}
                onChangeText={setQuery} // Update query on input change
                placeholder="Search for outlets or menu items..."
                style={styles.searchBar}
            />
            {results.length === 0 ? (
                // Display message when no results are found
                <Text style={styles.noResults}>
                    No results found. Try a different query.
                </Text>
            ) : (
                <FlatList
                    data={results}
                    renderItem={renderResult}
                    keyExtractor={(item, index) => `${item.name}-${index}`} // Unique key for each item
                />
            )}
        </View>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 10 },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
    },
    resultItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        marginBottom: 8,
    },
    resultName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    resultDescription: { fontSize: 14, color: '#666' },
    noResults: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#999',
    },
});

export default SearchScreen;
