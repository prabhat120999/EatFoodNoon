import React, { memo, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; // Redux hooks
import { removeItem } from '../../redux/actions';

const Cart = ({ route, navigation }) => {
    const cart = useSelector(state => state.cart?.items || []); // Access the cart items from Redux state
    const [paymentMethod, setPaymentMethod] = useState('Credit Card'); // Default payment method is Credit Card
    const dispatch = useDispatch(); // To dispatch actions to Redux

    // Function to calculate the subtotal, tax (18%), and total
    const calculateTotal = () => {
        const subtotal = cart.reduce((sum, item) => sum + item.price, 0); // Sum of all item prices
        const tax = subtotal * 0.18; // 18% tax
        const total = subtotal + tax; // Total after tax
        return {
            subtotal: subtotal.toFixed(2),
            tax: tax.toFixed(2),
            total: total.toFixed(2),
        };
    };

    // Function to handle item removal from the cart
    const handleRemoveItem = (id) => {
        dispatch(removeItem(id)); // Dispatch removeItem action to remove the item from the cart
    };

    // Render each cart item
    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Text style={styles.cartItemText}>
                {item.name} - ₹{item.price}
            </Text>
            <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.removeButton}>
                <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
        </View>
    );

    // If the cart is empty, show a message and an option to go to the products screen
    if (!cart || cart.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyCartText}>
                    Your cart is empty. Please add items to your cart!
                </Text>
                <TouchableOpacity
                    style={styles.addItemsButton}
                    onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Go to Products</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Calculate the total, tax, and subtotal values
    const { subtotal, tax, total } = calculateTotal();

    return (
        <View style={styles.container}>
            {/* Cart Items List */}
            <FlatList
                data={cart}
                keyExtractor={item => item.id}
                renderItem={renderCartItem}
                contentContainerStyle={styles.cartList}
            />

            {/* Payment Method Section */}
            <View style={styles.paymentMethodSection}>
                <Text style={styles.paymentMethodText}>
                    Payment Method: {paymentMethod}
                </Text>
                <TouchableOpacity
                    style={styles.changePaymentButton}
                    onPress={() => {
                        // Toggle payment method between 'Credit Card' and 'Cash on Delivery'
                        setPaymentMethod(
                            paymentMethod === 'Credit Card'
                                ? 'Cash on Delivery'
                                : 'Credit Card',
                        );
                    }}>
                    <Text style={styles.buttonText}>Change Payment Method</Text>
                </TouchableOpacity>
            </View>

            {/* Order Summary Section */}
            <View style={styles.orderSummary}>
                <Text style={styles.summaryText}>Subtotal: ₹{subtotal}</Text>
                <Text style={styles.summaryText}>Tax (18%): ₹{tax}</Text>
                <Text style={styles.summaryText}>Total: ₹{total}</Text>
                <TouchableOpacity
                    style={styles.placeOrderButton}
                    onPress={() => navigation.navigate('Confirmation')}>
                    <Text style={styles.buttonText}>Place Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Styles for the Cart Component
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    cartList: { paddingBottom: 16 },
    cartItem: { padding: 12, borderBottomWidth: 1, borderColor: '#ccc' },
    cartItemText: { fontSize: 18 },
    removeButton: {
        backgroundColor: '#f44336',
        padding: 8,
        borderRadius: 4,
        marginTop: 8,
    },
    paymentMethodSection: {
        padding: 16,
        borderTopWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f8f8f8',
    },
    paymentMethodText: { fontSize: 18, marginBottom: 8 },
    changePaymentButton: {
        backgroundColor: '#3498db',
        padding: 12,
        borderRadius: 8,
    },
    orderSummary: {
        padding: 16,
        borderTopWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    summaryText: { fontSize: 18, marginBottom: 8 },
    placeOrderButton: { backgroundColor: '#4caf50', padding: 12, borderRadius: 8 },
    buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },

    // Empty Cart Styles
    emptyCartText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    addItemsButton: {
        backgroundColor: '#3498db',
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
    },
});

export default memo(Cart);
