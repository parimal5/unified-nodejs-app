const test = require('node:test');
const assert = require('node:assert');
const app = require('./server.js');

test('GET / returns Hello World greeting with 200 status', async () => {
  // Start server on a random available port (0) for testing
  await new Promise((resolve) => app.listen(0, resolve));
  const port = app.address().port;

  try {
    const response = await fetch(`http://127.0.0.1:${port}/`);
    
    // Assert status code
    assert.strictEqual(response.status, 200);

    // Assert response body
    const text = await response.text();
    assert.strictEqual(text, 'Hello World from Node.js!\n');
  } finally {
    // Always close the server after the test finishes
    await new Promise((resolve) => app.close(resolve));
  }
});