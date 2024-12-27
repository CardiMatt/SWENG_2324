const request = require('supertest');
const app = require('../src/app');
const utils = require('../src/utils');

test('GET /ping should return pong', async () => {
  const response = await request(app).get('/ping');
  expect(response.status).toBe(200);
  expect(response.text).toBe('pong');
});
