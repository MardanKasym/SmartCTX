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
        <View style={[styles.bokeh, styles.bokeh1]} />
        <View style={[styles.bokeh, styles.bokeh2]} />
        <View style={[styles.bokeh, styles.bokeh3]} />
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
    container: { flex: 1 },
    content: { 
        flex: 1, 
        paddingHorizontal: 24, 
        paddingBottom: 40,
        paddingTop: Platform.OS === 'android' ? 50 : 20, 
        justifyContent: 'space-between' 
    },

    bokeh: { position: 'absolute', borderRadius: 999 },
    bokeh1: { width: width * 0.8, height: width * 0.8, backgroundColor: 'rgba(99, 102, 241, 0.1)', top: -width * 0.2, right: -width * 0.2 },
    bokeh2: { width: width * 0.6, height: width * 0.6, backgroundColor: 'rgba(139, 92, 246, 0.08)', top: width * 0.5, left: -width * 0.3 },
    bokeh3: { width: width * 0.4, height: width * 0.4, backgroundColor: 'rgba(99, 102, 241, 0.06)', bottom: width * 0.1, right: width * 0.1 },

    headerContainer: { marginTop: 40 },
    iconContainer: {
        width: 64, height: 64, borderRadius: 22,
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.3)',
        justifyContent: 'center', alignItems: 'center',
        marginBottom: 32,
    },
    greeting: { 
        fontSize: 34, 
        fontWeight: '800', 
        color: '#f8fafc', 
        lineHeight: 44,
        letterSpacing: -0.5
    },
    title: { fontSize: 36, fontWeight: '900', color: '#818cf8', marginTop: 8 },
    subtitle: { 
        fontSize: 17, 
        color: '#94a3b8', 
        marginTop: 16, 
        lineHeight: 26, 
        fontWeight: '500'
    },

    cardsContainer: { gap: 24, marginBottom: 10 },
    statsCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(30, 41, 59, 0.6)',
        borderRadius: 28,
        padding: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    statItem: { flex: 1, alignItems: 'center', gap: 8 },
    divider: { width: 1, height: '60%', backgroundColor: 'rgba(255,255,255,0.1)' },
    statValue: { fontSize: 26, fontWeight: '800', color: '#fff' },
    statLabel: { fontSize: 13, color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },

    actionButton: {
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 24,
        elevation: 12,
    },
    gradientButton: {
        height: 72,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        paddingHorizontal: 20,
    },
    buttonText: { color: '#fff', fontSize: 19, fontWeight: '700', letterSpacing: 0.5 },
    arrowCircle: {
        width: 36, height: 36, borderRadius: 18,
        backgroundColor: '#fff',
        justifyContent: 'center', alignItems: 'center',
    },
});
