import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('RU'); // Default language

    useEffect(() => {
        loadLanguage();
    }, []);

    const loadLanguage = async () => {
        try {
            const savedLanguage = await AsyncStorage.getItem('@language');
            if (savedLanguage) {
                setLanguage(savedLanguage);
            }
        } catch (error) {
            console.error('Failed to load language', error);
        }
    };

    const changeLanguage = async (newLang) => {
        try {
            setLanguage(newLang);
            await AsyncStorage.setItem('@language', newLang);
        } catch (error) {
            console.error('Failed to save language', error);
        }
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
