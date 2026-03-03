import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

export default function CartScreen({ navigation }) {
    const { cart, totalPrice, clearCart } = useCart();

    const handleCheckout = () => {
        navigation.navigate('OrderStatus');
    };

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar style="light" />

            <View style={styles.header}>
                <Text style={styles.title}>Корзина</Text>
                {cart.length > 0 && (
                    <TouchableOpacity onPress={clearCart}>
                        <Text style={styles.clearText}>Очистить</Text>
                    </TouchableOpacity>
                )}
            </View>

            {cart.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={{ fontSize: 80 }}>🛒</Text>
                    <Text style={styles.emptyTitle}>Корзина пуста</Text>
                    <Text style={styles.emptySub}>Добавьте блюда из меню</Text>
                    <TouchableOpacity style={styles.browseBtn} onPress={() => navigation.navigate('Меню')}>
                        <Text style={styles.browseBtnText}>Перейти к меню</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <FlatList
                        data={cart}
                        renderItem={({ item }) => <CartItem item={item} />}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.list}
                        showsVerticalScrollIndicator={false}
                    />

                    <View style={styles.footer}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Итого:</Text>
                            <Text style={styles.totalValue}>{totalPrice} ₸</Text>
                        </View>
                        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
                            <Text style={styles.checkoutText}>Оформить заказ</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#0f172a' },
    header: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15,
    },
    title: { fontSize: 26, fontWeight: '800', color: '#fff' },
    clearText: { color: '#f87171', fontSize: 14, fontWeight: '600' },

    emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 80 },
    emptyTitle: { fontSize: 24, fontWeight: '700', color: '#fff', marginTop: 16 },
    emptySub: { fontSize: 15, color: '#94a3b8', marginTop: 8 },
    browseBtn: {
        marginTop: 24, paddingHorizontal: 28, paddingVertical: 12,
        borderRadius: 12, borderWidth: 1, borderColor: '#6366f1',
    },
    browseBtnText: { color: '#6366f1', fontWeight: '700', fontSize: 15 },

    list: { paddingHorizontal: 20, paddingTop: 10 },

    footer: {
        padding: 20, backgroundColor: 'rgba(30, 41, 59, 0.9)',
        borderTopLeftRadius: 28, borderTopRightRadius: 28,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
    },
    totalRow: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 16,
    },
    totalLabel: { fontSize: 16, color: '#94a3b8' },
    totalValue: { fontSize: 28, fontWeight: '800', color: '#fff' },
    checkoutBtn: {
        backgroundColor: '#6366f1', height: 58, borderRadius: 16,
        justifyContent: 'center', alignItems: 'center',
        shadowColor: '#6366f1', shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4, shadowRadius: 16, elevation: 8,
    },
    checkoutText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
