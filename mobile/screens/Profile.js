import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, Modal, TextInput, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function ProfileScreen({ navigation }) {
    const { user, logout, updateBalance } = useAuth();
    const { t } = useLanguage();
    const [isTopUpVisible, setIsTopUpVisible] = useState(false);
    const [topUpAmount, setTopUpAmount] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleTopUp = () => {
        const amount = parseFloat(topUpAmount);
        if (isNaN(amount) || amount <= 0) {
            Alert.alert(t('error'), t('enterValidAmount'));
            return;
        }

        setIsProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            updateBalance(amount);
            setIsProcessing(false);
            setIsTopUpVisible(false);
            setTopUpAmount('');
            Alert.alert(t('success'), t('balanceToppedUp', { amount }));
        }, 1500);
    };

    if (!user) return null;

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar style="light" />
            <LinearGradient colors={['#0f172a', '#1e1b4b']} style={styles.gradient} />

            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                {/* Profile Header */}
                <View style={styles.header}>
                    <View style={styles.avatarWrapper}>
                        <Image source={{ uri: user.avatar }} style={styles.avatar} />
                        <TouchableOpacity style={styles.editAvatar}>
                            <Ionicons name="camera" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.schoolId}>ID: {user.schoolId}</Text>
                </View>

                {/* Wallet Card */}
                <LinearGradient
                    colors={['#6366f1', '#4338ca']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.walletCard}
                >
                    <View>
                        <Text style={styles.walletLabel}>{t('walletBalance')}</Text>
                        <Text style={styles.balance}>{user.balance} ₸</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.topUpBtn}
                        onPress={() => setIsTopUpVisible(true)}
                    >
                        <Ionicons name="add-circle" size={24} color="#6366f1" />
                        <Text style={styles.topUpText}>{t('topUp')}</Text>
                    </TouchableOpacity>
                </LinearGradient>

                {/* Menu actions */}
                <View style={styles.menuSection}>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => navigation.navigate('OrderHistory')}
                    >
                        <View style={[styles.menuIconContainer, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                            <Ionicons name="receipt-outline" size={22} color="#3b82f6" />
                        </View>
                        <Text style={styles.menuText}>{t('orderHistory')}</Text>
                        <Ionicons name="chevron-forward" size={20} color="#475569" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => navigation.navigate('Settings')}
                    >
                        <View style={[styles.menuIconContainer, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
                            <Ionicons name="settings-outline" size={22} color="#10b981" />
                        </View>
                        <Text style={styles.menuText}>{t('settings')}</Text>
                        <Ionicons name="chevron-forward" size={20} color="#475569" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={[styles.menuIconContainer, { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
                            <Ionicons name="help-buoy-outline" size={22} color="#f59e0b" />
                        </View>
                        <Text style={styles.menuText}>{t('support')}</Text>
                        <Ionicons name="chevron-forward" size={20} color="#475569" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                    <Ionicons name="log-out-outline" size={22} color="#ef4444" />
                    <Text style={styles.logoutText}>{t('logoutBtn')}</Text>
                </TouchableOpacity>

                <Text style={styles.version}>SmartCTX v1.1.0</Text>
            </ScrollView>

            {/* Top Up Modal */}
            <Modal
                visible={isTopUpVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsTopUpVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{t('topUpTitle')}</Text>
                        <Text style={styles.modalSub}>{t('topUpSub')}</Text>

                        <TextInput
                            style={styles.amountInput}
                            placeholder={t('topUpPlaceholder')}
                            placeholderTextColor="#64748b"
                            keyboardType="numeric"
                            value={topUpAmount}
                            onChangeText={setTopUpAmount}
                            autoFocus={true}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalBtn, styles.cancelBtn]}
                                onPress={() => setIsTopUpVisible(false)}
                            >
                                <Text style={styles.cancelBtnText}>{t('cancel')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalBtn, styles.confirmBtn]}
                                onPress={handleTopUp}
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.confirmBtnText}>{t('topUp')}</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#0f172a' },
    gradient: { ...StyleSheet.absoluteFillObject },
    container: { alignItems: 'center', paddingTop: 24, paddingHorizontal: 24, paddingBottom: 100 },
    header: { alignItems: 'center', marginBottom: 36 },
    avatarWrapper: { position: 'relative', marginBottom: 16 },
    avatar: { width: 110, height: 110, borderRadius: 55, borderWidth: 4, borderColor: 'rgba(99, 102, 241, 0.4)' },
    editAvatar: {
        position: 'absolute', bottom: 4, right: 4,
        backgroundColor: '#6366f1', width: 34, height: 34,
        borderRadius: 17, justifyContent: 'center', alignItems: 'center',
        borderWidth: 3, borderColor: '#0f172a',
    },
    name: { fontSize: 26, fontWeight: '800', color: '#fff', letterSpacing: -0.5 },
    schoolId: { fontSize: 15, color: '#94a3b8', marginTop: 6, fontWeight: '500' },

    walletCard: {
        width: '100%', borderRadius: 28, padding: 24,
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 32, shadowColor: '#6366f1', shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.4, shadowRadius: 24, elevation: 12,
    },
    walletLabel: { color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
    balance: { color: '#fff', fontSize: 32, fontWeight: '800', marginTop: 4 },
    topUpBtn: {
        backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 18, paddingVertical: 12, borderRadius: 16, gap: 8,
    },
    topUpText: { color: '#6366f1', fontWeight: '800', fontSize: 15 },

    menuSection: { width: '100%', gap: 14, marginBottom: 32 },
    menuItem: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: 'rgba(30, 41, 59, 0.6)',
        borderRadius: 22, padding: 18,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
    },
    menuIconContainer: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    menuText: { flex: 1, fontSize: 17, fontWeight: '600', color: '#f8fafc' },

    logoutBtn: {
        flexDirection: 'row', alignItems: 'center', gap: 12,
        padding: 24, marginTop: 12,
    },
    logoutText: { color: '#ef4444', fontSize: 17, fontWeight: '700' },
    version: { color: '#475569', fontSize: 14, marginTop: 24, fontWeight: '500' },

    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', padding: 20 },
    modalContent: {
        width: '100%', backgroundColor: '#1e293b', borderRadius: 28, padding: 24,
        alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    },
    modalTitle: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 8 },
    modalSub: { fontSize: 14, color: '#94a3b8', marginBottom: 24 },
    amountInput: {
        width: '100%', backgroundColor: 'rgba(15, 23, 42, 0.5)',
        height: 60, borderRadius: 16, borderWeight: 2, borderColor: '#334155',
        color: '#fff', fontSize: 24, fontWeight: '700', textAlign: 'center',
        marginBottom: 24,
    },
    modalButtons: { flexDirection: 'row', gap: 12, width: '100%' },
    modalBtn: { flex: 1, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
    cancelBtn: { backgroundColor: 'rgba(255,255,255,0.05)' },
    confirmBtn: { backgroundColor: '#6366f1' },
    cancelBtnText: { color: '#94a3b8', fontWeight: '700', fontSize: 16 },
    confirmBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
