import * as traceAgent from '@google-cloud/trace-agent';
import * as debugAgent from '@google-cloud/debug-agent';
import { logger } from 'src/logging';
import { createApp } from 'src/app';
import { requestLogger, errorLogger } from 'src/logging';
import { initDb } from 'src/db';

const port = process.env.PORT || 8091;

if (process.env.NODE_ENV === 'production') {
  traceAgent.start();
  debugAgent.start();
}

initDb(
  process.env.MONGODB_URI!,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
  },
  db => {
    const app = createApp(db, a => {
      if (process.env.NODE_ENV !== 'test') {
        a.use(requestLogger);
        a.use(errorLogger);
      }
      return a;
    });

    app.listen(port, () => logger.info(`Listening on port ${port}...`));
  },
);
