//importation de express
const express = require("express");

//importation du controllers/user.js
const ficheUser = require ("../controllers/ficheUser");
//const { route } = require("./user");
//console.log(ficheUser);
const validate = require("../middleware/validate-inputs")
//importation du  middleware d'authentification
const authentification = require ("../middleware/authentification");

// importation du middleware multer pour la gestion des fichiers images
const multer = require("../middleware/multer");

//la fonction Router()
const router = express.Router();

//Les routes
router.post("/",authentification, multer, ficheUser.createPost );

router.get("/",authentification,ficheUser.readAllPost);

router.get("/:id",authentification, ficheUser.readPost);
 
router.put("/:id",authentification, multer, ficheUser.updatePost);

router.delete("/:id",authentification,ficheUser.deletePost);