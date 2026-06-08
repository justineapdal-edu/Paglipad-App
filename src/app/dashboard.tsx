import { supabase } from '@/utils/supabase';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
    const router = useRouter();

    async function handleSignOut() {
        await supabase.auth.signOut();
        router.replace('/');
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.welcomeTitle}>My Schedule</Text>
                <TouchableOpacity onPress={handleSignOut}>
                    <Text style={styles.logoutText}>Sign Out</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.emptyState}>
                <Text style={styles.emptyText}>You haven't scheduled any classes yet.</Text>
                <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>+ Book a Classroom</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa', paddingHorizontal: 20, paddingTop: 60 },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
    welcomeTitle: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a' },
    logoutText: { color: '#FF3B30', fontSize: 16, fontWeight: '500' },
    emptyState: { flex: 0.8, justifyContent: 'center', alignItems: 'center' },
    emptyText: { color: '#8e8e93', fontSize: 16, textAlign: 'center', marginBottom: 20 },
    bookButton: { backgroundColor: '#34C759', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 10 },
    bookButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});