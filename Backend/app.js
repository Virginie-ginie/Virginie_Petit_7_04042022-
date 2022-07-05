// ce fichier gére toutes les requêtes envoyé vers le serveur

//importation de express
const express = require("express");
//importation d'helmet
const helmet = require("helmet");
//importation express rate limit
const rateLimit =require("express-rate-limit");
//importation de morgan (logger http)
const morgan = require("morgan");
//importation conexion base de donné mysql
const mysql = require("./config/db-config");
//importation des routes
const userRoutes = require("./routes/user");
const ficheUserRoutes = require("./routes/ficheUser");
const messagesRoutes = require("./routes/messages")

//importation de node.js utilitaires pour tavailler avec les chemins de fichiers et de répertoires
const path = require("path");
const CORS = require ("cors")
require("dotenv").config();



//pour créer une application express
const app = express();
app.use(CORS())
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
});

app.use(limiter);
app.use(helmet({
    crossOriginResourcePolicy: false
  
}));

// logger les requetes et les reponses
app.use(morgan("dev"));

// on intercepte toutes les requetes qui continenne du JSON et
// met a disposition le continu de la requet ds req.body
app.use(express.urlencoded());
app.use(express.json());


//La méthode app.use() vous permet d'attribuer un middleware à une route spécifique de votre application.

// gérer les problèmes de CORS
app.use((req, res, next) => {
  //d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
  res.setHeader("Access-Control-Allow-Origin", "*");
  //d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
  res.setHeader(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-with, Content, Accept, Content-Type, Authorization"
  );
   //d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PATCH, OPTIONS"
  );
  next();
});

// la route d'authentification
app.use("/api/authentification", userRoutes);

//la route du profil
app.use("/api/fiche_user", ficheUserRoutes);

// Le route pour les messages
app.use("/api/messages",messagesRoutes);



//le route pour accéder aux images du dossier images
app.use("/images", express.static(path.join(__dirname, "images")));


//exportation de app.js pour pouvoir y accéser depuis un autre fichier
module.exports = app;
