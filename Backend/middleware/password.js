//importation de password validator
const passwordValidator =require("password-validator");

//création du schéma
const passwordSchema = new passwordValidator();

//le schéma que doit repecter le mot de passe
passwordSchema
.is().min(5) // minimum 5 lettres
.is().max(100) // max 100 lettres
.has().uppercase() // 1 majuscule
.has().lowercase()// minuscule
.has().digits(2) // 2 chiffres
.has().not().spaces() // pas d'espace
.is().not().oneOf(['Passw0rd', 'Password123']); // mot interdit

//vérification de la qualité du password par rapport au schéma

module.exports = (req,res,next) =>{
if(passwordSchema.validate(req.body.password)){
 next();
}else{
 return res.status(400).json ({error :`Le mot de pass n'est pas valide $passwordSchema.validate('req.body.password',{list:true})`})
}
}