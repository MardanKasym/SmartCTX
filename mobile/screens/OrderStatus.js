import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Animated, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import { useLanguage } from '../context/LanguageContext';

const { width } = Dimensions.get('window');

const getStatuses = (t) => [
    { id: 'PENDING', label: t('pending'), icon: 'checkmark-circle-outline', color: '#94a3b8' },
    { id: 'PREPARING', label: t('preparing'), icon: 'restaurant-outline', color: '#fbbf24' },
    { id: 'READY', label: t('ready'), icon: 'bag-handle-outline', color: '#10b981' },
    { id: 'COMPLETED', label: t('completed'), icon: 'flag-outline', color: '#6366f1' },
];

export default function OrderStatusScreen({ route, navigation }) {
    const { t } = useLanguage();
    const statuses = getStatuses(t);
    const { orderId = 'SC-8291' } = route.params || {};
    const [currentStep, setCurrentStep] = useState(1);
    const [qrVisible, setQrVisible] = useState(false);
    const progressAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Simple simulation of order moving through stages
        const timer = setInterval(() => {
            setCurrentStep(prev => (prev < statuses.length - 1 ? prev + 1 : prev));
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        Animated.spring(progressAnim, {
            toValue: currentStep,
            useNativeDriver: false,
            speed: 10,
        }).start();
    }, [currentStep]);

    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 3],
        outputRange: ['0%', '100%'],
    });

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#0f172a', '#1e1b4b']}
                style={styles.gradient}
            />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
                    <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('orderStatus')}</Text>
                <View style={{ width: 44 }} />
            </View>

            <View style={styles.content}>
                <View style={styles.orderInfo}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={styles.orderId}>{t('orderId')} #{orderId}</Text>
                            <Text style={styles.orderTime}>{t('today')}, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.qrToggleBtn}
                            onPress={() => setQrVisible(true)}
                        >
                            <Ionicons name="qr-code-outline" size={24} color="#6366f1" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* QR Modal */}
                <Modal
                    visible={qrVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setQrVisible(false)}
                >
                    <View style={styles.qrModalOverlay}>
                        <View style={styles.qrModalContent}>
                            <TouchableOpacity
                                style={styles.qrModalClose}
                                onPress={() => setQrVisible(false)}
                            >
                                <Ionicons name="close" size={28} color="#0f172a" />
                            </TouchableOpacity>
                            <Text style={styles.qrModalTitle}>{t('yourCode')}</Text>
                            <View style={styles.qrModalWrapper}>
                                <QRCode value={orderId} size={200} />
                            </View>
                            <Text style={styles.qrModalId}>#{orderId}</Text>
                            <Text style={styles.qrModalHint}>{t('showAtCounter')}</Text>
                        </View>
                    </View>
                </Modal>

                {/* Progress Visualizer */}
                <View style={styles.trackerContainer}>
                    <View style={styles.progressBarBg}>
                        <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
                    </View>

                    {statuses.map((status, index) => {
                        const isActive = index <= currentStep;
                        const isCurrent = index === currentStep;

                        return (
                            <View key={status.id} style={styles.statusItem}>
                                <View style={[
                                    styles.iconCircle,
                                    isActive && { backgroundColor: status.color, borderColor: status.color }
                                ]}>
                                    <Ionicons
                                        name={status.icon}
                                        size={22}
                                        color={isActive ? '#fff' : '#475569'}
                                    />
                                    {isCurrent && (
                                        <View style={styles.pulse} />
                                    )}
                                </View>
                                <View style={styles.statusTextContainer}>
                                    <Text style={[
                                        styles.statusLabel,
                                        isActive && styles.activeText,
                                        isCurrent && { color: status.color }
                                    ]}>
                                        {status.label}
                                    </Text>
                                    <Text style={styles.statusTime}>
                                        {isActive ? t('completed') : t('pending')}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>

                {/* Info Card */}
                <View style={styles.infoCard}>
                    <Ionicons name="information-circle-outline" size={24} color="#818cf8" />
                    <Text style={styles.infoText}>
                        {t('waitInfo')}
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.actionBtnText}>{t('gotIt')}</Text>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    closeBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: { fontSize: 18, fontWeight: '700', color: '#fff' },
    content: { flex: 1, paddingHorizontal: 24, paddingTop: 20 },
    orderInfo: { marginBottom: 40 },
    orderId: { fontSize: 24, fontWeight: '800', color: '#fff' },
    orderTime: { fontSize: 14, color: '#94a3b8', marginTop: 4 },
    qrToggleBtn: {
        width: 50, height: 50, borderRadius: 15,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.2)',
    },

    qrModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 20 },
    qrModalContent: {
        width: '100%', backgroundColor: '#fff', borderRadius: 32, padding: 30,
        alignItems: 'center', position: 'relative',
    },
    qrModalClose: { position: 'absolute', top: 20, right: 20, padding: 5 },
    qrModalTitle: { fontSize: 20, fontWeight: '800', color: '#0f172a', marginBottom: 25 },
    qrModalWrapper: { padding: 15, backgroundColor: '#fff', borderRadius: 20, borderWidth: 1, borderColor: '#f1f5f9' },
    qrModalId: { fontSize: 18, fontWeight: '700', color: '#6366f1', marginTop: 20 },
    qrModalHint: { fontSize: 14, color: '#64748b', textAlign: 'center', marginTop: 10 },

    trackerContainer: {
        position: 'relative',
        paddingLeft: 20,
        marginBottom: 40,
    },
    progressBarBg: {
        position: 'absolute',
        left: 36,
        top: 20,
        bottom: 20,
        width: 2,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    progressBarFill: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#6366f1',
    },
    statusItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 36,
    },
    iconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(30, 41, 59, 0.5)',
        borderWidth: 2,
        borderColor: '#334155',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    pulse: {
        position: 'absolute',
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: 'rgba(99, 102, 241, 0.3)',
    },
    statusTextContainer: { marginLeft: 20 },
    statusLabel: { fontSize: 17, fontWeight: '700', color: '#475569' },
    activeText: { color: '#f8fafc' },
    statusTime: { fontSize: 13, color: '#64748b', marginTop: 2 },

    infoCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        padding: 16,
        borderRadius: 16,
        gap: 12,
        alignItems: 'center',
        marginBottom: 30,
    },
    infoText: { flex: 1, color: '#94a3b8', fontSize: 14, lineHeight: 20 },
    actionBtn: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    actionBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
