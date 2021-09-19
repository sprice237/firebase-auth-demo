import { Request } from 'express';
import { auth } from 'firebase-admin';
import { decodeFirebaseToken } from '$/firebase';

export type AppApolloContext = {
  firebaseToken: auth.DecodedIdToken | null;
};

export const context = async ({ req }: { req: Request }): Promise<AppApolloContext> => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  const decodedToken = token ? await decodeFirebaseToken(token) : null;
  return {
    firebaseToken: decodedToken,
  };
};
