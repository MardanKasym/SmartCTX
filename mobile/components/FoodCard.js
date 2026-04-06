import React, { useRef } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const categoryColors = {
    'Супы': '#f59e0b',
    'Горячее': '#ef4444',
    'Салаты': '#22c55e',
    'Напитки': '#3b82f6',
    'Десерты': '#ec4899',
};

export default function FoodCard({ item }) {
    const navigation = useNavigation();
    const { addToCart } = useCart();
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const btnAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
            speed: 50,
            bounciness: 4,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            speed: 20,
            bounciness: 10,
        }).start();
    };

    const handleAddToCart = () => {
        // Bounce animation on the + button
        Animated.sequence([
            Animated.spring(btnAnim, {
                toValue: 1.3,
                useNativeDriver: true,
                speed: 50,
                bounciness: 12,
            }),
            Animated.spring(btnAnim, {
                toValue: 1,
                useNativeDriver: true,
                speed: 20,
                bounciness: 8,
            }),
        ]).start();
        addToCart(item);
    };

    const tagColor = categoryColors[item.category] || '#6366f1';

    return (
        <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => navigation.navigate('DishDetails', { item })}
        >
            <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
                {/* Image with overlay */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    {/* Gradient overlay */}
                    <View style={styles.imageOverlay} />
                    {/* Calorie badge */}
                    <View style={styles.calorieBadge}>
                        <Text style={styles.calorieIcon}>🔥</Text>
                        <Text style={styles.calorieText}>{item.calories}</Text>
                    </View>
                </View>

                <View style={styles.info}>
                    {/* Category tag */}
                    <View style={[styles.categoryTag, { backgroundColor: tagColor + '20', borderColor: tagColor + '40' }]}>
                        <Text style={[styles.categoryText, { color: tagColor }]}>{item.category}</Text>
                    </View>

                    <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>

                    <View style={styles.footer}>
                        <Text style={styles.price}>{item.price} ₸</Text>
                        <TouchableWithoutFeedback onPress={handleAddToCart}>
                            <Animated.View style={[styles.addBtn, { transform: [{ scale: btnAnim }] }]}>
                                <Text style={styles.addBtnText}>+</Text>
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        backgroundColor: 'rgba(30, 41, 59, 0.8)',
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: CARD_WIDTH * 0.7,
    },
    imageOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 40,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
    },
    calorieBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 3,
    },
    calorieIcon: {
        fontSize: 10,
    },
    calorieText: {
        color: '#fbbf24',
        fontSize: 11,
        fontWeight: '700',
    },
    info: {
        padding: 12,
    },
    categoryTag: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 6,
    },
    categoryText: {
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    name: {
        fontSize: 15,
        fontWeight: '700',
        color: '#f8fafc',
        marginBottom: 4,
    },
    desc: {
        fontSize: 12,
        color: '#94a3b8',
        lineHeight: 16,
        marginBottom: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 16,
        fontWeight: '800',
        color: '#10b981',
    },
    addBtn: {
        backgroundColor: '#6366f1',
        width: 34,
        height: 34,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 4,
    },
    addBtnText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        marginTop: -2,
    },
});
