import LRU from 'lru-cache'

// Configured in webpack.server.config.js as alias
export function createAPI () {
  console.log ("Server Version")

  if (process.__API__)
    return process.__API__

  // this piece of code may run multiple times in development mode,
  // so we attach the instantiated API to `process` to avoid duplications
  let api = { } // INITIALIZE API only once, whatever API means...!

  api.onServer = true

  // item cache: FIXME! unused now
  api.cachedItems = LRU({
    max: 1000,
    maxAge: 1000 * 60 * 15 // 15 min cache
  })

  // make sure next iteration is saved in process to avoid duplicates
  process.__API__ = api
  return api
}
