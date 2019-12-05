import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import { applyMiddleware } from 'graphql-middleware';
import { authMiddleware, guardMiddleware } from "./middlewares";
import resolvers from './resolvers';

const typeDefs = importSchema('src/graph/schema/schema.graphql');

const schemaDef = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const schema = applyMiddleware(
  schemaDef,
  authMiddleware,
  guardMiddleware,
);
