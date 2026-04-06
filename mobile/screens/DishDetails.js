import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function DishDetails({ route, navigation }) {
    const { item } = route.params;
    const { addToCart } = useCart();
    const scrollY = useRef(new Animated.Value(0)).current;

    const headerHeight = scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: [height * 0.45, height * 0.3],
        extrapolate: 'clamp',
    });

    const imageScale = scrollY.interpolate({
        inputRange: [-100, 0],
        outputRange: [1.2, 1],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.headerBtns}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
            </SafeAreaView>

            <Animated.View style={[styles.imageContainer, { height: headerHeight }]}>
                <Animated.Image
                    source={{ uri: item.image }}
                    style={[styles.image, { transform: [{ scale: imageScale }] }]}
                />
                <LinearGradient
                    colors={['transparent', 'rgba(15, 23, 42, 0.8)', '#0f172a']}
                    style={styles.gradient}
                />
            </Animated.View>

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
            >
                <View style={styles.content}>
                    <View style={styles.titleRow}>
                        <View style={styles.categoryBadge}>
                            <Text style={styles.categoryText}>{item.category}</Text>
                        </View>
                        <View style={styles.calorieBadge}>
                            <Text style={styles.calorieText}>🔥 {item.calories} ккал</Text>
                        </View>
                    </View>

                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>{item.price} ₸</Text>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Описание</Text>
                        <Text style={styles.description}>{item.description}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Ингредиенты</Text>
                        <View style={styles.tagContainer}>
                            {item.ingredients?.map((ing, index) => (
                                <View key={index} style={styles.tag}>
                                    <Text style={styles.tagText}>{ing}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {item.allergens?.length > 0 && (
                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { color: '#fca5a5' }]}>Аллергены</Text>
                            <View style={styles.tagContainer}>
                                {item.allergens.map((all, index) => (
                                    <View key={index} style={[styles.tag, styles.allergenTag]}>
                                        <Text style={styles.allergenTagText}>{all}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    <View style={{ height: 120 }} />
                </View>
            </Animated.ScrollView>

            <View style={styles.footer}>
                <LinearGradient
                    colors={['rgba(15, 23, 42, 0)', 'rgba(15, 23, 42, 1)']}
                    style={styles.footerGradient}
                />
                <TouchableOpacity
                    style={styles.addToCartBtn}
                    onPress={() => {
                        addToCart(item);
                        navigation.goBack();
                    }}
                >
                    <Text style={styles.addToCartBtnText}>В корзину — {item.price} ₸</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a' },
    headerBtns: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        paddingHorizontal: 20,
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(30, 41, 59, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        marginTop: 10,
    },
    imageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    scrollContent: {
        paddingTop: height * 0.4,
    },
    content: {
        backgroundColor: '#0f172a',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingHorizontal: 24,
        paddingTop: 32,
        minHeight: height * 0.6,
    },
    titleRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    categoryBadge: {
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(99, 102, 241, 0.3)',
    },
    categoryText: {
        color: '#818cf8',
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    calorieBadge: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    calorieText: {
        color: '#fbbf24',
        fontSize: 12,
        fontWeight: '600',
    },
    name: {
        fontSize: 28,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 8,
    },
    price: {
        fontSize: 24,
        fontWeight: '800',
        color: '#10b981',
        marginBottom: 32,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#f1f5f9',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: '#94a3b8',
        lineHeight: 24,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        backgroundColor: 'rgba(30, 41, 59, 0.6)',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    tagText: {
        color: '#cbd5e1',
        fontSize: 14,
        fontWeight: '500',
    },
    allergenTag: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderColor: 'rgba(239, 68, 68, 0.2)',
    },
    allergenTagText: {
        color: '#fca5a5',
        fontSize: 14,
        fontWeight: '600',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 24,
        paddingBottom: 40,
    },
    footerGradient: {
        position: 'absolute',
        top: -60,
        left: 0,
        right: 0,
        height: 60,
    },
    addToCartBtn: {
        backgroundColor: '#6366f1',
        height: 64,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 10,
    },
    addToCartBtnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
});
