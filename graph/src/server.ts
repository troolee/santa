import { logger } from './logging';
import { createApp } from './app';
import { requestLogger, errorLogger } from './logging';
import { initDb } from './db';

const port = process.env.PORT || 8081;

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
