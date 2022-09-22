import request from 'supertest';
import nock from 'nock';
import { createApp } from 'src/lib/test/app';
import { TestDbClient } from 'src/lib/test/db';
import { JWT } from '@panva/jose';

describe('Test /api/auth', () => {
  let client: TestDbClient;

  beforeAll(async () => {
    client = (await TestDbClient.setup());
  });

  afterAll(async () => {
    await client.tearDown();
  });

  test('GET /api/auth should return 404', () => {
    return request(createApp()).get('/api/auth').expect(404);
  });

  test('POST /api/auth with no parameters should return 400', async () => {
    await request(createApp())
      .post('/api/auth')
      .send({})
      .expect(400, {status: 'error', error: 'Missing accessToken and/or userID'});
  });

  test('POST /api/auth with missing `userID` parameter should return 400', async () => {
    await request(createApp())
      .post('/api/auth')
      .send({
        accessToken: 'XXXX',
        userID: undefined,
      })
      .expect(400, {status: 'error', error: 'Missing accessToken and/or userID'});
  });

  test('POST /api/auth with missing `accessToken` parameter should return 400', async () => {
    await request(createApp())
      .post('/api/auth')
      .send({
        accessToken: undefined,
        userID: 'XXXXX',
      })
      .expect(400, {status: 'error', error: 'Missing accessToken and/or userID'});
  });

  test('POST /api/auth with wrong `accessToken` parameter should return 400', async () => {
    await request(createApp())
      .post('/api/auth')
      .send({
        accessToken: 'WRONG_ACCESS_TOKEN',
        userID: '1234567890',
      })
      .expect(
        400,
        {
          status: 'error',
          error: 'Invalid OAuth access token.',
        },
      );
  });

  test('POST /api/auth with wrong `accessToken` (mocked error) parameter should return 400', async () => {
    nock('https://graph.facebook.com')
      .get(/\/v5\.0\/1234567890/)
      .reply(400, {
        error: {
          message: 'Invalid OAuth access token.',
        },
      });

    await request(createApp())
      .post('/api/auth')
      .send({
        accessToken: 'WRONG_ACCESS_TOKEN',
        userID: '1234567890',
      })
      .expect(
        400,
        {
          status: 'error',
          error: 'Invalid OAuth access token.',
        },
      );
  });

  test('POST /api/auth with wrong `accessToken` (mocked, no error reason) parameter should return 400', async () => {
    nock('https://graph.facebook.com')
      .get(/\/v5\.0\/1234567890/)
      .reply(400, {
      });

    await request(createApp())
      .post('/api/auth')
      .send({
        accessToken: 'WRONG_ACCESS_TOKEN',
        userID: '1234567890',
      })
      .expect(
        400,
        {
          status: 'error',
        },
      );
  });

  test('POST /api/auth should login a user', async () => {
    const app = createApp(client.db);
    const userID = '123456778';
    const accessToken = 'VALID_ACCESS_TOKEN';

    nock('https://graph.facebook.com')
      .get(/\/v5\.0\/123456778/)
      .reply(200, {
        id: userID,
        name: 'Bruce Willis',
        email: 'bwillis@ikickyourass.com',
      });

    const res = await request(app)
      .post('/api/auth')
      .send({accessToken, userID})
      .expect(200);

    expect(res.body).toMatchObject({status: 'ok'});
    expect(res.body).toHaveProperty('token');
    const {token} = res.body;
    expect(JWT.decode(token)).toMatchObject({name: 'Bruce Willis'});
  });

  test('POST /api/auth should create only one user', async () => {
    const app = createApp(client.db);
    const userID = '123456778333';
    const accessToken = 'VALID_ACCESS_TOKEN';
    const user = {
      id: userID,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    };

    nock('https://graph.facebook.com').get(/\/v5\.0\/123456778333/).reply(200, user);
    await request(app)
      .post('/api/auth')
      .send({accessToken, userID})
      .expect(200);

    nock('https://graph.facebook.com').get(/\/v5\.0\/123456778333/).reply(200, user);
    await request(app)
      .post('/api/auth')
      .send({accessToken, userID})
      .expect(200);

    const count = await client.db.collection('User').find({'profiles.facebook.id': userID}).count();
    expect(count).toBe(1);

    const entity = await client.db.collection('User').findOne({'profiles.facebook.id': userID});
    expect(entity).toMatchObject({
      name: user.name,
      email: user.email,
      profiles: {
        facebook: user,
      },
    });
  });
});
