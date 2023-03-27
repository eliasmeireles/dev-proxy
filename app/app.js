const express = require('express')
const proxy = require('./proxy-config')

const app = express();

proxy.proxyConfig(app);

const PORT = 3000;

app.listen(PORT, async () => {
    console.log(`Proxy is listening on port: ${PORT}`)
})
