//importation de bcrypt pour hasher le password
const bcrypt = require("bcrypt");
//importation de jsonwebtoken
const jwt = require("jsonwebtoken");
//importation du models User.js
const User = require("../models/User");
//importer mysqlConnexion
const mysqlconnection = require("../config/db-config");

//signup pour enregister le nouvel utilisateur dans la base de donnée
exports.signup = (req, res) => {
  const {email,password,name} = req.body;
  //instance de la classe User
  const user = new User(email,password,name);
  //hasher le mot de passe avant de l'envoyer dans la base de donées
  user
    .hashPassword()
    .then((hash) => {
      //les données à envoyer dans la requête SQL pour la table profil
      const data = {
        email: email,
        password: hash,
        name:name,
      };
      //la requête sql pour envoyer les données dans la table profil
      mysqlconnection.query(
        "INSERT INTO profil SET ? ",
       data,
        (error, results) => {
          if (error) {
            res.json({ error });
          } else {
            
            res.json({ message: "Utilisateur enregistré" });
          }
        }
      );
    })
    .catch((error) => res.status(500).json({ error }).send());
};
//login pour s'authentifier
exports.login = (req, res, next) => {
  const email = req.body.email;
  
  console.log(email);
  // chercher dans la base de donnée si l'utilisateur est bien présent
  mysqlconnection.query(
    "SELECT * FROM profil WHERE email = ? ",
    email,
    (error, results) => {
      if (error) {
        res.json({ error });
      } else {
        // si l'email de l'utilisateur n'est pas présent dans la base de données
        if (results == 0) {
          return res
            .status(500)
            .json({ error: "utilisateur inexsistant dans la base de données" });
        }
        // Controler la validité du password envoyer par le front
        bcrypt
          .compare(req.body.password, results[0].password)
          .then((controlPassword) => {
            // si le password n'est pas correct
            if (!controlPassword) {
              return res
                .status(401)
                .json({ error: "Le mot de passe est incorrect" });
            }
            // si le password est correct
            //envoye dans la response du serveur :userId et le token d'authentification

            //génération du token
            const token = jwt.sign(
              //3 arguments
              { userId: results[0].id ,
                isAdmin:results[0].isAdmin,
                name: results[0].name, },
              `${process.env.JWT_KEY_TOKEN}`,
              { expiresIn: "12h" }
            );

            //réponse du serveur avec le userId et le token
            res.status(201).json({
              userId: results[0].id,
              token,
              email:results[0].email,
              name:results[0].name,
              isAdmin:results[0].isAdmin,
              
            });
          })
          .catch((error) => res.status(500).json({ error }));
      }
    }
  );
};
