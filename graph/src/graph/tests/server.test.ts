import request from 'supertest';
import { getEngineSettings } from '../server';
import { createApp } from '../../lib/test/app';

describe('Test Apollo Engine', () => {
  test('getEngineSettings in production should be a dict', () => {
    expect(getEngineSettings(true)).toMatchObject({apiKey: process.env.ENGINE_API_KEY, schemaTag: 'master'});
  });

  test('getEngineSettings in non production should be a false', () => {
    expect(getEngineSettings(false)).toBeFalsy();
  });

  test('incorrect query should be handled correctly', async () => {
    const app = createApp();
    await request(app)
      .post('/api/graph')
      .set("Content-Type", "application/json")
      .send("{ app { name version } }")
      .expect(500, {status: "error", error: "Ugly Unicorn just puked a little bit :("});
  });
});
