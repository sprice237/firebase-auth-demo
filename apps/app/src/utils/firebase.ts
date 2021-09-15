import { useEffect, useState } from 'react';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export enum FirebaseErrorCodes {
  AuthEmailAlreadyInUse = 'auth/email-already-in-use',
  AuthPopupClosedByUser = 'auth/popup-closed-by-user',
  AuthTooManyRequests = 'auth/too-many-requests',
  AuthUserNotFound = 'auth/user-not-found',
  AuthWrongPassword = 'auth/wrong-password',
}

export const FirebaseErrorMessages = {
  [FirebaseErrorCodes.AuthEmailAlreadyInUse]: 'Email address already in use',
  [FirebaseErrorCodes.AuthPopupClosedByUser]:
    'The authentication window was closed, please try again',
  [FirebaseErrorCodes.AuthTooManyRequests]: 'Too many attempts, please try again later',
  [FirebaseErrorCodes.AuthUserNotFound]: 'User was not found',
  [FirebaseErrorCodes.AuthWrongPassword]: 'Incorrect password',
};

export const isFirebaseError = (error: Error): error is firebase.FirebaseError =>
  error.name === 'FirebaseError';

export const useCurrentUser = (): [firebase.User | null, boolean] => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const unsub = firebase.auth().onAuthStateChanged((newUser) => {
      if (!isCancelled) {
        setUser(newUser);
        setIsInitialized(true);
      }
    });

    return () => {
      isCancelled = true;
      unsub();
    };
  }, []);

  return [user, isInitialized];
};

export const useCurrentUserAuthToken = (): [string | undefined, boolean] => {
  const [user] = useCurrentUser();
  const [token, setToken] = useState<string | undefined>(undefined);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;

    void (async () => {
      if (!user) {
        setToken(undefined);
        setIsInitialized(true);
      } else {
        setIsInitialized(false);
        const newToken = await user.getIdToken();
        if (!isCancelled) {
          setToken(newToken);
          setIsInitialized(true);
        }
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [user]);

  return [token, isInitialized];
};
