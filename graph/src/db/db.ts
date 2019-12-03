import { MongoClient, MongoClientOptions, MongoError, Db } from 'mongodb';
import { initDb as _initDb } from '../lib/db';
import { logger } from '../logging';

export let client: MongoClient;
export let db: Db;

export default db;

export function initDb(uri: string, options: MongoClientOptions, callback: (db: Db) => void) {
  if (client !== undefined) {
    throw new Error('Initialization error: initDb must be called only once.');
  }

  try {
    _initDb(uri, options, cl => {
      client = cl;
      db = client.db();
      callback(db);
    });
  } catch (e) {
    const error = e as MongoError;
    const errmsg = error.errmsg || error.message || 'Unknown Error';
    logger.error(`Error occurred during connection to MongoDB: ${errmsg} (${error.code || -1} ${error.name})`);
    process.exit(1);
  }
}
