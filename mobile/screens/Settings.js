import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../context/LanguageContext';

export default function SettingsScreen({ navigation }) {
    const { language, changeLanguage, t } = useLanguage();
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const [isLangModalVisible, setLangModalVisible] = useState(false);

    const languages = [
        { code: 'RU', name: 'Русский' },
        { code: 'KZ', name: 'Қазақша' },
        { code: 'EN', name: 'English' }
    ];

    const SettingItem = ({ icon, label, value, type, onPress, onValueChange }) => (
        <TouchableOpacity
            style={styles.settingItem}
            onPress={onPress}
            disabled={type === 'switch'}
        >
            <View style={styles.left}>
                <View style={styles.iconContainer}>
                    <Ionicons name={icon} size={20} color="#818cf8" />
                </View>
                <Text style={styles.label}>{label}</Text>
            </View>
            {type === 'switch' ? (
                <Switch
                    value={value}
                    onValueChange={onValueChange}
                    trackColor={{ false: '#334155', true: '#6366f1' }}
                    thumbColor={value ? '#fff' : '#94a3b8'}
                />
            ) : (
                <View style={styles.right}>
                    <Text style={styles.valueText}>{value}</Text>
                    <Ionicons name="chevron-forward" size={16} color="#475569" />
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#0f172a', '#1e1b4b']} style={styles.gradient} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('settings')}</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('notifications')}</Text>
                    <SettingItem
                        icon="notifications-outline"
                        label={t('pushNotifications')}
                        type="switch"
                        value={notifications}
                        onValueChange={setNotifications}
                    />
                    <SettingItem
                        icon="time-outline"
                        label={t('orderReadyNotify')}
                        type="switch"
                        value={true}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('appSettings')}</Text>
                    <SettingItem
                        icon="moon-outline"
                        label={t('darkMode')}
                        type="switch"
                        value={darkMode}
                        onValueChange={setDarkMode}
                    />
                    <SettingItem
                        icon="globe-outline"
                        label={t('language')}
                        value={language}
                        onPress={() => setLangModalVisible(true)}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('account')}</Text>
                    <SettingItem
                        icon="help-buoy-outline"
                        label={t('support')}
                    />
                    <SettingItem
                        icon="document-text-outline"
                        label={t('privacy')}
                    />
                </View>

                <TouchableOpacity style={styles.deleteBtn}>
                    <Text style={styles.deleteText}>{t('deleteAccount')}</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal
                visible={isLangModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setLangModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{t('language')}</Text>
                            <TouchableOpacity onPress={() => setLangModalVisible(false)}>
                                <Ionicons name="close" size={24} color="#94a3b8" />
                            </TouchableOpacity>
                        </View>
                        {languages.map((lang) => (
                            <TouchableOpacity
                                key={lang.code}
                                style={[styles.langItem, language === lang.code && styles.langItemActive]}
                                onPress={() => {
                                    changeLanguage(lang.code);
                                    setLangModalVisible(false);
                                }}
                            >
                                <Text style={[styles.langText, language === lang.code && styles.langTextActive]}>
                                    {lang.name}
                                </Text>
                                {language === lang.code && (
                                    <Ionicons name="checkmark-circle" size={24} color="#6366f1" />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a' },
    gradient: { ...StyleSheet.absoluteFillObject },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: { fontSize: 20, fontWeight: '800', color: '#fff' },
    scroll: { padding: 20 },
    section: { marginBottom: 32 },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 16,
        marginLeft: 4,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(30, 41, 59, 0.4)',
        padding: 16,
        borderRadius: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    left: { flexDirection: 'row', alignItems: 'center' },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    label: { fontSize: 16, color: '#f8fafc', fontWeight: '500' },
    right: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    valueText: { color: '#64748b', fontSize: 14, fontWeight: '600' },
    deleteBtn: {
        marginTop: 20,
        alignItems: 'center',
        padding: 16,
    },
    deleteText: { color: '#ef4444', fontSize: 15, fontWeight: '600' },
});
