import request from 'supertest';
import { createApp } from 'src/lib/test/app';

describe('Test app', () => {
  test('in case of unhandler exception 500 should be retured', async () => {
    const app = createApp(null, a => {
      return a.get('/', (req, res) => {
        throw new Error('This is error!');
      });
    });

    await request(app).get('/')
      .expect(500, {
        status: 'error',
        error: 'Ugly Unicorn just puked a little bit :(',
      });
  });
});
