//importation du model de la base de donnée
const FicheUser = require("../models/FicheUser");

const mysqlconnection = require("../config/db-config");
//importation du module fs de node.js
const fs = require("fs");

//Crée un fichier
exports.createFicheUser = async (req, res, next) => {
  const userFicheObject = JSON.parse(req.body.ficheUser);
  delete userFicheObject._id;
  //pour fabriquer l'url de l'image

  //l'instant FicheUser
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


//Retourver 1 élément
exports.readOneFicheUser = async (req, res) => {
  try {
    const id = req.params.id;
    const querysql = "SELECT * FROM `profil` WHERE `id` = ?";
    const ficheUser = await mysqlconnection.query(
      querysql,
      ["id"],

      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          res.status(200).json({ results });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

//Modifier un élément
exports.updateOneFicheUser = async (req, res, next) => {
  //Aller chercher l'objet dans la table profil
  try {
    const id = req.params.id;
    const querysql = "SELECT * FROM profil WHERE id = ?";

    const ficheUser = await mysqlconnection.query(
      querysql,
      [id],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          // controle autorisation de la modification par l'userId
          if (userIdParamsUrl == results[0].profil.id) {
            console.log("Autorisation pour modification de l'objet");

            // s'il y a un fichier attaché à modifier
            if (req.file) {
              // recupération du nom de la photo à supprimer dans la base de données
              const filename =
                results[0].profil_protoProfilUrl.split("/images")[1];

              //suppression de l'image dans le dossier image du serveur
              fs.unlink(`images/${filename}`, (error) => {
                if (error) throw error;
              });
            }

            //l'objet qui va etre mise à jour dans la base de données
            const userFicheObject = JSON.parse(req.bpdy.ficheUser);

            //création des variables qui vont etre utilisé pour l'envoi dans SQL
            //deux cas possible avec et sans le fichier image
            const ficheUserObject = req.file
              ? {
                  ...JSON.parse(req.body.ficheUser),
                  photoProfilUrl: `${req.protocol}://${req.get(
                    "host"
                  )}/images/${req.file.filename}`,
                }
              : {
                  ...JSON.parse(req.body.ficheUser),
                };

            // mettre à jour la base de données
            const { id, name, email, photoProfilUrl } = ficheUserObject;
            const querysql = req.file
              ? `
          UPDATE profil SET
          name = ?,
          email = ?,
          photoProfilUrl = ?
          WHERE id = ?
          `
              : `
          UPDATE profil SET
          name = ?,
          email = ?,
          WHERE id = ?
          `;

            const values = req.file
              ? [name, email, photoProfilUrl, id]
              : [name, email, id];

            mysqlconnection.query(querysql, values, (error, results) => {
              if (error) {
                res.status(500).json({ error });
              } else {
                res
                  .status(201)
                  .json({ message: "mise a jour OK dans la base de données" ,
                results,
                });
              }
            });
          } else {
           res.status(403).json({message: "Vous n'êtes pas autorisé à modifier les données"})
           
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteOneFicheUser = async (req, res, next) => {
  //trouver la sauce à supprimer dans la DB pour suppprimer aussi le fichier correspondant sur le serveur
  try {
// aller chercher l'id a supprimer dans la requête
    const id = req.params.id;

    // requête php
    const querysql = "SELECT * FROM profil WHERE id = ?" 
    await mysqlconnection.query(
            querysql,
      [id],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          // controle de l'exsistance de la données dans la base de données pour éviter le crash du serveur
          if (results != 0){

          }else{
            return res.status(404).json({message: "pas d'objet à supprimer"})
          }
          // controle autorisation de la suppression par l'userId
          if (userIdParamsUrl == results[0].profil.id) {
            console.log("Autorisation pour suppression de l'objet");

            //récupération du nom de la photo à supprimer dans la base de données
            const filename =
                results[0].profil_protoProfilUrl.split("/images")[1];

              //suppression de l'image dans le dossier image du serveur
              fs.unlink(`images/${filename}`, (error) => {
                if (error) throw error;
              });

              // Mettre a jour dans la base de données
              const querysql = `
              DELETE FORM profil
              WHERE id = ?
              `;
              const values = [id];
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
          }else{
            res.status(403).json({ message :"Vous n'être pas autoriser à supprimer les données",
          });
        }
      }
    });
  }catch (error){
    res.status(500).json({
      error:error,
      message:"image inexsistante",
    })
  }
};



    

