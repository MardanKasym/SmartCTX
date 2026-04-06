import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Dimensions, Animated, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
    const { login } = useAuth();
    const [schoolId, setSchoolId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!schoolId || !password) {
            Alert.alert('Ошибка', 'Пожалуйста, введите школьный ID и пароль');
            return;
        }

        setIsLoading(true);
        try {
            await login(schoolId, password);
        } catch (error) {
            Alert.alert('Ошибка входа', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <LinearGradient
                colors={['#0f172a', '#1e1b4b', '#312e81']}
                style={styles.gradient}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
            />

            <SafeAreaView style={styles.safe}>
                <View style={styles.content}>
                    {/* Header/Logo section */}
                    <View style={styles.header}>
                        <View style={styles.logoCircle}>
                            <Text style={{ fontSize: 40 }}>🍴</Text>
                        </View>
                        <Text style={styles.title}>SmartCTX</Text>
                        <Text style={styles.subtitle}>Войдите в свой школьный аккаунт</Text>
                    </View>

                    {/* Form section */}
                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Школьный ID</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="card-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Напр: 2024001"
                                    placeholderTextColor="#64748b"
                                    value={schoolId}
                                    onChangeText={setSchoolId}
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Пароль</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="lock-closed-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ваш пароль"
                                    placeholderTextColor="#64748b"
                                    secureTextEntry={!showPassword}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <Ionicons
                                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                                        size={20}
                                        color="#64748b"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.forgotBtn}>
                            <Text style={styles.forgotText}>Забыли пароль?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.loginBtn}
                            onPress={handleLogin}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.loginBtnText}>Войти</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Bottom section */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Нет аккаунта? </Text>
                        <TouchableOpacity>
                            <Text style={styles.registerText}>Обратитесь в администрацию</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    gradient: { ...StyleSheet.absoluteFillObject },
    safe: { flex: 1 },
    content: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
    header: { alignItems: 'center', marginBottom: 40 },
    logoCircle: {
        width: 100,
        height: 100,
        borderRadius: 30,
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: 'rgba(99, 102, 241, 0.4)',
    },
    title: { fontSize: 32, fontWeight: '800', color: '#fff', letterSpacing: 1 },
    subtitle: { fontSize: 15, color: '#94a3b8', marginTop: 8, textAlign: 'center' },
    form: { width: '100%' },
    inputContainer: { marginBottom: 20 },
    inputLabel: { color: '#f8fafc', fontSize: 14, fontWeight: '600', marginBottom: 8, marginLeft: 4 },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(30, 41, 59, 0.5)',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 56,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    inputIcon: { marginRight: 12 },
    input: { flex: 1, color: '#fff', fontSize: 16 },
    forgotBtn: { alignSelf: 'flex-end', marginBottom: 24 },
    forgotText: { color: '#818cf8', fontSize: 13, fontWeight: '600' },
    loginBtn: {
        backgroundColor: '#6366f1',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    loginBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 32 },
    footerText: { color: '#64748b', fontSize: 14 },
    registerText: { color: '#818cf8', fontSize: 14, fontWeight: '700' },
});
