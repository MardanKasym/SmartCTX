import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function ProfileScreen() {
    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar style="light" />
            <View style={styles.container}>
                {/* Avatar */}
                <View style={styles.avatarCircle}>
                    <Text style={{ fontSize: 40 }}>👤</Text>
                </View>
                <Text style={styles.name}>Гость</Text>
                <Text style={styles.sub}>Войдите, чтобы сохранять заказы</Text>

                {/* Menu Items */}
                <View style={styles.menuList}>
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuIcon}>📋</Text>
                        <Text style={styles.menuText}>История заказов</Text>
                        <Text style={styles.arrow}>→</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuIcon}>⚙️</Text>
                        <Text style={styles.menuText}>Настройки</Text>
                        <Text style={styles.arrow}>→</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuIcon}>❓</Text>
                        <Text style={styles.menuText}>Поддержка</Text>
                        <Text style={styles.arrow}>→</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.loginBtnText}>Войти в аккаунт</Text>
                </TouchableOpacity>

                <Text style={styles.version}>SmartCTX v1.0.0</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#0f172a' },
    container: { flex: 1, alignItems: 'center', paddingTop: 40, paddingHorizontal: 20 },
    avatarCircle: {
        width: 90, height: 90, borderRadius: 45,
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderWidth: 2, borderColor: 'rgba(99, 102, 241, 0.4)',
        justifyContent: 'center', alignItems: 'center', marginBottom: 16,
    },
    name: { fontSize: 24, fontWeight: '800', color: '#fff' },
    sub: { fontSize: 14, color: '#94a3b8', marginTop: 4, marginBottom: 30 },

    menuList: { width: '100%', gap: 10, marginBottom: 30 },
    menuItem: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: 'rgba(30, 41, 59, 0.7)',
        borderRadius: 16, padding: 16,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
    },
    menuIcon: { fontSize: 20, marginRight: 14 },
    menuText: { flex: 1, fontSize: 16, fontWeight: '600', color: '#f8fafc' },
    arrow: { color: '#94a3b8', fontSize: 18 },

    loginBtn: {
        width: '100%', backgroundColor: '#6366f1', height: 56, borderRadius: 16,
        justifyContent: 'center', alignItems: 'center',
        shadowColor: '#6366f1', shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4, shadowRadius: 16, elevation: 8,
    },
    loginBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
    version: { color: '#475569', fontSize: 12, marginTop: 'auto', marginBottom: 20 },
});
