npm install
# Picme

A lightweight React frontend for sharing short visual stories, built with Vite.

## Table of contents
- Features
- Prerequisites
- Installation
- Development
- Build & Production
- Usage
- Project structure (important files)
- Contributing
- License

## Features
- Create and upload stories (desktop & mobile) via components like CreateStory and CreateStoryMobile.
- Local mock services for quick UI development and testing (`story.service.local.js`, `user.service.local.js`).
- Image upload helper and Cloudinary integration helper (`upload.service.js`).
- Real-time capabilities via `socket.io-client`.

## Prerequisites
- Node.js (recommended >= 16)
- npm (or yarn)

## Installation
1. Install dependencies:

```sh
npm install
```

2. (Optional) If you use environment-specific behavior, the frontend checks `VITE_LOCAL` to toggle local mock services. See the `Development` section for examples.

## Development
There are scripts for running the app in different modes (Windows and macOS/Linux variants are provided):

- `npm run dev:remote` — run the dev server (default remote/backend mode)
- `npm run dev:local` — run the dev server with `VITE_LOCAL=true` (Windows syntax)
- `npm run dev:local:mac` — run the dev server with `VITE_LOCAL=true` (macOS/Linux syntax)

Examples:

```sh
# Windows (local mocks)
npm run dev:local

# macOS / Linux (local mocks)
npm run dev:local:mac

# Picme

A lightweight React frontend for sharing short visual stories, built with Vite.

## Table of contents
- Features
- Prerequisites
- Installation
- Development
- Build & Production
- Usage
- Remote backend & configuration
- Project structure (important files)
- Contributing
- License

## Features
- Create and upload stories (desktop & mobile) via components like CreateStory and CreateStoryMobile.
- Local mock services for quick UI development and testing (`src/services/story/story.service.local.js`, `src/services/user/user.service.local.js`).
- Image upload helper and Cloudinary integration helper (`src/services/upload.service.js`).
- Real-time capabilities via `socket.io-client`.

## Prerequisites
- Node.js (recommended >= 16)
- npm (or yarn)

## Installation
1. Install dependencies:

```sh
npm install
```

2. (Optional) If you use environment-specific behavior, the frontend checks `VITE_LOCAL` to toggle local mock services. See the `Development` section for examples.

## Development
There are scripts for running the app in different modes (Windows and macOS/Linux variants are provided):

- `npm run dev:remote` — run the dev server (default remote/backend mode)
- `npm run dev:local` — run the dev server with `VITE_LOCAL=true` (Windows syntax)
- `npm run dev:local:mac` — run the dev server with `VITE_LOCAL=true` (macOS/Linux syntax)

Examples:

```sh
# Windows (local mocks)
npm run dev:local

# macOS / Linux (local mocks)
npm run dev:local:mac

# Run remote dev server
npm run dev:remote
```

Other useful scripts:

- `npm run build` — produce a production build (output configured in `vite.config.js`)
- `npm run preview` — locally preview the built output
- `npm run lint` — run ESLint checks

## Build & Production
- Build output is configured in `vite.config.js`. In this project the `outDir` is set to integrate with the backend public folder.
- To build for production:

```sh
npm run build
```

To preview the production build locally:

```sh
npm run preview
```

## Usage
- Main entry: [src/index.jsx](src/index.jsx)
- App shell / root component: [src/RootCmp.jsx](src/RootCmp.jsx)
- Story creation flow: `CreateStory` and `CreateStoryMobile` components under [src/cmps](src/cmps)
- Services and helpers live under [src/services](src/services)

If you enable local mode (`VITE_LOCAL=true`) the app uses local mock services located at [src/services/story/story.service.local.js](src/services/story/story.service.local.js) and [src/services/user/user.service.local.js](src/services/user/user.service.local.js).

## Remote backend & configuration

This frontend can run against a remote backend. Defaults and environment variables used by the app:

- Backend API (development): `http://localhost:3030/api/` — used when `NODE_ENV !== 'production'` (see [src/services/http.service.js](src/services/http.service.js)).
- Backend API (production): mounted under `/api/` (the frontend calls relative `/api/...`).
- Socket server base URL (development): `http://localhost:3030` — used by [src/services/socket.service.js](src/services/socket.service.js) when not in production.
- Toggle local mocks / dummy socket: `VITE_LOCAL` (set to `true` to use local mock services and dummy socket service).

Cloudinary (image upload) environment variables used by [src/services/upload.service.js](src/services/upload.service.js):

```env
VITE_CLOUD_NAME=your_cloud_name
VITE_UPLOAD_PRESET=your_upload_preset
```

Notes:
- If your backend runs on a different host/port during development, update the backend or proxy settings accordingly. The code uses a hard-coded development URL (`localhost:3030`) — you can change it in [src/services/http.service.js](src/services/http.service.js) and [src/services/socket.service.js](src/services/socket.service.js), or run the backend on that port.
- For Vite env files create a `.env` or `.env.local` at project root and prefix variables with `VITE_` to expose them to the client.

## Project structure (important files)
- [package.json](package.json)
- [vite.config.js](vite.config.js)
- [src/index.jsx](src/index.jsx)
- [src/RootCmp.jsx](src/RootCmp.jsx)
- [src/cmps/CreateStory.jsx](src/cmps/CreateStory.jsx)
- [src/cmps/CreateStoryMobile.jsx](src/cmps/CreateStoryMobile.jsx)
- [src/services/upload.service.js](src/services/upload.service.js)
- [src/services/story/story.service.local.js](src/services/story/story.service.local.js)
- [src/services/story/story.service.remote.js](src/services/story/story.service.remote.js)
- [src/services/user/user.service.local.js](src/services/user/user.service.local.js)
- [src/services/user/user.service.remote.js](src/services/user/user.service.remote.js)

## Contributing
- Follow existing component patterns and CSS structure under `src/assets/styles`.
- For UI work prefer using local services first (`VITE_LOCAL=true`) so you can iterate without a backend.
- Open issues and pull requests should include a short description of the change and screenshots when the UI is affected.

## License
Use as you wish.