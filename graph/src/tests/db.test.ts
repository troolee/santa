import { TestDbClient } from 'src/lib/test/db';

describe('Test db connection', () => {
  let dbClient: TestDbClient;

  beforeAll(async () => {
    dbClient = await TestDbClient.setup();
  });

  afterAll(async () => {
    await dbClient.tearDown();
  });

  test('test writing/reading from db', async () => {
    const User = dbClient.db.collection('User');
    await User.insertOne({id: 'some-user-id', name: 'John'});
    const user = await User.findOne<{name: string}>({id: 'some-user-id'});
    expect(user).not.toBeNull();
    expect(user!.name).toBe('John');
  });
});
