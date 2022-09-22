import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import { applyMiddleware } from 'graphql-middleware';
import { authMiddleware, guardMiddleware } from "src/graph/schema/middlewares";
import resolvers from 'src/graph/schema/resolvers';

const typeDefs = importSchema(
  process.env.NODE_ENV === 'production'
  ? process.cwd() + '/schema.graphql'
  : 'schema.graphql');

const schemaDef = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const schema = applyMiddleware(
  schemaDef,
  authMiddleware,
  guardMiddleware,
);
