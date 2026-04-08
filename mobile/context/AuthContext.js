import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: 'user_123',
        name: 'Мардан Көркемұлы',
        schoolId: '2024001',
        balance: 5000,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'
    });
    const [isLoading, setIsLoading] = useState(true);
    const [orderHistory, setOrderHistory] = useState([
        { id: 'SC-1001', date: '01 Мар, 12:30', total: 1800, items: 2, status: 'COMPLETED' },
        { id: 'SC-1002', date: '03 Мар, 13:15', total: 950, items: 1, status: 'COMPLETED' },
        { id: 'SC-1005', date: '05 Мар, 12:45', total: 2100, items: 3, status: 'COMPLETED' },
    ]);

    useEffect(() => {
        // Simulating check for existing session
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    const login = async (schoolId, password) => {
        setIsLoading(true);
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (schoolId && password) {
                    const userData = {
                        id: 'user_123',
                        name: 'Мардан Көркемұлы',
                        schoolId: schoolId,
                        balance: 5000,
                        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'
                    };
                    setUser(userData);
                    setIsLoading(false);
                    resolve(userData);
                } else {
                    setIsLoading(false);
                    reject('Неверный ID или пароль');
                }
            }, 1500);
        });
    };

    const updateBalance = (amount) => {
        if (user) {
            setUser({ ...user, balance: user.balance + amount });
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading, orderHistory, updateBalance }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
