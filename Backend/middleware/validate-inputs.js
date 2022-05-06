// const Joi = require("@hapi/hapi");

// /**
//  * Validation des données d'entrée lors du signup et login d'un utilisateur
//  */
// const userSchema = Joi.object({
//   email: Joi.string().trim().email(),
//   password: Joi.string().trim().min(4),
// });
// exports.user = (req, res, next) => {
//   const { error, value } = userSchema.validate(req.body);
//   if (error) {
//     res.status(422).json({ error: "email ou mot de passe invalide" });
//   } else {
//     next();
//   }
// };

// /**
//  * Validation des données d'entrée lors de l'ajout ou la modification d'une sauce
//  */
// const ficheSchema = Joi.object({
//   userId: Joi.string().trim().length(24).required(),
//   name: Joi.string().trim().min(1).required(),
// });
// exports.fiche = (req, res, next) => {
//   let fiche;
//   if (req.file) {
//     fiche = JSON.parse(req.body.sauce);
//   } else {
//     fiche = req.body;
//   }

//   const { error, value } = ficheSchema.validate(fiche);
//   if (error) {
//     res.status(422).json({ error: "Les données entrées sont invalides" });
//   } else {
//     next();
//   }
// };

// /**
//  * Validation de l'id des sauces
//  */
// const idSchema = Joi.string().trim().length(24).required();
// exports.id = (req, res, next) => {
//   const { error, value } = idSchema.validate(req.params.id);
//   if (error) {
//     res.status(422).json({ error: "id de la fiche invalide" });
//   } else {
//     next();
//   }
// };
