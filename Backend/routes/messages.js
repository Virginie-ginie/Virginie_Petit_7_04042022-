//importation de express
const express = require("express");

//importation du  middleware d'authentification
const authentification = require ("../middleware/authentification");

// importation du middleware multer pour la gestion des fichiers images
const multer = require("../middleware/multer");
const messagesCtrl = require('../controllers/messages');

//la fonction Router()
const router = express.Router();

 // Messages routes
router.post("/",authentification,multer,messagesCtrl.createMessage)

router.get("/",authentification,multer,messagesCtrl.listMessage)

router.delete("/:id",authentification,messagesCtrl.deleteMessage)


//exportation
module.exports = router;