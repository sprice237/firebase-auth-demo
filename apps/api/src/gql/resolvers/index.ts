import { QueryResolvers, MutationResolvers } from '@sprice237/firebase-auth-demo-gql';
import type { AppApolloContext } from '$gql/context';
import { resolvers as queryResolvers } from './query';
import { resolvers as mutationResolvers } from './mutation';

export type AppResolversMap = {
  Query: {[queryName in keyof QueryResolvers<AppApolloContext>]: Exclude<QueryResolvers<AppApolloContext>[queryName], undefined>},
  Mutation: {[mutationName in keyof MutationResolvers<AppApolloContext>]: MutationResolvers<AppApolloContext>[mutationName]}
};

export const resolvers: AppResolversMap = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};
