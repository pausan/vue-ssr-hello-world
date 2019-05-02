// Configured in webpack.client.config.js as alias
export function createAPI () {
  console.log ("Client Version")
  return {
    onServer : false
  };
}
