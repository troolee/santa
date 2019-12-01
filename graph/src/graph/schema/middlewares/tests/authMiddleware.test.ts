import { ObjectId } from 'bson';
import { GraphQLResolveInfo } from 'graphql';
import { IncomingMessage } from 'http';
import { IContext } from '../../../../graph/context';
import { createAuthToken } from '../../../../lib/crypto';
import { TestDbClient } from "../../../../lib/test/db";
import { authMiddleware } from '../authMiddleware';

describe('Test authMiddleware', () => {
  let dbClient: TestDbClient;

  beforeAll(async () => {
    dbClient = await TestDbClient.setup();
  });

  afterAll(async () => {
    await dbClient.tearDown();
  });

  test('context user is null if wrong token', async () => {
    const resolve = async () => null;

    const context = {
      db: dbClient.db,
      req: {
        headers: {
          authorization: `Bearer ${createAuthToken({id: new ObjectId().toHexString(), name: ""})}`,
        },
      } as IncomingMessage,
      token: null,
      user: null,
    } as IContext;
    await authMiddleware(resolve, {}, {}, context, {} as GraphQLResolveInfo);
    expect(context.user).toBeNull();
  });

  test('raise error if wrong authorization method', async () => {
    const resolve = async () => null;

    try {
      await authMiddleware(
        resolve,
        {},
        {},
        {
          db: dbClient.db,
          req: {
            headers: {
              authorization: `Basic XXXXXXXX`,
            },
          } as IncomingMessage,
          token: null,
          user: null,
        } as IContext, {} as GraphQLResolveInfo,
      );
      expect(false).toBeTruthy();
    } catch (e) {
      expect(`${e}`).toBe('Error: 403: Authorization error');
    }
  });
});
