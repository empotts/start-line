# start-line

My preferred stack for web apps. TanStack Start on Cloudflare, Drizzle ORM with Better Auth.

- TanStack Start (React)

- TanStack Start (React)
- Cloudflare Workers + D1
- Drizzle ORM + Drizzle Kit migrations
- Better Auth (email/password only)

## 1) Install

```sh
pnpm install
```

## 2) Configure local env values

Copy the example file and set your own values:

```sh
cp .dev.vars.example .dev.vars
```

`BETTER_AUTH_SECRET` should be a high-entropy string with at least 32 characters.

## 3) Configure D1 binding placeholders

`wrangler.jsonc` is already scaffolded with placeholders:

- `binding`: `DB`
- `database_name`: `starter_db`
- `database_id`: `00000000-0000-0000-0000-000000000000`
- `migrations_dir`: `drizzle/migrations`

When you create a real D1 DB, replace `database_id` with the real ID.

## 4) Migrations

Generate migrations from `src/db/schema.ts`:

```sh
pnpm db:generate
```

Apply locally:

```sh
pnpm db:migrate:local
```

Apply remotely (after wiring a real D1 database):

```sh
pnpm db:migrate:remote
```

## 5) Run

```sh
pnpm dev
```

Useful routes while testing:

- `/` public home page
- `/login` sign in / sign up page
- `/protected` protected page behind session check

## Better Auth wiring

- Server instance: `src/lib/auth.ts`
- Client instance: `src/lib/auth-client.ts`
- Mounted route: `src/routes/api/auth/$.ts`

This starter enables **email/password auth only** via `emailAndPassword.enabled = true`.

## Drizzle wiring

- Config: `drizzle.config.ts`
- Schema: `src/db/schema.ts`
- DB client: `src/db/index.ts`
- SQL migrations: `drizzle/migrations`

## Build / Preview / Deploy

```sh
pnpm build
pnpm preview
pnpm deploy
```
