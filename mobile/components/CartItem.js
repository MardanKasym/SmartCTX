import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
    const { changeQty, removeFromCart } = useCart();

    return (
        <View style={styles.row}>
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
                <TouchableOpacity style={styles.qtyBtn} onPress={() => changeQty(item.id, 1)}>
                    <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.04)',
        borderRadius: 16,
        padding: 10,
        marginBottom: 12,
    },
    img: {
        width: 56,
        height: 56,
        borderRadius: 12,
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
        width: 30,
        height: 30,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
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
