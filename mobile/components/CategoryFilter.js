import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CategoryFilter({ categories, active, onSelect }) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {categories.map((cat) => (
                <TouchableOpacity
                    key={cat}
                    onPress={() => onSelect(cat)}
                    style={[styles.chip, active === cat && styles.chipActive]}
                >
                    <Text style={[styles.text, active === cat && styles.textActive]}>{cat}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
    },
    chip: {
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        marginRight: 8,
    },
    chipActive: {
        backgroundColor: '#6366f1',
        borderColor: '#6366f1',
    },
    text: {
        color: '#94a3b8',
        fontWeight: '600',
        fontSize: 14,
    },
    textActive: {
        color: '#fff',
    },
});
