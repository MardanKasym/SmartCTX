import { menuItems } from '../data/menuItems';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MENU_CACHE_KEY = '@smartctx_menu_cache';
// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
    getMenu: async () => {
        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 800));

            // Randomly simulate network failure (10% chance) for testing
            const isNetworkFailure = Math.random() < 0.1;

            if (isNetworkFailure) {
                throw new Error("Network request failed");
            }

            // Simulate successful API response
            const response = {
                status: 'success',
                data: menuItems
            };

            // Cache the successful response
            await AsyncStorage.setItem(MENU_CACHE_KEY, JSON.stringify(response.data));

            return response.data;
        } catch (error) {
            console.log('API getMenu failed, attempting to load from cache:', error);
            try {
                // Attempt to load from cache
                const cachedDataStr = await AsyncStorage.getItem(MENU_CACHE_KEY);
                if (cachedDataStr) {
                    const cachedData = JSON.parse(cachedDataStr);
                    console.log('Successfully loaded menu from cache');
                    return cachedData;
                } else {
                    console.log('Cache is empty, falling back to local fallback data');
                    return menuItems; // Ultimate fallback if no cache and no network
                }
            } catch (cacheError) {
                console.error('Failed to load menu from cache:', cacheError);
                return menuItems; // Ultimate fallback
            }
        }
    },

    // Fetch single item details (if needed separately)
    getItemDetails: async (id) => {
        await delay(500);
        return menuItems.find(item => item.id === id);
    },

    placeOrder: async (orderData) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    status: 'success',
                    orderId: 'SC-' + Math.floor(1000 + Math.random() * 9000),
                    timestamp: new Date().toISOString()
                });
            }, 1000);
        });
    },

    getOrderStatus: async (orderId) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const statuses = ['PENDING', 'PREPARING', 'READY', 'COMPLETED'];
                resolve({
                    status: 'success',
                    orderStatus: statuses[Math.floor(Math.random() * statuses.length)],
                    estimatedTime: '5 мин'
                });
            }, 500);
        });
    }
};
