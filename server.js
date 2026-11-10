const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World from Node.js!\n');
});

// Only start listening if run directly (not when imported for tests)
if (require.main === module) {
  const hostname = '127.0.0.1';
  const port = process.env.PORT || 3000;
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

module.exports = server;

// dummy-commit 4
