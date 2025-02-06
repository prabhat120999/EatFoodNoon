import React, { memo } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { banners, outlets } from '../data/mockData'; // Assuming banners and outlets are coming from mockData

const HomeScreen = ({ navigation }) => {
    // Render Banner Component
    const renderBanner = ({ item }) => (
        <View style={styles.banner}>
            <Image source={item.image} style={styles.bannerImage} />
            <Text style={styles.bannerTitle}>{item?.title}</Text>
        </View>
    );

    // Render Outlet Component
    const renderOutlet = ({ item }) => (
        <TouchableOpacity
            style={styles.outletCard}
            onPress={() => navigation.navigate('OutletDetails', { outlet: item })}
        >
            <Image source={item.image} style={styles.outletImage} />
            <View style={styles.outletInfo}>
                <Text style={styles.outletName}>{item.name}</Text>
                <Text style={styles.outletDescription}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Banner Section */}
            <FlatList
                data={banners}
                renderItem={renderBanner}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.bannerList}
            />

            {/* Outlets Section */}
            <FlatList
                data={outlets}
                renderItem={renderOutlet}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.outletList}
            />
        </View>
    );
};

// Styles for the Home Screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // Banner Section
    banner: {
        margin: 10,
    },
    bannerImage: {
        width: 300,
        height: 150,
        borderRadius: 10,
    },
    bannerTitle: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    bannerList: {
        paddingVertical: 10,
    },

    // Outlets Section
    outletCard: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 15,
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 10,
        elevation: 2, // Adds shadow for Android
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    outletImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    outletInfo: {
        flex: 1,
    },
    outletName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    outletDescription: {
        marginTop: 5,
        color: '#666',
    },
    outletList: {
        paddingBottom: 20,
    },
});

export default memo(HomeScreen);
