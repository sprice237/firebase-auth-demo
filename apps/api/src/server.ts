import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { schemaLoader } from '@sprice237/firebase-auth-demo-gql';

export const startServer = async (): Promise<void> => {
  const typeDefs = await schemaLoader();

  const resolvers = {
    Query: {
      me: () => ({ name: 'Sean' }),
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  app.get('/', (_req, res) => {
    res.json({ message: 'hello' });
  });

  await new Promise<void>((resolve) => app.listen(process.env['PORT'] ?? 8080, resolve));

  console.log('Server started');
};
