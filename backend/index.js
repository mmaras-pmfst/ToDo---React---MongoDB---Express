const app = require('./app');
const http = require('http');
const config = require('./utilis/config');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`Server is listening on http://localhost:${config.PORT}`);
});
