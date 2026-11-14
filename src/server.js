const http = require('node:http');

function createServer() {
  const todos = [];
  let nextId = 1;

  const send = (res, status, data) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  const readBody = (req) =>
    new Promise((resolve, reject) => {
      let body = '';
      req.on('data', (chunk) => (body += chunk));
      req.on('end', () => {
        try {
          resolve(body ? JSON.parse(body) : {});
        } catch {
          reject(new Error('Invalid JSON'));
        }
      });
    });

  return http.createServer(async (req, res) => {
    const { method, url } = req;

    if (method === 'GET' && url === '/') {
      return send(res, 200, { message: 'Welcome to the Todo API' });
    }

    if (method === 'GET' && url === '/health') {
      return send(res, 200, { status: 'ok' });
    }

    if (method === 'GET' && url === '/api/todos') {
      return send(res, 200, todos);
    }

    if (method === 'POST' && url === '/api/todos') {
      try {
        const { title } = await readBody(req);
        if (!title || typeof title !== 'string') {
          return send(res, 400, { error: 'title is required' });
        }
        const todo = { id: nextId++, title, done: false };
        todos.push(todo);
        return send(res, 201, todo);
      } catch (err) {
        return send(res, 400, { error: err.message });
      }
    }

    const match = url.match(/^\/api\/todos\/(\d+)$/);
    if (match && method === 'DELETE') {
      const index = todos.findIndex((t) => t.id === Number(match[1]));
      if (index === -1) return send(res, 404, { error: 'Not found' });
      todos.splice(index, 1);
      return send(res, 200, { deleted: true });
    }

    send(res, 404, { error: 'Not found' });
  });
}

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  createServer().listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

module.exports = { createServer };