import { Resolvers } from '@sprice237/firebase-auth-demo-gql';
import type { AppApolloContext } from '$gql/context';
import { resolvers as queryResolvers } from './query';

export type AppResolvers = Resolvers<AppApolloContext>;

export const resolvers: AppResolvers = {
  Query: queryResolvers,
};
