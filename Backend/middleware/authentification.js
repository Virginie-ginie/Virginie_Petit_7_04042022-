//importation
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//exportation de la fonction du middleware
module.exports = (req, res, next) => {
  try {
    // recupération du token dans le header authorization
    const token = req.headers.authorization.split(" ")[1];

    // décoder le token
    const decodedToken = jwt.verify(token,process.env.JWT_KEY_TOKEN);

    //récupérer le userId qu'il y a à l'interieur du token déchiffré et le comparé avec l'user en clair
    const userId = decodedToken.userId;
    const admin = decodedToken.isAdmin;
    // affichage de l'Id
    res.locals.userId = userId;
    res.locals.admin = admin;
    
    next()

    //s'il y a des erreurs dans le try on les recupéres ici
  } catch (error) {
    res.status(401).json({
      message: "Echec Authentification",
      error: error,
    });
  }
};
