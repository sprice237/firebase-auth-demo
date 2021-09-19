import { ApolloServer } from 'apollo-server-express';
import { schemaLoader } from '@sprice237/firebase-auth-demo-gql';
import { context } from './context';
import { resolvers } from './resolvers';

export const buildApolloServer = async (): Promise<ApolloServer> => {
  const typeDefs = await schemaLoader();
  const server = new ApolloServer({ typeDefs, resolvers, context });
  await server.start();
  return server;
};
