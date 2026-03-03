import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar style="light" />
            <View style={styles.container}>
                {/* Logo */}
                <View style={styles.logoRow}>
                    <View style={styles.logoIcon}>
                        <Text style={{ fontSize: 22 }}>🍴</Text>
                    </View>
                    <Text style={styles.logoText}>SmartCTX</Text>
                </View>

                {/* Hero */}
                <View style={styles.hero}>
                    <Text style={styles.heading}>Умное питание{'\n'}для вашего{'\n'}будущего</Text>
                    <Text style={styles.sub}>Заказывайте любимые блюда из столовой в пару кликов. Никаких очередей!</Text>
                </View>

                {/* Stats */}
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statEmoji}>⏱️</Text>
                        <Text style={styles.statVal}>0 мин</Text>
                        <Text style={styles.statLabel}>Очереди</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statEmoji}>🥗</Text>
                        <Text style={styles.statVal}>100%</Text>
                        <Text style={styles.statLabel}>Полезно</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statEmoji}>👥</Text>
                        <Text style={styles.statVal}>2.5k</Text>
                        <Text style={styles.statLabel}>Учеников</Text>
                    </View>
                </View>

                {/* CTA */}
                <View style={styles.ctaArea}>
                    <TouchableOpacity style={styles.mainBtn} onPress={() => navigation.navigate('Меню')}>
                        <Text style={styles.mainBtnText}>Открыть меню</Text>
                        <Text style={{ color: '#fff', fontSize: 18 }}>→</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#0f172a' },
    container: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },

    logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 30 },
    logoIcon: {
        width: 42, height: 42, borderRadius: 12,
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.4)',
        justifyContent: 'center', alignItems: 'center',
    },
    logoText: { fontSize: 22, fontWeight: '800', color: '#f8fafc' },

    hero: { marginBottom: 30 },
    heading: { fontSize: Math.min(width * 0.09, 36), fontWeight: '800', color: '#fff', lineHeight: Math.min(width * 0.11, 44) },
    sub: { fontSize: 15, color: '#94a3b8', marginTop: 12, lineHeight: 22 },

    statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
    statCard: {
        flex: 1, backgroundColor: 'rgba(30, 41, 59, 0.7)',
        borderRadius: 18, padding: 16, alignItems: 'center',
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
    },
    statEmoji: { fontSize: 20, marginBottom: 6 },
    statVal: { fontSize: 20, fontWeight: '800', color: '#fff' },
    statLabel: { fontSize: 11, color: '#94a3b8', marginTop: 2 },

    ctaArea: { marginTop: 'auto', marginBottom: 20 },
    mainBtn: {
        backgroundColor: '#6366f1', height: 58, borderRadius: 16,
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10,
        shadowColor: '#6366f1', shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4, shadowRadius: 16, elevation: 8,
    },
    mainBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
