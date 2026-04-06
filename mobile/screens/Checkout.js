import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function CheckoutScreen({ navigation }) {
    const { cart, totalPrice, clearCart } = useCart();
    const { user, updateBalance } = useAuth();
    const { t } = useLanguage();
    const [paymentMethod, setPaymentMethod] = useState('wallet'); // 'wallet' or 'kaspi'
    const [isProcessing, setIsProcessing] = useState(false);

    const handleConfirmPayment = () => {
        if (paymentMethod === 'wallet') {
            if (user.balance < totalPrice) {
                Alert.alert(t('insufficientFunds'), t('topUpOrChangePayment'));
                return;
            }

            setIsProcessing(true);
            setTimeout(() => {
                updateBalance(-totalPrice);
                setIsProcessing(false);
                const orderId = 'SC-' + Math.floor(1000 + Math.random() * 9000);
                navigation.navigate('OrderSuccess', { orderId });
            }, 2000);
        } else {
            // Simulate Kaspi payment
            setIsProcessing(true);
            setTimeout(() => {
                setIsProcessing(false);
                const orderId = 'SC-' + Math.floor(1000 + Math.random() * 9000);
                navigation.navigate('OrderSuccess', { orderId });
            }, 2500);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#0f172a', '#1e1b4b']} style={styles.gradient} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('checkout')}</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('yourOrder')}</Text>
                    <View style={styles.summaryCard}>
                        {cart.map((item, index) => (
                            <View key={index} style={styles.orderItem}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemPrice}>{item.price} ₸</Text>
                            </View>
                        ))}
                        <View style={styles.divider} />
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>{t('total')}</Text>
                            <Text style={styles.totalValue}>{totalPrice} ₸</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('paymentMethod')}</Text>

                    <TouchableOpacity
                        style={[styles.methodBtn, paymentMethod === 'wallet' && styles.methodBtnActive]}
                        onPress={() => setPaymentMethod('wallet')}
                    >
                        <View style={styles.methodInfo}>
                            <View style={[styles.methodIcon, { backgroundColor: 'rgba(99, 102, 241, 0.1)' }]}>
                                <Ionicons name="wallet-outline" size={24} color="#6366f1" />
                            </View>
                            <View>
                                <Text style={styles.methodName}>{t('myWallet')}</Text>
                                <Text style={styles.balanceText}>{t('balance')}: {user.balance} ₸</Text>
                            </View>
                        </View>
                        <Ionicons
                            name={paymentMethod === 'wallet' ? "checkmark-circle" : "ellipse-outline"}
                            size={24}
                            color={paymentMethod === 'wallet' ? "#6366f1" : "#334155"}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.methodBtn, paymentMethod === 'kaspi' && styles.methodBtnActive]}
                        onPress={() => setPaymentMethod('kaspi')}
                    >
                        <View style={styles.methodInfo}>
                            <View style={[styles.methodIcon, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                                <Text style={{ color: '#ef4444', fontWeight: '900', fontSize: 10 }}>Kaspi</Text>
                            </View>
                            <View>
                                <Text style={styles.methodName}>Kaspi.kz</Text>
                                <Text style={styles.balanceText}>{t('payViaApp')}</Text>
                            </View>
                        </View>
                        <Ionicons
                            name={paymentMethod === 'kaspi' ? "checkmark-circle" : "ellipse-outline"}
                            size={24}
                            color={paymentMethod === 'kaspi' ? "#ef4444" : "#334155"}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.payBtn, isProcessing && { opacity: 0.7 }]}
                    onPress={handleConfirmPayment}
                    disabled={isProcessing}
                >
                    {isProcessing ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.payBtnText}>{t('payAmount')} {totalPrice} ₸</Text>
                    )}
                </TouchableOpacity>
            </View>
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
    scroll: { padding: 20 },
    section: { marginBottom: 30 },
    sectionTitle: { fontSize: 13, fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16, marginLeft: 4 },
    summaryCard: {
        backgroundColor: 'rgba(30, 41, 59, 0.5)',
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    orderItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    itemName: { color: '#f8fafc', fontSize: 15 },
    itemPrice: { color: '#94a3b8', fontSize: 15, fontWeight: '600' },
    divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginVertical: 12 },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    totalLabel: { fontSize: 16, color: '#f8fafc', fontWeight: '600' },
    totalValue: { fontSize: 22, fontWeight: '800', color: '#6366f1' },

    methodBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(30, 41, 59, 0.4)',
        padding: 16,
        borderRadius: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    methodBtnActive: { borderColor: 'rgba(99, 102, 241, 0.4)', backgroundColor: 'rgba(99, 102, 241, 0.05)' },
    methodInfo: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    methodIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
    methodName: { fontSize: 16, fontWeight: '700', color: '#fff' },
    balanceText: { fontSize: 13, color: '#64748b', marginTop: 2 },

    footer: { padding: 20, paddingBottom: 30 },
    payBtn: {
        backgroundColor: '#6366f1',
        height: 60,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3, shadowRadius: 16, elevation: 8,
    },
    payBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
