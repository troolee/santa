import { gql } from "apollo-server-express";
import { makeExecutableSchema } from 'graphql-tools';
import { applyMiddleware } from 'graphql-middleware';
import { authMiddleware, guardMiddleware } from "./middlewares";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    version: String!
    user: User
  }
`;

const resolvers = {
  Query: {
    version: () => '0.0.1',
  },
};

const schemaDef = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const schema = applyMiddleware(
  schemaDef,
  authMiddleware,
  guardMiddleware,
);
