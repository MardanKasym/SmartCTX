import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function OrderHistoryScreen({ navigation }) {
    const { orderHistory } = useAuth();

    const renderItem = ({ item }) => (
        <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <View>
                    <Text style={styles.orderId}>Заказ #{item.id}</Text>
                    <Text style={styles.orderDate}>{item.date}</Text>
                </View>
                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>Выполнен</Text>
                </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.orderFooter}>
                <Text style={styles.itemsCount}>{item.items} позиции</Text>
                <Text style={styles.orderTotal}>{item.total} ₸</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#0f172a', '#1e1b4b']} style={styles.gradient} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>История заказов</Text>
                <View style={{ width: 44 }} />
            </View>

            <FlatList
                data={orderHistory}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Ionicons name="receipt-outline" size={60} color="#334155" />
                        <Text style={styles.emptyText}>У вас пока нет заказов</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a' },
    gradient: { ...StyleSheet.absoluteFillObject },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: { fontSize: 20, fontWeight: '800', color: '#fff' },
    list: { padding: 20 },
    orderCard: {
        backgroundColor: 'rgba(30, 41, 59, 0.5)',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    orderId: { fontSize: 16, fontWeight: '700', color: '#f8fafc' },
    orderDate: { fontSize: 13, color: '#94a3b8', marginTop: 2 },
    statusBadge: {
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: { color: '#10b981', fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginBottom: 12,
    },
    orderFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemsCount: { fontSize: 14, color: '#64748b' },
    orderTotal: { fontSize: 17, fontWeight: '800', color: '#fff' },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100 },
    emptyText: { color: '#94a3b8', fontSize: 16, marginTop: 16 },
});
