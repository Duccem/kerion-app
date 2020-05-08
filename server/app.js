const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const chalk = require('chalk');
const routes = require('./routes');


//Aplication class
class App {
    /**
     * 
     * @param port {number}the number of the port where the app is started to listen
     */
    constructor(port) {
        this.port = port;
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }
    /**
     * Set the configuration variables
     */
    settings() {
        this.app.set('port', this.port || process.argv[2] || process.env.PORT || 80);
    }

    /**
     * The middlewares functions to parse requests
     */
    middlewares() {
        this.app.use(cors({ exposedHeaders: 'Authorization' }));
        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use('/',express.static(path.resolve('public')));
    }

    /**
     * Handling the routes of the API on the dedicated file  
    */ 
    routes() {
        routes(this.app);
    }

    /**
     * Function to start the server
     */
    listen() {
        this.app.listen(this.app.get('port'));
        console.log(`${chalk.yellow('[SERVER]')} running on port ${this.app.get('port')}`);
    }
}

module.exports = App;