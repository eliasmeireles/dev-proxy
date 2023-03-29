const {loadYamlConfig} = require('./proxy')
const jwt = require('jsonwebtoken');

const cors = require('cors')
const {createProxyMiddleware} = require("http-proxy-middleware");

const proxyRegistry = (app, proxyDefinition) => {
    function authorizationToke(req, res) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return false;
        }
        try {
            jwt.verify(authHeader, 'arduino-api', {algorithms: ['HS512']});
        } catch (e) {
            console.log(e)
            return false
        }
        const payload = jwt.decode(authHeader);
        return false
    }

    const middleware = createProxyMiddleware(proxyDefinition.basePath, {
        target: proxyDefinition.hostTarget,
        pathRewrite: proxyDefinition.pathRewrite,
        onProxyReq: (proxyReq, req, res, options) => {
            console.log(`${proxyDefinition.hostTarget}${req.url}`)
            if (proxyDefinition.openPaths == null || !proxyDefinition.openPaths.includes(`/${req.path}`)) {
                res.status(401).json({message: 'Unauthorized', status: 401, timestamp: Date.now()});
                proxyReq.destroy();
            }
        },
        onError: (error, req, res) => {
            console.log(`${error}${req.url}`)
        },
        changeOrigin: true,
        ws: true,
        secure: false,
        logLevel: 'debug',
    });
    app.use(middleware)
}


const proxyConfig = (app) => {
    const corsOptions = {
        origin: true,
        credentials: true,
    };

    app.use(cors(corsOptions));
    const result = loadYamlConfig('redirect.yaml')
    if (result) {
        result.forEach(source => proxyRegistry(app, source))
    } else {
        throw Error('Failed to load proxy configuration')
    }
}

module.exports = {proxyConfig}
