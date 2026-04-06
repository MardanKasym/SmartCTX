import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ onFinish }) {
    const logoScale = useRef(new Animated.Value(0.3)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;
    const textSlide = useRef(new Animated.Value(20)).current;
    const subtitleOpacity = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const containerOpacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // 1. Logo appears with scale
        Animated.sequence([
            Animated.parallel([
                Animated.spring(logoScale, {
                    toValue: 1,
                    useNativeDriver: true,
                    speed: 8,
                    bounciness: 12,
                }),
                Animated.timing(logoOpacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]),
            // 2. Text slides up
            Animated.parallel([
                Animated.timing(textOpacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(textSlide, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]),
            // 3. Subtitle fades in
            Animated.timing(subtitleOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // 4. Pulse animation
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.1,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                ]),
                { iterations: 2 }
            ).start(() => {
                // 5. Fade out entire splash
                Animated.timing(containerOpacity, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }).start(() => {
                    if (onFinish) onFinish();
                });
            });
        });
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity: containerOpacity }]}>
            {/* Background decorative circles */}
            <View style={[styles.bgCircle, styles.bgCircle1]} />
            <View style={[styles.bgCircle, styles.bgCircle2]} />
            <View style={[styles.bgCircle, styles.bgCircle3]} />

            {/* Logo icon */}
            <Animated.View
                style={[
                    styles.logoCircle,
                    {
                        opacity: logoOpacity,
                        transform: [
                            { scale: Animated.multiply(logoScale, pulseAnim) },
                        ],
                    },
                ]}
            >
                <Text style={styles.logoEmoji}>🍴</Text>
            </Animated.View>

            {/* App name */}
            <Animated.Text
                style={[
                    styles.appName,
                    {
                        opacity: textOpacity,
                        transform: [{ translateY: textSlide }],
                    },
                ]}
            >
                SmartCTX
            </Animated.Text>

            {/* Subtitle */}
            <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity }]}>
                Умное питание для школы
            </Animated.Text>

            {/* Bottom dots */}
            <View style={styles.dotsRow}>
                {[0, 1, 2].map((i) => (
                    <View key={i} style={[styles.dot, i === 1 && styles.dotActive]} />
                ))}
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#0f172a',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    bgCircle: {
        position: 'absolute',
        borderRadius: 999,
        opacity: 0.08,
    },
    bgCircle1: {
        width: width * 0.8,
        height: width * 0.8,
        backgroundColor: '#6366f1',
        top: -width * 0.2,
        right: -width * 0.2,
    },
    bgCircle2: {
        width: width * 0.6,
        height: width * 0.6,
        backgroundColor: '#8b5cf6',
        bottom: -width * 0.1,
        left: -width * 0.2,
    },
    bgCircle3: {
        width: width * 0.4,
        height: width * 0.4,
        backgroundColor: '#6366f1',
        top: height * 0.3,
        left: width * 0.5,
    },
    logoCircle: {
        width: 110,
        height: 110,
        borderRadius: 30,
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderWidth: 2,
        borderColor: 'rgba(99, 102, 241, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    logoEmoji: {
        fontSize: 48,
    },
    appName: {
        fontSize: 36,
        fontWeight: '800',
        color: '#f8fafc',
        letterSpacing: 2,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#94a3b8',
        fontWeight: '500',
    },
    dotsRow: {
        flexDirection: 'row',
        gap: 8,
        position: 'absolute',
        bottom: 60,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
    dotActive: {
        backgroundColor: '#6366f1',
        width: 24,
    },
});
