# Vue SSR Hello World

Simplified version of [Vue Hacker News SSR example](https://github.com/vuejs/vue-hackernews-2.0) as a personal exercise to disect and analyze all parts of a vue Server Side Rendering (SSR) application. I'm using the project to make simple experiments on client and server rendered code.

This project has been updated to use Vue 2.6.x and Webpack 4.

I'm sharing this project with the aim to help other people, but this project is not maintained. Feel free to fork this project for your own needs.

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

## SSR performance

To run the performance tests I've uncommented the line 'return resolve (data);'
on src/api/index.js to avoid any waits. I've executed it on my machine, if you
want to reproduce it, download the project, do a build and then start the
server in production mode.

Since this is a really small project, any changes will only decrease the
requests per second performance (unless express is changed) and increase the
size.

As a summary, the project right now accomplishes 1300 rps with an initial
download size of around 46kb with a primed cache of 2kb for subsequent requests.

### Requests per second benchmark


``` bash
$ ab -n 1000 -c 100 http://localhost:8080/hello
[...]
Requests per second:    1290.01 [#/sec] (mean)
Time per request:       77.519 [ms] (mean)
Time per request:       0.775 [ms] (mean, across all concurrent requests)
[...]
```

Which does not look bad on my machine. Of course this is the ceiling performance
that can be achieved with this simple project, so any addition in the code will
cause it to go slower.

### Networking bandwidth/performance

With Firefox I've got the following results:

#### Empty Cache:

 | Type | Size | Transferred | Time | Non-blocking Time |
 | --- | --- |
 | 4 js | 129.11 KB | 45.10 KB | 0.01 s | 0.01 s |
 | 1 html | 2.31 KB | 1.24 KB | 0.01 s | 0.01 s |
 | 1 images | 1.08 KB | 1.08 KB | 0 s | 0 s |

Cached responses: 0
Total requests: 6
Size: 132.49 KB
Transferred Size: 47.42 KB
Time: 0.02 seconds
Non blocking time: 0.02 seconds

#### Primed Cache:

| Type | Size | Transferred | Time | Non-blocking Time |
| --- | --- |
| 1 html | 2.31 KB | 1.24 KB | 0.01 s | 0.01 s |
| 1 images | 1.08 KB | 1.08 KB | 0 s | 0 s |
| 4 js | 0 KB | 0 KB | 0 s | 0 s |

Cached responses: 3
Total requests: 6
Size: 3.38 KB
Transferred Size: 2.32 KB
Time: 0.01 seconds
Non blocking time: 0.01 seconds

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

## License

Code is based on the one provided by [Vue Hacker News SSR example](https://github.com/vuejs/vue-hackernews-2.0)

MIT
