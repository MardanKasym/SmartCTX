import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export default function FoodCard({ item }) {
    const { addToCart } = useCart();

    return (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
                <View style={styles.footer}>
                    <Text style={styles.price}>{item.price} ₸</Text>
                    <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}>
                        <Text style={styles.addBtnText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        backgroundColor: 'rgba(30, 41, 59, 0.8)',
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.06)',
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: CARD_WIDTH * 0.7,
    },
    info: {
        padding: 12,
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
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addBtnText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        marginTop: -2,
    },
});
