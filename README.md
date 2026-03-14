# Run For Zone (Monorepo)

A starter monorepo for a location-based zone capture game built with Node.js, npm workspaces, NestJS microservices, RxJS, and Prisma + MongoDB.

**Repo:** https://github.com/manoj-kr-maurya/zone-capture

## Architecture

- **API Gateway** (`packages/api-gateway`) - REST API & microservice clients
- **Runner Service** (`packages/runner-service`) - tracks runner location
- **Zone Service** (`packages/zone-service`) - manages zone creation & capture
- **Shared** (`packages/shared`) - shared DTOs/types
- **Prisma** (`packages/prisma`) - MongoDB schema and Prisma client

## Getting Started

1. Copy `.env.example` to `.env` and set `DATABASE_URL`.
2. Install dependencies:

```bash
npm install
```

3. Generate Prisma client (after setting `DATABASE_URL`):

```bash
npm run prisma:generate
```

4. Start the microservices (in separate terminals):

```bash
npm run start:runner
```

```bash
npm run start:zone
```

And the API gateway:

```bash
npm run start:api
```

## API Endpoints

- `POST /track` → track runner location
- `POST /zones` → create a zone
- `POST /zones/capture` → capture a zone

## Notes

- Services currently use in-memory storage for demo; plug in Prisma models for persistence.
- The project is scaffolded for a microservice architecture with TCP-based communication.

## Development Log (what was done, commands run, and thinking)

This section is a detailed log of the work done to build the initial monorepo setup, including all relevant commands, decisions, and notes.

### Setup & Monorepo scaffolding

- Created a monorepo structure under `packages/` with these packages:
  - `@run-for-zone/shared` (shared DTOs/types)
  - `@run-for-zone/prisma` (Prisma schema + client)
  - `@run-for-zone/api-gateway` (REST API + microservice clients)
  - `@run-for-zone/runner-service` (runner location tracking microservice)
  - `@run-for-zone/zone-service` (zone creation/capture microservice)

- Added top-level `package.json` with npm workspace scripts and a root `tsconfig.json` that references each package.
- Added `tsconfig.base.json` shared compiler settings.
- Added `.env.example` for MongoDB connection.

### Key implementation decisions

- **Microservices communication:** Used NestJS TCP microservices with `@nestjs/microservices`.
- **Shared types:** Placed in `packages/shared` and imported via `@run-for-zone/shared`.
- **In-memory demo state:** Runner/Zone services store state in `Map` + `BehaviorSubject` for demo, with the intention to replace with Prisma + MongoDB.
- **Prisma schema:** Minimal MongoDB schema with `Runner` & `Zone` models and JSON fields for `path` / `polygon`.

### Commands run during setup

- `npm install` – install dependencies for the workspace.
- `npm run prisma:generate` – generate Prisma client.
- `npm run build` – compile all TypeScript packages.
- `npm run start:runner` / `npm run start:zone` / `npm run start:api` – run the three services in parallel.

### Notes about toolchain issues

- Originally scaffolded with Yarn workspaces but switched to npm workspaces for this repository (because npm is available in the environment and Yarn workspace linking was failing).
- Added `@types/node` and `types` configuration in `tsconfig.base.json` to avoid missing Node global types errors.
- Updated NestJS `@Client` injection in `api-gateway` to use `@Inject('SERVICE_NAME')` per Nest's decorator signature requirements.

### How to raise a PR (manual steps)

1. Fork the original repo: https://github.com/manoj-kr-maurya/zone-capture
2. Clone your fork locally.
3. Create a branch (example):
   ```bash
   git checkout -b add-monorepo-scaffold
   ```
4. Copy this repository tree into your forked repo (or apply the same changes):
   - `packages/` folder
   - updated `package.json`, `tsconfig.*`, `README.md`, etc.
5. Commit changes:
   ```bash
   git add .
   git commit -m "Add NestJS microservice monorepo scaffold for zone capture game"
   ```
6. Push and open a PR:
   ```bash
   git push origin add-monorepo-scaffold
   ```
   Then open a PR on GitHub from your fork into the upstream repository.

> Note: This environment cannot directly create GitHub PRs; follow the steps above in your local Git environment.

---

## Next step (optionally requested)

If you want me to add more specific “zone capture” logic (e.g., polygon detection, loop closure detection, or real GPS + geofencing), just say so and I’ll extend the services accordingly.
