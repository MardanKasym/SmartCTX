import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '../context/CartContext';

export default function OrderStatusScreen({ navigation }) {
    const { clearCart } = useCart();
    const orderNumber = Math.floor(100 + Math.random() * 900);

    const handleDone = () => {
        clearCart();
        navigation.navigate('Главная');
    };

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar style="light" />
            <View style={styles.content}>
                <View style={styles.checkCircle}>
                    <Text style={{ fontSize: 50 }}>✅</Text>
                </View>

                <Text style={styles.title}>Заказ принят!</Text>
                <Text style={styles.sub}>Ваш номер заказа</Text>
                <Text style={styles.orderNum}>#{orderNumber}</Text>

                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoIcon}>⏱️</Text>
                        <View>
                            <Text style={styles.infoLabel}>Время ожидания</Text>
                            <Text style={styles.infoValue}>~15 минут</Text>
                        </View>
                    </View>
                    <View style={[styles.infoRow, { marginTop: 16 }]}>
                        <Text style={styles.infoIcon}>📍</Text>
                        <View>
                            <Text style={styles.infoLabel}>Где забрать</Text>
                            <Text style={styles.infoValue}>Стойка выдачи №1</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.doneBtn} onPress={handleDone}>
                    <Text style={styles.doneBtnText}>Вернуться на главную</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#0f172a' },
    content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    checkCircle: { marginBottom: 24 },
    title: { fontSize: 30, fontWeight: '800', color: '#fff', marginBottom: 8 },
    sub: { fontSize: 15, color: '#94a3b8' },
    orderNum: { fontSize: 40, fontWeight: '800', color: '#6366f1', marginTop: 4, marginBottom: 30 },
    infoCard: {
        width: '100%', backgroundColor: 'rgba(30, 41, 59, 0.7)',
        borderRadius: 20, padding: 20,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
        marginBottom: 40,
    },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    infoIcon: { fontSize: 24 },
    infoLabel: { fontSize: 13, color: '#94a3b8' },
    infoValue: { fontSize: 16, fontWeight: '700', color: '#fff', marginTop: 2 },
    doneBtn: {
        backgroundColor: '#6366f1', height: 58, borderRadius: 16,
        justifyContent: 'center', alignItems: 'center', width: '100%',
        shadowColor: '#6366f1', shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4, shadowRadius: 16, elevation: 8,
    },
    doneBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
