const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/user';
        this.tasksPath = '/api/task';
        this.authPath = '/api/auth';
        //Conectar a base de datos
        this.conectarDB();

        //Middlewars
        this.middlewares();

        //Rutas de la aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(morgan('tiny'));
        this.app.use(cookieParser())
    }



    routes() {
        this.app.use(this.usersPath , require('../routes/users'));
        this.app.use(this.tasksPath , require('../routes/tasks'));
        this.app.use(this.authPath , require('../routes/auth'));
    }

    listen() {
        this.app.listen(this.port)
    }

}

module.exports = Server;
