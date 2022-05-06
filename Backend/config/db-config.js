const mysql = require ("mysql2");
const dotenv = require ("dotenv");
dotenv.config();
console.log(mysql);
//les parametres de connexion à la base de données
const mysqlconnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"logelbach68",
    database:"groupomania2"
});

//la connexion à la base de données
mysqlconnection.connect((err) => {
    if (err) {
    }else{   
        console.log("Connected!");
    }
  });

  module.exports = mysqlconnection;