import express, { Request } from 'express';
import { ApolloServer } from 'apollo-server-express';
import type { IResolvers } from '@graphql-tools/utils';
import { schemaLoader } from '@sprice237/firebase-auth-demo-gql';
import { decodeFirebaseToken } from './firebase';
import { auth } from 'firebase-admin';

type ApolloContext = {
  firebaseToken: auth.DecodedIdToken | null;
};

export const startServer = async (): Promise<void> => {
  const typeDefs = await schemaLoader();

  const resolvers: IResolvers<unknown, ApolloContext> = {
    Query: {
      me: (_1, _2, { firebaseToken }) => {
        return {
          firebaseUid: firebaseToken?.uid,
          name: firebaseToken?.['name'],
          email: firebaseToken?.email,
        };
      },
    },
  };

  const context = async ({ req }: { req: Request }): Promise<ApolloContext> => {
    const token = req.headers.authorization?.split('Bearer ')[1];
    const decodedToken = token ? await decodeFirebaseToken(token) : null;
    return {
      firebaseToken: decodedToken,
    };
  };

  const server = new ApolloServer({ typeDefs, resolvers, context });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  app.get('/', (_req, res) => {
    res.json({ message: 'hello' });
  });

  await new Promise<void>((resolve) => app.listen(process.env['PORT'] ?? 8080, resolve));

  console.log('Server started');
};
