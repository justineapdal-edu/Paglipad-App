import { supabase } from '@/utils/supabase';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
    const [initializing, setInitializing] = useState(true);
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        // Listen for auth state changes (Login, Logout, Sign Up)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setInitializing(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (initializing) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            {/* Defined routes inside your system */}
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="dashboard" />
        </Stack>
    );
}