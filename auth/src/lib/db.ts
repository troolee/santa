import mongodb, { MongoClient, MongoClientOptions, MongoError } from 'mongodb';

export type InitDbCallback = (db: MongoClient) => void;

export function initDb(uri: string, options: MongoClientOptions, callback: InitDbCallback) {
  mongodb.MongoClient.connect(uri, options, (error: MongoError, client) => {
    /* istanbul ignore next */
    if (error) {
      throw error;
    }
    callback(client);
  });
}
