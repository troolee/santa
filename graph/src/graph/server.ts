import { ApolloServer } from 'apollo-server-express';
import { Db } from 'mongodb';
import { logger } from 'src/logging';
import { schema } from 'src/graph/schema';
import { IContext } from 'src/graph/context';

const isProduction = process.env.NODE_ENV === 'production';
const playground = true;

export const getEngineSettings = (prod: boolean) => prod ? {
  apiKey: process.env.ENGINE_API_KEY,
  schemaTag: 'master',
} : false;

const createServer = (db?: Db, overrideContext: any = {}) => {
  return new ApolloServer({
    schema,
    playground,
    introspection: playground,
    context: context => ({
      ...context,
      ...overrideContext,
      db,
      token: null,
      user: null,
    } as IContext),
    engine: false, // getEngineSettings(isProduction),
    formatError: error => {
      logger.error(`${error.message}${
        error.extensions && error.extensions.exception && error.extensions.exception
        ? ['\n', ...error.extensions!.exception!.stacktrace].join('\n')
        : '<NO STACK TRACE>'
      }`);
      return error;
    },
    debug: !isProduction,
  });
};

export default createServer;
