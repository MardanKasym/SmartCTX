import React, { useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useCart } from '../context/CartContext';

export default function CartItem({ item, index }) {
    const { changeQty, removeFromCart } = useCart();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(-30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                delay: (index || 0) * 80,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                delay: (index || 0) * 80,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.row,
                {
                    opacity: fadeAnim,
                    transform: [{ translateX: slideAnim }],
                },
            ]}
        >
            <Image source={{ uri: item.image }} style={styles.img} />
            <View style={styles.details}>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.price}>{item.price * item.quantity} ₸</Text>
            </View>
            <View style={styles.controls}>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => changeQty(item.id, -1)}>
                    <Text style={styles.qtyText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qty}>{item.quantity}</Text>
                <TouchableOpacity style={[styles.qtyBtn, styles.qtyBtnPlus]} onPress={() => changeQty(item.id, 1)}>
                    <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(30, 41, 59, 0.6)',
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.06)',
    },
    img: {
        width: 56,
        height: 56,
        borderRadius: 14,
    },
    details: {
        flex: 1,
        marginLeft: 12,
    },
    name: {
        fontSize: 15,
        fontWeight: '600',
        color: '#f8fafc',
        marginBottom: 4,
    },
    price: {
        fontSize: 14,
        fontWeight: '700',
        color: '#10b981',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    qtyBtn: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.08)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyBtnPlus: {
        backgroundColor: 'rgba(99, 102, 241, 0.3)',
    },
    qtyText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    qty: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        minWidth: 20,
        textAlign: 'center',
    },
});
