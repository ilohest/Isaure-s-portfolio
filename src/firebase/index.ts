import { getApp, getApps, initializeApp, type FirebaseOptions } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

declare const process: {
  env: Record<string, string | undefined>;
};

let db: ReturnType<typeof getFirestore> | null = null;

export const getDb = (): ReturnType<typeof getFirestore> | null => {
  if (typeof window === 'undefined') return null;
  if (db) return db;

  const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY || '',
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.VUE_APP_FIREBASE_APP_ID || '',
  };

  const hasRequiredConfig = Object.values(firebaseConfig).every(Boolean);
  if (!hasRequiredConfig) {
    console.error('[Firebase] Missing config keys:', Object.entries(firebaseConfig).filter(([, v]) => !v).map(([k]) => k));
    return null;
  }

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  db = getFirestore(app);
  return db;
};
