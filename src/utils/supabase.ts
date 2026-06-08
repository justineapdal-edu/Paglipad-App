import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';


const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// A safe storage adapter that won't look for 'window' on Node.js servers
const safeStorage = {
    getItem: async (key: string) => {
        if (Platform.OS === 'web' && typeof window === 'undefined') {
            return null; // Don't run on the server side
        }
        return AsyncStorage.getItem(key);
    },
    setItem: async (key: string, value: string) => {
        if (Platform.OS === 'web' && typeof window === 'undefined') {
            return;
        }
        return AsyncStorage.setItem(key, value);
    },
    removeItem: async (key: string) => {
        if (Platform.OS === 'web' && typeof window === 'undefined') {
            return;
        }
        return AsyncStorage.removeItem(key);
    },
};

// Add the "!" exclamation mark at the end of the variables inside createClient
export const supabase = createClient(supabaseUrl!, supabasePublishableKey!, {
    auth: {
        storage: safeStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});

// ==========================================
// 🚀 ADD THIS DEBUG CONNECTION PRINT HERE
// ==========================================
async function debugSupabaseConnection() {
    console.log('📡 [Supabase Debug]: Attempting to contact database...');

    const { data, error } = await supabase.from('schools').select('id').limit(1);

    if (error) {
        console.log('❌ [Supabase Debug]: Connection Failed!');
        console.error('Reason:', error.message);
    } else {
        console.log('✅ [Supabase Debug]: Connection Successful! App is wired into your live database.');
    }
}

// Execute the check immediately on app boot
debugSupabaseConnection();