import Knex from 'knex';
import path from 'path';

const connection = Knex({
    client:"sqlite3",
    connection:{
        filename: path.resolve(__dirname, 'database.sqlite'),
    },
    useNullAsDefault:true,
});

export default connection;

//Migrations = Historico do banco de dados

// create table points 
// create table users