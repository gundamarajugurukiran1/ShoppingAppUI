const { createProxyMiddleware } = require('http-proxy-middleware');
 
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/app1', {
      target: 'http://localhost:8082', // API endpoint 1
    //   target: 'http://3.87.108.193:8082',
      changeOrigin: true,
      pathRewrite: {
        "^/app1": "",
      },
      headers: {
        Connection: "keep-alive"
      }
    })
  );
  app.use(
    createProxyMiddleware('/app2', {
      target: 'http://localhost:8083', // API endpoint 2
    //   target: 'http://34.229.167.216:8083',
      changeOrigin: true,
      pathRewrite: {
        "^/app2": "",
      },
      headers: {
        Connection: "keep-alive"
      }
    })
  );
}