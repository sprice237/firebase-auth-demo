import type { QueryResolvers } from '.';

export const me: QueryResolvers['me'] = async (_source, _args, {firebaseToken}) => {
  if (!firebaseToken) {
    throw new Error('not authenticated');
  }

  return {
    __typename: 'User' as const,
    name: (firebaseToken as unknown as {name: string}).name,
    email: firebaseToken.email ?? '',
    firebaseUid: firebaseToken.uid
  }
};
