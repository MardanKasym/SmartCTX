import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { menuItems, categories } from '../data/menuItems';
import FoodCard from '../components/FoodCard';
import CategoryFilter from '../components/CategoryFilter';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

export default function MenuScreen() {
    const [activeCategory, setActiveCategory] = useState('Все');
    const { totalItems } = useCart();

    const filteredItems = activeCategory === 'Все'
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory);

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
                    <Text style={{ fontSize: 20 }}>🛒</Text>
                    {totalItems > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{totalItems}</Text>
                        </View>
                    )}
                </View>
            </View>

            {/* Categories */}
            <CategoryFilter
                categories={categories}
                active={activeCategory}
                onSelect={setActiveCategory}
            />

            {/* Food Grid */}
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
    row: { justifyContent: 'space-between', paddingHorizontal: 16 },
    list: { paddingTop: 8, paddingBottom: 100 },
    empty: { alignItems: 'center', marginTop: 60 },
    emptyText: { color: '#94a3b8', marginTop: 12, fontSize: 16 },
});
