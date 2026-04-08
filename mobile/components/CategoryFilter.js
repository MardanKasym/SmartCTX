import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CategoryFilter({ categories, active, onSelect }) {
    return (
        <View style={styles.wrapper}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        height: 60, // Forcing a generous height for the ScrollView area fixes clipping completely
        justifyContent: 'center',
        marginBottom: 4,
    },
    container: {
        paddingHorizontal: 24,
        alignItems: 'center', // Centers the chips vertically in the safe scrolling area
    },
    chip: {
        paddingHorizontal: 22,
        height: 44, // Generous explicit height completely guarantees no vertical clipping
        borderRadius: 22,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
        marginRight: 10,
        justifyContent: 'center', // Centers vertically
        // INTENTIONALLY NO alignItems! This prevents the horizontal overlap bug on ScrollViews.
    },
    chipActive: {
        backgroundColor: '#6366f1',
        borderColor: '#6366f1',
    },
    text: {
        color: '#cbd5e1',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center', // Centers horizontally inside the stretched bounds
    },
    textActive: {
        color: '#ffffff',
    },
});
