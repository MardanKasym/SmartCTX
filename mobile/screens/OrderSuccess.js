import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const { width } = Dimensions.get('window');

export default function OrderSuccessScreen({ route, navigation }) {
    const { orderId } = route.params;
    const { clearCart } = useCart();
    const { t } = useLanguage();

    const handleGoToStatus = () => {
        clearCart();
        navigation.replace('OrderStatus', { orderId });
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#0f172a', '#1e1b4b']} style={styles.gradient} />

            <View style={styles.content}>
                <View style={styles.successIcon}>
                    <Ionicons name="checkmark-done-circle" size={100} color="#10b981" />
                </View>

                <Text style={styles.title}>{t('orderSuccess')}</Text>
                <Text style={styles.sub}>{t('orderId')} #{orderId} {t('orderSuccessSub')}</Text>

                <View style={styles.qrCard}>
                    <Text style={styles.qrTitle}>{t('yourCode')}</Text>
                    <View style={styles.qrContainer}>
                        <QRCode
                            value={orderId}
                            size={180}
                            color="#0f172a"
                            backgroundColor="#fff"
                        />
                    </View>
                    <Text style={styles.qrHint}>{t('showAtCounter')}</Text>
                </View>

                <TouchableOpacity style={styles.statusBtn} onPress={handleGoToStatus}>
                    <Text style={styles.statusBtnText}>{t('trackStatus')}</Text>
                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.homeBtn} onPress={() => { clearCart(); navigation.navigate('Меню'); }}>
                    <Text style={styles.homeBtnText}>{t('backToMenu')}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a' },
    gradient: { ...StyleSheet.absoluteFillObject },
    content: { flex: 1, padding: 30, alignItems: 'center', justifyContent: 'center' },
    successIcon: { marginBottom: 20 },
    title: { fontSize: 32, fontWeight: '800', color: '#fff', marginBottom: 8 },
    sub: { fontSize: 16, color: '#94a3b8', textAlign: 'center', marginBottom: 40 },

    qrCard: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
        marginBottom: 40,
    },
    qrTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a', marginBottom: 20 },
    qrContainer: { padding: 15, backgroundColor: '#fff', borderRadius: 20 },
    qrHint: { fontSize: 13, color: '#64748b', textAlign: 'center', marginTop: 20, lineHeight: 18 },

    statusBtn: {
        flexDirection: 'row',
        backgroundColor: '#6366f1',
        width: '100%',
        height: 60,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    statusBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
    homeBtn: { padding: 10 },
    homeBtnText: { color: '#94a3b8', fontSize: 15, fontWeight: '600' },
});
