const mysql = require ("mysql2");
const dotenv = require ("dotenv");
dotenv.config();
//les parametres de connexion à la base de données
const mysqlconnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_password,
    database: process.env.DB_NAME,
});

//la connexion à la base de données
mysqlconnection.connect((err) => {
    if (err) {
    }else{   
        console.log("Connected!");
    }
  });

  module.exports = mysqlconnection;