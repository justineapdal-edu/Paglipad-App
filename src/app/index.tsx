import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function IntroScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Teacher Scheduler</Text>
            <Text style={styles.subtitle}>
                Book classrooms and manage your assignments instantly across your school district.
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.replace('/login')}
            >
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa', justifyContent: 'center', alignItems: 'center', padding: 24 },
    title: { fontSize: 32, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 12 },
    subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 40, lineHeight: 24 },
    button: { backgroundColor: '#007AFF', paddingVertical: 16, paddingHorizontal: 40, borderRadius: 12, width: '100%', alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' }
});