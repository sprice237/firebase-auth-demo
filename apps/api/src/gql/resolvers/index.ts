import { Resolvers } from '@sprice237/firebase-auth-demo-gql';
import type { AppApolloContext } from '$gql/context';
import { resolvers as queryResolvers } from './query';
import { resolvers as mutationResolvers } from './mutation';

export type AppResolvers = Resolvers<AppApolloContext>;

export const resolvers: AppResolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};
