import { createTestClient as createApolloTestClient } from 'apollo-server-testing';
import { Db } from 'mongodb';
import { default as createApolloServer } from '../../graph/server';

const createTestClient = (db?: Db, token?: string) => {
  const server = createApolloServer(db, {
    req: {
      headers: {
        authorization: token ? `Bearer ${token}` : undefined,
      },
    },
  });
  return createApolloTestClient(server);
};

export default createTestClient;
