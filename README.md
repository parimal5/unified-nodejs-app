# Simple App

A tiny Node.js todo API with no external dependencies.

## Run

```bash
npm start
```

The server runs at http://localhost:3000 (set `PORT` to change it).

## Test

```bash
npm test
```

## Endpoints

| Method | Path             | Description     |
|--------|------------------|-----------------|
| GET    | `/`              | Welcome message |
| GET    | `/health`        | Health check    |
| GET    | `/api/todos`     | List todos      |
| POST   | `/api/todos`     | Create a todo   |
| DELETE | `/api/todos/:id` | Delete a todo   |