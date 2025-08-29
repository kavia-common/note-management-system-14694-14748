# Notes Frontend (Nuxt 3)

A modern, light-themed notes application built with Nuxt 3.

Features:
- User authentication (login/register)
- Create, edit, and delete notes
- View list of notes with search
- Modern light theme with sidebar, top bar, and editor panel
- REST API-based backend communication

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
   - Copy `.env.example` to `.env` and set values:
```
NUXT_PUBLIC_API_BASE=http://localhost:8000
NUXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. Run dev server:
```bash
npm run dev
```

Open http://localhost:3000

## Environment

Environment variables (set in `.env`):
- `NUXT_PUBLIC_API_BASE` Base URL of your backend REST API.
- `NUXT_PUBLIC_SITE_URL` Full URL of this frontend (optional; used for redirects in some deployments).

## Notes

- API endpoints expected:
  - POST /auth/login { email, password } -> { token, user }
  - POST /auth/register { email, password, name? } -> { token, user }
  - GET /notes -> Note[]
  - POST /notes -> Note
  - PUT /notes/:id -> Note
  - DELETE /notes/:id -> 204

- Auth token is stored in localStorage (key: `auth_token`) and attached to requests as `Authorization: Bearer <token>`.

- All configurable via `NUXT_PUBLIC_API_BASE`.

## Scripts
- `npm run dev` start dev server
- `npm run build` build for production
- `npm run preview` preview production build

Refer to the [Nuxt docs](https://nuxt.com/docs) for advanced configuration.
