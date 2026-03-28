import { getApp, getApps, initializeApp, type FirebaseOptions } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

declare const process: {
  env: Record<string, string | undefined>;
};

const getEnv = (key: string): string => process.env[key] || '';

const getNuxtPublicRuntimeConfig = (): Record<string, string | undefined> => {
  if (typeof window === 'undefined') return {};

  const nuxtWindow = window as typeof window & {
    __NUXT__?: {
      config?: {
        public?: Record<string, string | undefined>;
      };
    };
  };

  return nuxtWindow.__NUXT__?.config?.public || {};
};

const getFirebaseValue = (runtimeKey: string, legacyKey: string): string => {
  const runtimeConfig = getNuxtPublicRuntimeConfig();
  return runtimeConfig[runtimeKey] || getEnv(legacyKey) || '';
};

const firebaseConfig: FirebaseOptions = {
  apiKey: getFirebaseValue('firebaseApiKey', 'VUE_APP_FIREBASE_API_KEY'),
  authDomain: getFirebaseValue('firebaseAuthDomain', 'VUE_APP_FIREBASE_AUTH_DOMAIN'),
  projectId: getFirebaseValue('firebaseProjectId', 'VUE_APP_FIREBASE_PROJECT_ID'),
  storageBucket: getFirebaseValue('firebaseStorageBucket', 'VUE_APP_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getFirebaseValue(
    'firebaseMessagingSenderId',
    'VUE_APP_FIREBASE_MESSAGING_SENDER_ID',
  ),
  appId: getFirebaseValue('firebaseAppId', 'VUE_APP_FIREBASE_APP_ID'),
};

let db: ReturnType<typeof getFirestore> | null = null;

if (typeof window !== 'undefined') {
  const hasRequiredFirebaseConfig = [
    firebaseConfig.apiKey,
    firebaseConfig.authDomain,
    firebaseConfig.projectId,
    firebaseConfig.storageBucket,
    firebaseConfig.messagingSenderId,
    firebaseConfig.appId,
  ].every(Boolean);

  if (hasRequiredFirebaseConfig) {
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
}

export { db };
