const http = require('http');
const {app} = require('./app');

server = http.createServer(app);

const port = process.env.PORT || 5000;

server.listen(port , () => {
  console.log('Server started');
  console.log(process.env.DB);
});