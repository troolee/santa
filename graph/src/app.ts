import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import compression from 'compression';
import express from 'express';
import { Db } from 'mongodb';
import { default as createApolloServer } from 'src/graph/server';
import { commonHeaders, commonHelpers } from 'src/lib/common/views';
import { logDefaultError } from 'src/logging';

/* istanbul ignore next */
const USE_SENTRY = process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN;

export type SetupCallback = (app: express.Express) => express.Express;

export function createApp(db: Db, setupCallback?: SetupCallback) {
  let app = express();

  /* istanbul ignore next */
  if (USE_SENTRY) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      integrations: [new RewriteFrames()],
    });
    app.use(Sentry.Handlers.requestHandler());
  }

  app.use(commonHelpers(db));
  app.use(commonHeaders);

  app.use(express.json());
  app.use(compression());

  const apolloServer = createApolloServer(db);
  apolloServer.applyMiddleware({ app, path: '/api/graph' });

  if (setupCallback) {
    app = setupCallback(app);
  }

  /* istanbul ignore next */
  if (USE_SENTRY) {
    app.use(Sentry.Handlers.errorHandler());
  }

  app.use((err: any, req: any, res: any, next: any) => {
    logDefaultError(err.stack);
    res.die({error: 'Ugly Unicorn just puked a little bit :('}, 500);
  });

  return app;
}
