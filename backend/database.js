//mysql info
const mysql = require('mysql');

mysqlConnection = mysql.createConnection({
    host: 'XXXXX',
    user: 'XXXXX',
    password: 'XXXXX',
    database: 'XXXXX',
    multipleStatements: true
});

//establish mysql connection
mysqlConnection.connect((err)=> {
    if(!err){
        console.log('Connection Established Successfully');
    }
    else
        console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
});

module.exports = mysqlConnection;