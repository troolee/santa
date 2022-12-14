import { RewriteFrames } from '@sentry/integrations';
import express from 'express';
import compression from 'compression';
import * as Sentry from '@sentry/node';
import cors from 'cors';

import { commonHelpers, commonHeaders } from 'src/lib/common/views';
import * as views from 'src/views';
import { logDefaultError } from 'src/logging';
import { Db } from 'mongodb';

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
  app.use(cors({
    origin: 'https://santa.uglyunicorn.ca',
    credentials: true,
  }));

  app.use(express.json());
  app.use(compression());

  app.use('/api/auth', views.common);

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
