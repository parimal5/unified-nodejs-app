const { test, before, after } = require('node:test');
const assert = require('node:assert');
const { createServer } = require('../src/server');

let server;
let baseUrl;

before(async () => {
  server = createServer();
  await new Promise((resolve) => server.listen(0, resolve));
  baseUrl = `http://localhost:${server.address().port}`;
});

after(() => server.close());

test('GET /health returns ok', async () => {
  const res = await fetch(`${baseUrl}/health`);
  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(await res.json(), { status: 'ok' });
});

test('POST /api/todos creates a todo', async () => {
  const res = await fetch(`${baseUrl}/api/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Learn Node' }),
  });
  assert.strictEqual(res.status, 201);
  const todo = await res.json();
  assert.strictEqual(todo.title, 'Learn Node');
  assert.strictEqual(todo.done, false);
});

test('POST /api/todos without title returns 400', async () => {
  const res = await fetch(`${baseUrl}/api/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  assert.strictEqual(res.status, 400);
});

test('GET /api/todos lists todos', async () => {
  const res = await fetch(`${baseUrl}/api/todos`);
  assert.strictEqual(res.status, 200);
  assert.ok(Array.isArray(await res.json()));
});