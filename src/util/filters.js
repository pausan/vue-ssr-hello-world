
// -----------------------------------------------------------------------------
// To be used in components or views like {{ url | host }} and will show
// the domain
// -----------------------------------------------------------------------------
export function host (url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}
