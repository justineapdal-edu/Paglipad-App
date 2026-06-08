import { supabase } from '@/utils/supabase';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AuthScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignIn() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);

        if (error) Alert.alert('Login Error', error.message);
        else router.replace('/dashboard');
    }

    async function handleSignUp() {
        setLoading(true);
        const { error, data } = await supabase.auth.signUp({ email, password });
        setLoading(false);

        if (error) Alert.alert('Sign Up Error', error.message);
        else if (data.session) router.replace('/dashboard');
        else Alert.alert('Success!', 'Check your email for a verification link.');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome Back</Text>

            <TextInput
                placeholder="School Email"
                style={styles.input}
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.input}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
            />

            {loading ? (
                <ActivityIndicator size="small" color="#007AFF" style={{ marginVertical: 20 }} />
            ) : (
                <>
                    <TouchableOpacity style={styles.primaryButton} onPress={handleSignIn}>
                        <Text style={styles.btnText}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryButton} onPress={handleSignUp}>
                        <Text style={[styles.btnText, { color: '#007AFF' }]}>Create Teacher Account</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
    header: { fontSize: 28, fontWeight: '700', marginBottom: 32, color: '#1a1a1a' },
    input: { borderWidth: 1, borderColor: '#e0e0e0', padding: 16, borderRadius: 8, fontSize: 16, marginBottom: 16, backgroundColor: '#f9f9f9' },
    primaryButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 8 },
    secondaryButton: { padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 8, borderWidth: 1, borderColor: '#007AFF' },
    btnText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});