//importation
const express = require("express");
 const password = require("../middleware/password");

//importation du controllers/user.js
const {signup, login} = require ("../controllers/user")

//la fonction Router()
const router = express.Router();

//la route signup
router.post("/signup",password, signup);

//la route login
router.post("/login", login);

//exportation du module
module.exports = router;