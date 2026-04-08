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
                {/* Image */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.image} />
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
        height: CARD_WIDTH * 0.75, // slightly taller for better mobile aspect ratio
    },
    calorieBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    calorieIcon: {
        fontSize: 10,
    },
    calorieText: {
        color: '#fbbf24',
        fontSize: 11,
        fontWeight: 'bold',
    },
    info: {
        padding: 14,
    },
    categoryTag: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        marginBottom: 8,
    },
    categoryText: {
        fontSize: 10,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#f8fafc',
        marginBottom: 6,
        lineHeight: 22,
    },
    desc: {
        fontSize: 13,
        color: '#94a3b8',
        lineHeight: 18,
        marginBottom: 14,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 17,
        fontWeight: '800',
        color: '#10b981',
    },
    addBtn: {
        backgroundColor: '#6366f1',
        width: 36,
        height: 36,
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
        fontWeight: 'bold',
    },
});
