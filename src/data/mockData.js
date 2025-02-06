export const banners = [
    { id: '1', title: '50% off on Burgers!', image: require('../assets/banner1.jpg') },
    { id: '2', title: 'Free Delivery on Orders Above ₹250', image: require('../assets/banner2.jpg') },
    { id: '3', title: 'Order Home Made Chicken for ₹150', image: require('../assets/banner3.jpg') },

];

export const outlets = [
    { id: '1', name: 'Pizza Palace', description: 'Delicious pizzas and sides', image: require('../assets/pizza.jpg') },
    { id: '2', name: 'Burger Hub', description: 'Best burgers in town', image: require('../assets/burger.jpg') },
    { id: '3', name: 'Champaran Chicken', description: 'Home made fresh Chicken', image: require('../assets/chicken.jpeg') },
];

export const menuItems = [
    { id: '1', outletId: '1', name: 'Pepperoni Pizza', price: 120 },
    { id: '2', outletId: '1', name: 'Margherita Pizza', price: 100 },
    { id: '3', outletId: '2', name: 'Cheeseburger', price: 80 },
    { id: '4', outletId: '2', name: 'Veggie Burger', price: 70 },
    { id: '5', outletId: '3', name: 'Chicken Curry', price: 150 },
    { id: '6', outletId: '3', name: 'Chicken Fry', price: 120 },
];
