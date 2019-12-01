import { MongoClient, Db } from "mongodb";
import { initDb } from "../db";

/* istanbul ignore next */
const MONGODB_URI: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

export class TestDbClient {
  public static async setup() {
    return await setupTestDb();
  }

  private client: MongoClient;
  private dbName: string;

  public constructor(client: MongoClient) {
    this.dbName = `test-${(Math.random() * 10000000).toFixed()}`;
    this.client = client;
  }

  public get db() {
    return this.client.db(this.dbName);
  }

  public async tearDown() {
    await this.db.dropDatabase();
    await this.client.close();
  }
}

function setupTestDb(): Promise<TestDbClient> {
  return new Promise(done => {
    initDb(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}, client => {
      done(new TestDbClient(client));
    });
  });
}
