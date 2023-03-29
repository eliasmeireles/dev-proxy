const express = require('express')
const proxy = require('./proxy-config')

const app = express();

proxy.proxyConfig(app);

const PORT = 8088;
const HOST = "127.0.0.1";

app.listen(PORT, async () => {
    console.log(`Proxy is listening on port: http://${HOST}:${PORT}`)
})
