# backend-auth-drizzle

Authentication microservice (Node + Express + Drizzle ORM). This service
is responsible for user registration, login and issuing JWTs. It shares
the same PostgreSQL database with another microservice that implements
the `gastos` (expenses) and `ventas` (sales) tables.

**Tech stack**: TypeScript, Express, Drizzle ORM, postgres, jsonwebtoken,
bcrypt. The app structure uses classes for controllers and services.

## Requirements

- Node >= 18
- PostgreSQL (accessible via `DATABASE_URL`)
- Environment variables (see below)

## Environment variables

- `DATABASE_URL` - Postgres connection string used by Drizzle
- `JWT_SECRET` - Secret key used to sign JWT tokens
- `PORT` - optional, defaults to 3000

Create a `.env` file in the project root with these variables before running.

## Install

Install dependencies:

```bash
npm install
```

## Run

- Development (watch + TS): `npm run dev`
- Build: `npm run build`
- Start production (after build): `npm start`

## Project structure (relevant files)

- `src/router/auth.route.ts` - defines the auth routes
- `src/controllers/*` - controllers implemented as classes
- `src/services/*` - business logic implemented as classes
- `src/utils/*` - validation and middleware (email, password, JWT, role)
- `drizzle/schema.ts` - DB schema (tables: `users`, `gastos`, `ventas`)

## Authentication & Roles

- Authentication uses JWT tokens. The middleware `validJwt` validates the
  `Authorization: Bearer <token>` header and attaches decoded payload to
  `req.user`.
- Role checking helper `RoleHandler.check(requiredRoles)` is available but
  not currently used in any route; you can add it to routes to require
  specific roles (for example `['admin']`).

## Endpoints

All responses follow the pattern used in controllers (JSON with a `success`
flag and either `data`/`user` or `message`/`error`).

- **POST /register**
  - Middlewares applied: `emailHandler`, `capitalizeNombre`, `passwordHandler`, `hashPassword`
  - Purpose: create a new user and persist to DB
  - Request body (JSON):

```json
{
  "nombre": "juan",
  "email": "juan@example.com",
  "password": "strongpassword"
}
```

    - Validation rules:
    	- `email` is required and must be a valid email format
    	- `password` is required and must be at least 8 characters
    	- `nombre` is required and will be capitalized (first letter upper, rest lower)
    	- `password` is hashed before saving

    - Success response (201):

```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "juan@example.com",
    "password": "<hashed_password>",
    "nombre": "Juan",
    "rol": "user",
    "fechaCreacion": "2026-01-13T12:00:00.000Z"
  }
}
```

    - Error responses:
    	- 400: missing/invalid fields (e.g. invalid email, short password)
    	- 409: `USER_EXISTS` when email is already registered

- **POST /login**
  - Middlewares applied: `emailHandler`, `passwordHandler`
  - Purpose: authenticate user and return a signed JWT
  - Request body (JSON):

```json
{
  "email": "juan@example.com",
  "password": "strongpassword"
}
```

    - Validation rules:
    	- `email` required and valid format
    	- `password` required and minimum length 8

    - Success response (200):

```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "juan@example.com",
    "password": "<hashed_password>",
    "nombre": "Juan",
    "rol": "user",
    "fechaCreacion": "2026-01-13T12:00:00.000Z",
    "token": "<jwt_token_here>"
  }
}
```

    - Error responses:
    	- 400: missing/invalid fields
    	- 409: `USER_NOT_FOUND` or `INVALID_CREDENTIALS`

- **GET /me**
  - Middlewares applied: `validJwt`
  - Purpose: return current authenticated user. Requires Authorization header:

```
Authorization: Bearer <token>
```

    - Success response (200):

```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "juan@example.com",
    "password": "<hashed_password>",
    "nombre": "Juan",
    "rol": "user",
    "fechaCreacion": "2026-01-13T12:00:00.000Z"
  }
}
```

    - Error responses:
    	- 401: when `Authorization` header missing or malformed
    	- 403: token verification failed (invalid/expired)

## Notes about roles and admin endpoints

- Currently no route in this repository enforces an `admin` role. The
  `RoleHandler.check(['admin'])` helper exists in `src/utils/rolHandler.ts` and
  can be added to routes to require the `rol` value from the decoded token.

  Example of protecting a route for admin only:

```ts
router.get("/admin-only", validJwt, RoleHandler.check(["admin"]), handler);
```

## Database schema (users table)

Defined in `drizzle/schema.ts` (summary):

- `users`:
  - `id` (serial, PK)
  - `email` (varchar, unique)
  - `password` (text, hashed)
  - `nombre` (varchar)
  - `rol` (varchar, default `user`)
  - `fecha_creacion` (timestamp)

The repository also contains `gastos` and `ventas` tables — those are used
by the other microservice that shares the same DB.

## Development tips

- The controllers and services are implemented as classes (see
  `src/controllers` and `src/services`).
- To add role-protected endpoints, use `RoleHandler.check([...])` after
  `validJwt` in your route chain.

## Examples (curl)

- Register:

```bash
curl -X POST http://localhost:3000/register \
	-H "Content-Type: application/json" \
	-d '{"nombre":"juan","email":"juan@example.com","password":"strongpassword"}'
```

- Login:

```bash
curl -X POST http://localhost:3000/login \
	-H "Content-Type: application/json" \
	-d '{"email":"juan@example.com","password":"strongpassword"}'
```

- Get current user:

```bash
curl http://localhost:3000/me \
	-H "Authorization: Bearer <jwt_token_here>"
```

## Final notes

If you want, I can also:

- add example Postman collection
- add a short CONTRIBUTING or API reference file
