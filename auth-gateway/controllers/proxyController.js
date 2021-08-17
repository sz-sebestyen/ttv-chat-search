const httpProxy = require("http-proxy");

const { BACKEND_HOST } = process.env;

const proxy = httpProxy.createProxyServer({});

proxy.on("error", function (e) {
  console.log(e);
});

proxy.on("proxyReq", function (proxyReq, req, res, options) {
  proxyReq.removeHeader("X-user_id");

  const { userId } = res.locals;

  userId && proxyReq.setHeader("X-user_id", userId);
});

const proxyController = async (req, res, next) => {
  proxy.web(req, res, { target: BACKEND_HOST });
};

module.exports = proxyController;
