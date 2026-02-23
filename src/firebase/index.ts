import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

declare const process: {
  env: Record<string, string | undefined>;
};

const getRequiredEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing Firebase environment variable: ${key}`);
  }

  return value;
};

const firebaseConfig: FirebaseOptions = {
  apiKey: getRequiredEnv('VUE_APP_FIREBASE_API_KEY'),
  authDomain: getRequiredEnv('VUE_APP_FIREBASE_AUTH_DOMAIN'),
  projectId: getRequiredEnv('VUE_APP_FIREBASE_PROJECT_ID'),
  storageBucket: getRequiredEnv('VUE_APP_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getRequiredEnv('VUE_APP_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getRequiredEnv('VUE_APP_FIREBASE_APP_ID'),
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
