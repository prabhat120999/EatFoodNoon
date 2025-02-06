import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { clearCart } from '../../redux/actions'; // Action to clear the cart
import { useDispatch } from 'react-redux'; // Redux hook to dispatch actions

const ConfirmationScreen = ({ navigation }) => {
    const dispatch = useDispatch(); // To dispatch actions

    return (
        <View style={styles.container}>
            {/* Success Message */}
            <Text style={styles.message}>✅ Your order has been placed!</Text>
            <Text style={styles.subMessage}>Your delicious meal is on its way.</Text>

            {/* Button to return to the home screen and clear the cart */}
            <TouchableOpacity
                onPress={() => {
                    dispatch(clearCart()); // Clear the cart after the order is placed
                    navigation.navigate('Tabs'); // Navigate back to the home screen
                }}
                style={styles.homeButton}>
                <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
};

// Styles for the Confirmation Screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    message: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    subMessage: { fontSize: 16, color: '#555', marginBottom: 32 },
    homeButton: { backgroundColor: '#007bff', padding: 12, borderRadius: 8 },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default memo(ConfirmationScreen);
