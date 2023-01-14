require('dotenv').config();

const Server = require('./models/server.js');
console.log("Hola")


const server = new Server();
server.listen();
