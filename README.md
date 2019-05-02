# Vue SSR Hello World

Simplified version of [Vue Hacker News SSR example](https://github.com/vuejs/vue-hackernews-2.0) as a personal exercise to disect and analyze all parts of a vue Server Side Rendering (SSR) application. I'm using the project to make simple experiments on client and server rendered code.

I'm sharing this project with the aim to help other people, but this project is not maintained.

I'll be experimenting with the latest changes of 2.6.x but feel free to fork this project for your own needs.

## Features

> Note: in practice, it is unnecessary to code-split for an app of this size (where each async chunk is only a few kilobytes), nor is it optimal to extract an extra CSS file (which is only 1kb) -- they are used simply because this is a demo app showcasing all the supported features.

- Server Side Rendering
  - Vue + vue-router + vuex working together
  - Server-side data pre-fetching
  - Client-side state & DOM hydration
  - Automatically inlines CSS used by rendered components only
  - Preload / prefetch resource hints
  - Route-level code splitting

- Progressive Web App
  - App manifest
  - Service worker
  - 100/100 Lighthouse score (not sure if this still applies, haven't tested)

- Single-file Vue Components
  - Hot-reload in development
  - CSS extraction for production

## Side Note

Use this app as a reference for learning Vue SSR, not as an example of optimized for performance.
Make sure to measure and optimize based on your actual app constraints.

## Architecture Overview

<img width="973" alt="screen shot 2016-08-11 at 6 06 57 pm" src="https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png">

**A detailed Vue SSR guide can be found [here](https://ssr.vuejs.org).**

## Build Setup

**Requires Node.js 7+**

``` bash
# install dependencies
npm install # or yarn

# serve in dev mode, with hot reload at localhost:8080
npm run dev

# build for production
npm run build

# serve in production mode
npm start
```

## Bundle Analyzer

To optimize the libraries used, it uses webpack-bundle-analyzer to be able to
analyze all bundled files for the client version.

Run:

``` bash
npm run analyze
./node_modules/.bin/webpack-bundle-analyzer -O ./stats.json
```

## License

Code is based on the one provided by [Vue Hacker News SSR example](https://github.com/vuejs/vue-hackernews-2.0)

MIT
