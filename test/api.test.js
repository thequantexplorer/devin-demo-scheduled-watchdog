const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const { createApp } = require('../server/app');

test('lists products', async () => {
  const res = await request(createApp()).get('/api/products');
  assert.strictEqual(res.body.length, 6);
});

test('looks up a promo', async () => {
  const res = await request(createApp()).get('/api/promos/FALL10');
  assert.strictEqual(res.body.percentOff, 10);
});
