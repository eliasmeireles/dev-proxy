const proxyDef = require('./proxy')

const cors = require('cors')
const {createProxyMiddleware} = require("http-proxy-middleware");

const proxyRegistry = (app, proxyDefinition) => {
    const middleware = createProxyMiddleware(proxyDefinition.basePath, {
        target: proxyDefinition.host,
        pathRewrite: proxyDefinition.pathRewrite,
        onProxyRes: (proxyRes, req, res, options) => {
            console.log(`${proxyDefinition.host}${req.url}`)
        },
        changeOrigin: false,
        ws: true
    });
    app.use(middleware)
}

const proxyConfig = (app) => {
    const corsOptions = {
        origin: true,
        credentials: true,
    };

    app.use(cors(corsOptions));

    proxyDef.proxies.forEach(proxyDef => proxyRegistry(app, proxyDef));
}

module.exports = {proxyConfig}
