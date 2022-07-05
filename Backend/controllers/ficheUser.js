//importation du model de la base de donnée
const FicheUser = require("../models/FicheUser");

const mysqlconnection = require("../config/db-config");
//importation du module fs de node.js
const fs = require("fs");

//Crée un fichier
exports.createFicheUser = async (req, res, next) => {
  const userFicheObject = JSON.parse(req.body.ficheUser);
  delete userFicheObject._id;
 

 
  // les variables
  const { name, email } = userFicheObject;
  const photoProfilUrl = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;

  //l'instance
  const ficheUser = new FicheUser(id, name, email, photoProfilUrl);
  // enregister l'objet dans la base de donnée
  try {
    const querysql = `INSERT INTO fiche_user(name,email,password,photoProfilUrl) VALUES (?)`;
    const values = [id, name, email, photoProfilUrl];
    const ficheUser = await mysqlconnection.query(
      querysql,
      [values],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          res.status(200).json({ results });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Retourver tout les éléments
exports.readAllFicheUser = async (req, res) => {
  try {
    const ficheUser = await mysqlconnection.query(
      "SELECT * FROM `profil` WHERE ?",
      ["1"],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          res.status(200).json({ results });
        }
      }
    );
  } catch (err) {
    res.status(400).json({ error });
  }
};

exports.deleteOneFicheUser =  (req, res, next) => {
  //trouver la fiche à supprimer dans la DB pour suppprimer aussi le fichier correspondant sur le serveur
   try {
    const querysql = "SELECT * FROM profil WHERE id= ?" 
     mysqlconnection.query(
            querysql,
      [res.locals.userId],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          // controle de l'exsistance de la données dans la base de données pour éviter le crash du serveur
          if (results != 0){

          }else{
            return res.status(404).json({message: "pas d'objet à supprimer"})
          }
              // Mettre a jour dans la base de données
              const querysql = `
              DELETE FROM profil
              WHERE id = ?
              `;
              const values = [res.locals.userId];
              //la connexion à la base de données
              mysqlconnection.query(querysql, values, (error, results) => {
                if (error) {
                  res.status(500).json({ error });
                } else {
                  res.status(201).json({ message: "objet effacé dans la base de données" ,
                  results,
                  });
                }
              });
      }
    });
  }catch (error){
    res.status(500).json({
      error:error,
      message:"erreur",
    })
  }
};



    

