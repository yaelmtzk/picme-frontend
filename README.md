# Picme

A lightweight React frontend for sharing short visual stories, built with Vite.

## Features
- Create and upload stories (desktop & mobile) via [`CreateStory`](src/cmps/CreateStory.jsx) and [`CreateStoryMobile`](src/cmps/CreateStoryMobile.jsx).
- Local mock services for stories and users via [`storyService`](src/services/story/story.service.local.js) and [`userService`](src/services/user/user.service.local.js).
- Image upload helper: [`uploadImg`](src/services/upload.service.js).

## Quickstart

1. Install
```sh
npm install
```

2. Run development server
```sh
npm run dev
```

3. Build for production
```sh
npm run build
```

Notes:
- Build output configured in [vite.config.js](vite.config.js) (outDir -> `../backend/public`).
- Main entry: [src/index.jsx](src/index.jsx). App shell: [src/RootCmp.jsx](src/RootCmp.jsx) (see [`onAddStory`](src/RootCmp.jsx)).

## Project structure (important files)
- [package.json](package.json)
- [vite.config.js](vite.config.js)
- [src/index.jsx](src/index.jsx)
- [src/RootCmp.jsx](src/RootCmp.jsx)
- [src/cmps/CreateStory.jsx](src/cmps/CreateStory.jsx)
- [src/cmps/CreateStoryMobile.jsx](src/cmps/CreateStoryMobile.jsx)
- [src/services/story/story.service.local.js](src/services/story/story.service.local.js)
- [src/services/user/user.service.local.js](src/services/user/user.service.local.js)
- [src/services/upload.service.js](src/services/upload.service.js)

## Contributing
- Follow existing component patterns.
- Prefer local services for UI work before integrating a remote backend.

## License
Use as you wish.