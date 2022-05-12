//importation du model de la base de donnée
const FicheUser = require("../models/FicheUser");

const mysqlconnection = require("../config/db-config");
//importation du module fs de node.js
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { REPL_MODE_SLOPPY } = require("repl");

//création d'une publication
exports.createPost = (req, res) => {
    console.log("req.body",req.body);
    console.log("req.file",req.file);

    const publication = JSON.parse(req.body.publication);

  const newPublication = {
      text:publication.text,
      image:req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      :null,
      profil_id:publication.profil_id,
  };

  //enregistrer le nouveau post dans la base de donnée
  mysqlconnection.query(
      `INSERT INTO publication SET ?`,
      newPublication,
      (error,results) => {
          if (error) {
              res.status(500).json({
                  error:error,
                  message:"Votre post ne peut pas être enregistré ! "
              });
          }else{
              res.status(201).json({message:"Votre post a été enregisté ! "});
          }
      }
  );
};

// lire tout les posts

exports.readAllPost = (req,res) => {
mysqlconnection.query(
    `
    SELECT publication.id as publication_id, profil.id as profil_id
    FROM publication
    JOIN profil ON publication.profil_id = profil.id
    ORDER BY publication.id DESC`,
    (error,results) => {
        console.log(error);
        console.log(results);
if (error){
    console.log(error);
    res.status(500).json({
        message:"Impossible de récupérerles données",
        error:error,
    });
}else{
    const dToken =req.dToken;

    console.log(results);
    [
        {
            text: "",
            creation_date: "",
            creator:{
                id: ,
                name: ,
                avatar: ,
            }
        }
    ]
    res.status(200).json({results:results, dToken: dToken});
            }
         }
    )
};
   