const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '103.21.58.231',
    port: 3306,
    user: 'adhocvhs_adhocintern',
    password: 'adhocvhs_adhocintern',
    database: 'adhocvhs_nodedb'
});

// const connection = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'Ajithk01@',
//     database:'adhoc_local'
//   });

connection.connect(function (error) {
    if (error) {
        console.error('Error connecting to MySQL:', error);
    } else {
        console.log('Database connected');
    }
});

module.exports = connection;