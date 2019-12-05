import { ApolloServer } from 'apollo-server-express';
import { Db } from 'mongodb';
import { logger } from '../logging';
import { schema } from './schema';
import { IContext } from './context';

const isProduction = process.env.NODE_ENV === 'production';

export const getEngineSettings = (prod: boolean) => prod ? {
  apiKey: process.env.ENGINE_API_KEY,
  schemaTag: 'master',
} : false;

const createServer = (db?: Db, overrideContext: any = {}) => {
  return new ApolloServer({
    schema,
    playground: true,
    introspection: true,
    context: context => ({
      ...context,
      ...overrideContext,
      db,
      token: null,
      user: null,
    } as IContext),
    engine: getEngineSettings(isProduction),
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
