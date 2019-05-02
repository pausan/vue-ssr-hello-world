// Configured in webpack.client.config.js as alias
export function createAPI () {
  console.log ("createApi.Client")
  return {
    onServer : false
  };
}
