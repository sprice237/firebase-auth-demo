import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

export enum FirebaseErrorCodes {
  AuthEmailAlreadyInUse = 'auth/email-already-in-use',
  AuthTooManyRequests = 'auth/too-many-requests',
  AuthUserNotFound = 'auth/user-not-found',
  AuthWrongPassword = 'auth/wrong-password',
}

export const FirebaseErrorMessages = {
  [FirebaseErrorCodes.AuthEmailAlreadyInUse]: 'Email address already in use',
  [FirebaseErrorCodes.AuthTooManyRequests]: 'Too many attempts, please try again later',
  [FirebaseErrorCodes.AuthUserNotFound]: 'User was not found',
  [FirebaseErrorCodes.AuthWrongPassword]: 'Incorrect password',
};

export const useCurrentUser = (): [User | null, boolean] => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (newUser) => {
      setUser(newUser);
      setIsInitialized(true);
    });

    return () => {
      unsub();
    };
  }, []);

  return [user, isInitialized];
};
