const { database } = require('./keys');
const { createPool } = require('mysql2/promise');
const chalk = require('chalk');

class Database {
    constructor(data){
        let configuration = data || database;
        try {
            this.connection = createPool(configuration);
            if (this.connection) console.log(`${chalk.green('[DATABASE]')} connected to ${configuration.database} database`);
        } catch (error) {
            console.log(`${chalk.red('[ERROR]')} ${error}`)
            this.connection = null;
        }
    }
}

module.exports = Database;