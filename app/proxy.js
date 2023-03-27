const proxies = [
    {
        host: 'http://172.17.0.1:8080/',
        basePath: '/arduino-websocket',
        pathRewrite: {
            '/arduino-websocket': 'arduino-websocket'
        }
    }
]

module.exports = {proxies}
