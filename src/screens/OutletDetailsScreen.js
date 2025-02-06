import React, { memo, useMemo, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { menuItems } from '../data/mockData';
import { addItem, removeItem } from '../../redux/actions';

/**
 * OutletDetailsScreen Component
 * Displays details of a specific outlet, including its menu items and a cart summary.
 * Users can add or remove items from the cart and view the cart.
 */
const OutletDetailsScreen = ({ route, navigation }) => {
    const { outlet } = route.params; // Outlet details passed via navigation
    const cart = useSelector(state => state.cart?.items || []); // Cart items from Redux store
    const dispatch = useDispatch(); // Hook to dispatch Redux actions

    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

    /**
     * Handles the "View Cart" button press.
     * Shows a modal if the cart is empty, otherwise navigates to the Cart screen.
     */
    const handleCartButtonPress = () => {
        if (cart.length === 0) {
            setIsModalVisible(true); // Show modal if cart is empty
        } else {
            navigation.navigate('Cart', { cart }); // Navigate to Cart screen
        }
    };

    /**
     * Closes the modal.
     */
    const closeModal = () => {
        setIsModalVisible(false);
    };

    /**
     * Adds an item to the cart.
     */
    const addToCart = (item) => {
        dispatch(addItem(item)); // Dispatch addItem action
    };

    /**
     * Removes an item from the cart.
     */
    const removeFromCart = (id) => {
        dispatch(removeItem(id)); // Dispatch removeItem action
    };

    /**
     * Checks if an item is already in the cart.
     */
    const isItemInCart = (id) => cart.some(cartItem => cartItem.id === id);

    /**
     * Renders a single menu item.
     */
    const renderMenuItem = ({ item }) => {
        const isInCart = isItemInCart(item.id);

        return (
            <View style={styles.menuItem}>
                <Text style={styles.menuItemText}>
                    {item.name} - ₹{item.price}
                </Text>
                {isInCart ? (
                    <TouchableOpacity
                        onPress={() => removeFromCart(item.id)}
                        style={styles.removeButton}>
                        <Text style={styles.buttonText}>Remove</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={() => addToCart(item)}
                        style={styles.addButton}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    /**
     * Filters menu items for the current outlet.
     */
    const menuItemList = useMemo(() => {
        return menuItems.filter(mIt => mIt.outletId === outlet.id);
    }, [outlet.id]);

    return (
        <View style={styles.container}>
            {/* Outlet Image */}
            {outlet.image ? (
                <Image
                    source={outlet.image}
                    style={styles.image}
                    resizeMode="stretch"
                />
            ) : (
                <View style={styles.imagePlaceholder}>
                    <Text style={styles.imagePlaceholderText}>No Image Available</Text>
                </View>
            )}

            {/* Outlet Name */}
            <Text style={styles.title}>{outlet.name}</Text>

            {/* Menu Items List */}
            {menuItemList.length === 0 ? (
                <Text style={styles.emptyText}>No menu items available for this outlet.</Text>
            ) : (
                <FlatList
                    data={menuItemList}
                    keyExtractor={item => item.id}
                    renderItem={renderMenuItem}
                    contentContainerStyle={styles.menuList}
                />
            )}

            {/* Cart Summary */}
            <View style={styles.cartSummary}>
                <Text style={styles.cartSummaryText}>Total Items: {cart.length}</Text>
                <TouchableOpacity
                    onPress={handleCartButtonPress}
                    style={styles.viewCartButton}>
                    <Text style={styles.buttonText}>View Cart</Text>
                </TouchableOpacity>
            </View>

            {/* Empty Cart Modal */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={isModalVisible}
                onRequestClose={closeModal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            Your cart is empty. Please add items to the cart.
                        </Text>
                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    image: { width: '100%', height: 200, borderRadius: 10, marginBottom: 16 },
    imagePlaceholder: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        marginBottom: 16,
    },
    imagePlaceholderText: { color: '#757575', fontSize: 16 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    menuList: { paddingBottom: 16 },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        padding: 12,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    menuItemText: { fontSize: 18 },
    addButton: { backgroundColor: '#4caf50', padding: 8, borderRadius: 4 },
    removeButton: { backgroundColor: '#f44336', padding: 8, borderRadius: 4 },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    cartSummary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    cartSummaryText: { fontSize: 18, fontWeight: 'bold' },
    viewCartButton: { backgroundColor: '#007bff', padding: 12, borderRadius: 8 },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#FF5733',
        padding: 10,
        borderRadius: 5,
    },
    emptyText: { fontSize: 16, textAlign: 'center', color: '#888', marginTop: 20 },
});

export default memo(OutletDetailsScreen);