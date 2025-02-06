import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Image, StyleSheet } from 'react-native';

// Importing screens for navigation
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import CartScreen from '../screens/CartScreen';
import OutletDetailsScreen from '../screens/OutletDetailsScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';

// Creating instances of the navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * Function to get the tab bar icon for each route based on the focus state.
 */
const getTabBarIcon = (routeName, focused) => {
    let iconSource;

    if (routeName === 'Home') {
        iconSource = focused
            ? require('../assets/home-active.png')
            : require('../assets/home-inactive.png');
    } else if (routeName === 'Search') {
        iconSource = focused
            ? require('../assets/search-active.png')
            : require('../assets/search-inactive.png');
    } else if (routeName === 'Cart') {
        iconSource = focused
            ? require('../assets/cart-active.png')
            : require('../assets/cart-inactive.png');
    }

    return <Image source={iconSource} style={styles.iconImage} />;
};

/**
 * BottomTabs component that renders the bottom tab navigation with the Home, Search, and Cart screens.
 */
const BottomTabs = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => getTabBarIcon(route.name, focused),
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
        })}
    >
        {/* Home Tab */}
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
                headerShown: false,
            }}
        />
        {/* Search Tab */}
        <Tab.Screen name="Search" component={SearchScreen} />
        {/* Cart Tab */}
        <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
);

/**
 * Main AppNavigation component that integrates both stack and tab navigations.
 */
const AppNavigation = () => (
    <NavigationContainer>
        <Stack.Navigator>
            {/* Stack Screen for BottomTabs (Tab Navigation) */}
            <Stack.Screen
                name="Tabs"
                component={BottomTabs}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
            {/* Stack Screens for other routes */}
            <Stack.Screen name="OutletDetails" component={OutletDetailsScreen} />
            <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigation;

// Styles for the tab bar icon images
const styles = StyleSheet.create({
    iconImage: { width: 24, height: 24 },
});
