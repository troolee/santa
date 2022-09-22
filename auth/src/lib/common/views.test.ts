import request from 'supertest';
import { createApp } from 'src/lib/test/app';

describe('Test commonHelpers', () => {
  test('ok() should return 200 and {status: "ok"}', async () => {
    const app = createApp();

    app.get('/', (req, res) => {
      res.ok();
    });

    await request(app).get('/').expect(200, {status: 'ok'});
  });

  test('ok({foo: "bar"}) should return 200 and custom payload', async () => {
    const app = createApp();

    app.get('/', (req, res) => {
      res.ok({
        foo: 'bar',
      });
    });

    await request(app).get('/').expect(200, {status: 'ok', foo: 'bar'});
  });

  test('ok({}, 201) should return 201', async () => {
    const app = createApp();

    app.get('/', (req, res) => {
      res.ok({}, 201);
    });

    await request(app).get('/').expect(201, {status: 'ok'});
  });

  test('die() should return 400 and {status: "error"}', async () => {
    const app = createApp();

    app.get('/', (req, res) => {
      res.die();
    });

    await request(app).get('/').expect(400, {status: 'error'});
  });

  test('die({foo: "bar"}) should return 400 and custom payload', async () => {
    const app = createApp();

    app.get('/', (req, res) => {
      res.die({
        foo: 'bar',
      });
    });

    await request(app).get('/').expect(400, {status: 'error', foo: 'bar'});
  });

  test('die({}, 403) should return 403', async () => {
    const app = createApp();

    app.get('/', (req, res) => {
      res.die({}, 403);
    });

    await request(app).get('/').expect(403, {status: 'error'});
  });
});

describe('Test commonHeaders', () => {
  test('custom default headers', async () => {
    const app = createApp();

    app.get('/', (req, res) => {
      res.ok();
    });

    const response = await request(app).get('/');

    expect(response.header['x-developed-by']).toBe('Made in Canada by Ugly Unicorn (uglyunicorn.ca)');
    expect(response.header['x-powered-by']).toBe('Maple Syrup, eh!');
    expect(response.header['content-type']).toBe('application/json; charset=utf-8');
  });

  test('content-type header should be "application/json; charset=utf-8"', async () => {
    const app = createApp();

    app.get('/', (req, res) => {
      res.ok();
    });

    const response = await request(app).get('/');

    expect(response.header['content-type']).toBe('application/json; charset=utf-8');
  });
});
