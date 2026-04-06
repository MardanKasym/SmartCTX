import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Dimensions, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { categories } from '../data/menuItems';
import FoodCard from '../components/FoodCard';
import CategoryFilter from '../components/CategoryFilter';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';

const { width } = Dimensions.get('window');

export default function MenuScreen() {
    const [menuData, setMenuData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('Все');
    const [searchQuery, setSearchQuery] = useState('');
    const { totalItems } = useCart();

    useEffect(() => {
        loadMenu();
    }, []);

    const loadMenu = async () => {
        setIsLoading(true);
        try {
            const data = await api.getMenu();
            setMenuData(data);
        } catch (error) {
            console.error('Failed to load menu:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Combined filtering: category AND search query
    const filteredItems = menuData.filter(item => {
        const matchesCategory = activeCategory === 'Все' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar style="light" />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Наше Меню</Text>
                    <Text style={styles.subtitle}>Выберите что-нибудь вкусное</Text>
                </View>
                <View style={styles.cartBadge}>
                    <Ionicons name="cart-outline" size={26} color="#fff" />
                    {totalItems > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{totalItems}</Text>
                        </View>
                    )}
                </View>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Ionicons name="search-outline" size={20} color="#94a3b8" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Поиск любимых блюд..."
                        placeholderTextColor="#64748b"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        clearButtonMode="while-editing"
                    />
                </View>
            </View>

            {/* Categories */}
            <CategoryFilter
                categories={categories}
                active={activeCategory}
                onSelect={setActiveCategory}
            />

            {/* Food Grid */}
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#6366f1" />
                    <Text style={styles.loadingText}>Загружаем вкусности...</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredItems}
                    renderItem={({ item }) => <FoodCard item={item} />}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.empty}>
                            <Text style={{ fontSize: 40 }}>🤷</Text>
                            <Text style={styles.emptyText}>В этой категории пока пусто</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#0f172a' },
    header: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 5,
    },
    title: { fontSize: 26, fontWeight: '800', color: '#fff' },
    subtitle: { fontSize: 14, color: '#94a3b8', marginTop: 2 },
    cartBadge: { position: 'relative' },
    badge: {
        position: 'absolute', top: -6, right: -6,
        backgroundColor: '#6366f1', width: 20, height: 20, borderRadius: 10,
        justifyContent: 'center', alignItems: 'center',
    },
    badgeText: { color: '#fff', fontSize: 10, fontWeight: '800' },

    searchContainer: {
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(30, 41, 59, 0.4)',
        borderRadius: 16,
        paddingHorizontal: 14,
        height: 50,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        color: '#fff',
        fontSize: 15,
        fontWeight: '500',
    },

    row: { justifyContent: 'space-between', paddingHorizontal: 16 },
    list: { paddingTop: 8, paddingBottom: 100 },
    empty: { alignItems: 'center', marginTop: 60 },
    emptyText: { color: '#94a3b8', marginTop: 12, fontSize: 16 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { color: '#94a3b8', marginTop: 16, fontSize: 15, fontWeight: '500' },
});
