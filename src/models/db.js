const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '00177100',
    database: 'rabbitmq_base',
    multipleStatements: true
})

module.exports = db