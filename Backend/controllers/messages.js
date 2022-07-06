const Message = require("../models/messages");
//importer mysqlConnexion
const mysqlconnection = require("../config/db-config");
//importation du module fs de node.js
const fs = require("fs");

// Constants
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT = 50;

//Crée un message

exports.createMessage = (req, res, next) => {
  let imagePost = "";
  if (req.file) {
    imagePost = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
    };
  try {
    const { title, content, attachment } = req.body;
    const userId = res.locals.userId;
    const data = {
      userId: userId,
      title: title,
      content: content,
      attachment: imagePost,
    };
    mysqlconnection.query(
      "INSERT INTO Publication SET ? ",
      data,
      (error, results) => {
        
        if (error) {
          res.json({ error });
        } else {
          res.json({ message: "message enregistré" });
        }
      }
    );
  } catch {
    return error;
  }
};

//Lire un message

exports.listMessage = (req, res, next) => {
  try {
    
    mysqlconnection.query(
      "SELECT * FROM publication INNER JOIN profil ON publication.userId = profil.id order by publication.idpublication desc ",
      (error, results) => {
        console.log(results);
        if (error) {
          res.json({ error });
        } else {
          res.json({messages:results });
        }
      }
    );
  } catch(error) {
    res.status(500).json({ error });
  }
};


//Supprimer un message

  exports.deleteMessage =  (req, res, next) => {
  try {
    // aller chercher l'id a supprimer dans la requête
        const idpublication = req.params.id;
    
        // requête php
        const querysql = "SELECT * FROM publication WHERE idpublication = ?" 
       mysqlconnection.query(
                querysql,
          [idpublication],
          (error, results) => {
           
            if (error) {
              res.json({ error });
            } else {
              // controle de l'exsistance de la données dans la base de données pour éviter le crash du serveur
              if (!results){
                return res.status(404).json({message: "pas d'objet à supprimer"})
              }
              // controle autorisation de la suppression par l'userId
              console.log(results[0]);
               if (res.locals.admin || res.locals.userId == results[0].UserId) {
                console.log("Autorisation pour suppression de l'objet");
               
                //récupération du nom de la photo à supprimer dans la base de données
                const filename = results[0].attachment.split("/images")[1];
                  //suppression de l'image dans le dossier image du serveur
                  fs.unlink(`images/${filename}`, (error) => {
                    if (error) throw error;
                  });
    
                  // Mettre a jour dans la base de données
                  const querysql = `
                  DELETE FROM publication
                  WHERE idpublication = ?
                  `;
                  const values = [idpublication];
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







