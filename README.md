# TP1 - NestJS CV Management API

This assignement is a backend API built with NestJS + TypeORM + MySQL.
It manages users, CVs, and skills, with relationships between these entities and reusable CRUD logic.

## What Has Been Implemented So Far

- Modular NestJS structure (`User`, `Cv`, `Skill`)
- TypeORM integration with MySQL
- Entity relationships:
- `User` 1..* `Cv`
- `Cv` *..* `Skill` (via `cv_skills` join table)
- Generic CRUD base service shared by feature services
- REST endpoints for create/read/update/delete on all three modules
- DTO classes for payload shape and partial update support
- Validation decorators on create DTOs (`class-validator`)
- Database seeding script using `@ngneat/falso`
- Unit/e2e test files scaffolded by Nest CLI

## Tech Stack

- NestJS 11
- TypeScript
- TypeORM 0.3
- MySQL (`mysql2`)
- class-validator / class-transformer
- Jest + Supertest

## Project Structure

```text
src/
  common/db/generic-crud.service.ts
  cv/
    dto/
    entities/
    cv.controller.ts
    cv.service.ts
    cv.module.ts
  skill/
    dto/
    entities/
    skill.controller.ts
    skill.service.ts
    skill.module.ts
  user/
    dto/
    entities/
    user.controller.ts
    user.service.ts
    user.module.ts
  standalone/seed.ts
  app.module.ts
  main.ts
```

## Data Model

### User
- `id`
- `username`
- `password`
- `email`
- `cvs` (one-to-many)

### Cv
- `id`
- `name`
- `firstName`
- `age`
- `cin`
- `job`
- `path`
- `user` (many-to-one)
- `skills` (many-to-many)

### Skill
- `id`
- `designation`
- `cvs` (many-to-many inverse side)

## API Endpoints

### User
- `GET /user`
- `GET /user/:id`
- `POST /user`
- `PATCH /user/:id`
- `DELETE /user/:id`

### CV
- `GET /cv`
- `GET /cv/:id`
- `POST /cv`
- `PATCH /cv/:id`
- `DELETE /cv/:id`

### Skill
- `GET /skill`
- `GET /skill/:id`
- `POST /skill`
- `PATCH /skill/:id`
- `DELETE /skill/:id`

## Database Configuration

Current local configuration is in `src/app.module.ts`:

- Host: `localhost`
- Port: `3306`
- User: `root`
- Password: `""`
- Database: `tp1`
- `synchronize: true`
- `autoLoadEntities: true`

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Create MySQL database

Create a database named `tp1` in your local MySQL server.

### 3) Run the app

```bash
# dev watch mode
npm run start:dev

# or normal start
npm run start
```

By default, the API runs on `http://localhost:3000`.

### 4) Seed test data (optional)

```bash
npm run seed:db
```

This inserts random users, skills, and CVs with linked relations.

## Available Scripts

- `npm run build` - build project
- `npm run start` - start app
- `npm run start:dev` - start with watch mode
- `npm run start:prod` - run compiled build
- `npm run test` - run unit tests
- `npm run test:e2e` - run e2e tests
- `npm run test:cov` - coverage
- `npm run lint` - lint and fix
- `npm run seed:db` - seed database

## Notes / Current State

- Project uses a reusable generic CRUD service and per-module service extension.
- DTO validation decorators exist on create DTOs.
- Core CRUD routes are in place for all modules.
- Seeding workflow is operational for demo/test data.

## Next Improvements (Optional)

- Enable global `ValidationPipe` in `main.ts` to enforce DTO validation at runtime.
- Add authentication/authorization (guard + JWT).
- Add Swagger docs for endpoint exploration.
- Add pagination/filtering for list endpoints.
- Strengthen tests for services/controllers and seeding behavior.
