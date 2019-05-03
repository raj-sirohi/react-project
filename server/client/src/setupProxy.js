const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  console.log("Setup proxy is ever called");
  app.use(proxy("/api/auth/google", { target: "http://localhost:5000/" }));
  app.use(proxy("/api/*", { target: "http://localhost:5000/" }));
};