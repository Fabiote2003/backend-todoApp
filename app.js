require('dotenv').config();

const Server = require('./models/server.js');
console.log("Hola")


const server = new Server();
server.app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://fabio-todo-app.netlify.app/');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
  });
server.listen();
