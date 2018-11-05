'use strict';
var Database = require('./Database');
const config = require('./config');

Database.query(`SELECT TOP 50 momento, temperatura, umidade FROM leitura`).then(results => {
    console.log(results);
}).catch(error => {
    console.log(error);
});
