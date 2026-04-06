import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import SplashScreenComponent from './components/SplashScreen';

import HomeScreen from './screens/Home';
import MenuScreen from './screens/Menu';
import CartScreen from './screens/Cart';
import OrderStatusScreen from './screens/OrderStatus';
import ProfileScreen from './screens/Profile';
import DishDetails from './screens/DishDetails';
import LoginScreen from './screens/Login';
import OrderHistoryScreen from './screens/OrderHistory';
import SettingsScreen from './screens/Settings';
import CheckoutScreen from './screens/Checkout';
import OrderSuccessScreen from './screens/OrderSuccess';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  const { totalItems } = useCart();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0f172a',
          borderTopColor: 'rgba(255,255,255,0.05)',
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 25,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#818cf8',
        tabBarInactiveTintColor: '#64748b',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Главная"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Меню"
        component={MenuScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Корзина"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
          tabBarBadge: totalItems > 0 ? totalItems : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#6366f1',
            fontSize: 10,
            fontWeight: '700',
          },
        }}
      />
      <Tab.Screen
        name="Профиль"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MainTabsWrapper() {
  return <MainTabs />;
}

function Navigation() {
  const { user, isLoading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  if (isLoading || showSplash) {
    return <SplashScreenComponent onFinish={() => setShowSplash(false)} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#0f172a' },
        }}
      >
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabsWrapper} />
            <Stack.Screen
              name="OrderStatus"
              component={OrderStatusScreen}
              options={{
                presentation: 'modal',
                animation: 'slide_from_bottom',
              }}
            />
            <Stack.Screen
              name="DishDetails"
              component={DishDetails}
              options={{
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="OrderHistory"
              component={OrderHistoryScreen}
              options={{
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="Checkout"
              component={CheckoutScreen}
              options={{
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="OrderSuccess"
              component={OrderSuccessScreen}
              options={{
                animation: 'slide_from_right',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <Navigation />
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
