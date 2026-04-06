import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, SafeAreaView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const { width } = Dimensions.get('window');

// Premium decorative background shapes
const BackgroundBlobs = () => (
    <View style={StyleSheet.absoluteFill}>
        <View style={styles.blob1} />
        <View style={styles.blob2} />
        <View style={styles.blob3} />
    </View>
);

export default function HomeScreen({ navigation }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const { user } = useAuth();
    const { t } = useLanguage();

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 20,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const greeting = user ? `${t('welcomeBack')}, ${user.name}!` : t('welcomeTo');

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />

            <LinearGradient
                colors={['#0f172a', '#1e1b4b']} // Deep premium dark theme
                style={StyleSheet.absoluteFill}
            />

            <BackgroundBlobs />

            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }]
                    }
                ]}
            >
                <View style={styles.headerContainer}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="restaurant" size={40} color="#6366f1" />
                    </View>
                    <Text style={styles.greeting}>{greeting}</Text>
                    {!user && <Text style={styles.title}>SmartCTX</Text>}
                    <Text style={styles.subtitle}>
                        {t('smartDiningDesc')}
                    </Text>
                </View>

                <View style={styles.cardsContainer}>
                    <View style={styles.statsCard}>
                        <View style={styles.statItem}>
                            <Ionicons name="time-outline" size={24} color="#818cf8" />
                            <Text style={styles.statValue}>~5 {t('min')}</Text>
                            <Text style={styles.statLabel}>{t('prepTime')}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.statItem}>
                            <Ionicons name="flame-outline" size={24} color="#fbbf24" />
                            <Text style={styles.statValue}>100%</Text>
                            <Text style={styles.statLabel}>{t('freshFood')}</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('Меню')}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#6366f1', '#4f46e5']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradientButton}
                        >
                            <Text style={styles.buttonText}>{t('openMenu')}</Text>
                            <View style={styles.arrowCircle}>
                                <Ionicons name="arrow-forward" size={20} color="#6366f1" />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#0f172a' },
    gradientBg: {
        ...StyleSheet.absoluteFillObject,
    },
    bokeh: {
        position: 'absolute',
        borderRadius: 999,
    },
    bokeh1: {
        width: width * 0.7,
        height: width * 0.7,
        backgroundColor: 'rgba(99, 102, 241, 0.08)',
        top: -width * 0.15,
        right: -width * 0.15,
    },
    bokeh2: {
        width: width * 0.5,
        height: width * 0.5,
        backgroundColor: 'rgba(139, 92, 246, 0.06)',
        top: width * 0.4,
        left: -width * 0.2,
    },
    bokeh3: {
        width: width * 0.3,
        height: width * 0.3,
        backgroundColor: 'rgba(99, 102, 241, 0.05)',
        bottom: width * 0.15,
        right: width * 0.1,
    },
    container: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },

    logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 30 },
    logoIcon: {
        width: 44, height: 44, borderRadius: 14,
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.4)',
        justifyContent: 'center', alignItems: 'center',
    },
    logoText: { fontSize: 22, fontWeight: '800', color: '#f8fafc', letterSpacing: 1 },

    hero: { marginBottom: 30 },
    heading: {
        fontSize: Math.min(width * 0.09, 36),
        fontWeight: '800',
        color: '#fff',
        lineHeight: Math.min(width * 0.11, 44),
    },
    headingAccent: {
        color: '#818cf8',
    },
    sub: { fontSize: 15, color: '#94a3b8', marginTop: 12, lineHeight: 22 },

    statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
    statCard: {
        flex: 1,
        backgroundColor: 'rgba(30, 41, 59, 0.5)',
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(10px)',
    },
    statEmoji: { fontSize: 22, marginBottom: 6 },
    statVal: { fontSize: 20, fontWeight: '800', color: '#fff' },
    statLabel: { fontSize: 11, color: '#94a3b8', marginTop: 2 },

    ctaArea: { marginTop: 'auto', marginBottom: 20 },
    mainBtn: {
        backgroundColor: '#6366f1',
        height: 60,
        borderRadius: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    mainBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
