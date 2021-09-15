import firebaseAdmin from 'firebase-admin';
firebaseAdmin.initializeApp();

export const decodeFirebaseToken = (token: string): Promise<firebaseAdmin.auth.DecodedIdToken> =>
  firebaseAdmin.auth().verifyIdToken(token);
