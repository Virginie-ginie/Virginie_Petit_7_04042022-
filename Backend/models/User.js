//importation de bcrypt pour hasher le password
const bcrypt = require("bcrypt");

class User {
  constructor(email, password,name) {
    this.email = email;
    this.password = password;
    this.name = name;
  }
  //méthode pour hasher le mot de passe
  hashPassword = async function () {
    try {
      const hashPassword = bcrypt.hash(this.password, 10);
      return hashPassword;
    } catch (err) {}
  };
}

module.exports = User;
