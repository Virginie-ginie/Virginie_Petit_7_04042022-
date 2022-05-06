class FicheUser{
    constructor(id,name,email,password,photoProfilUrl ){
        this.id = id;
        this.name =name;
        this.email = email;
        this.password = password;
        this.photoProfilUrl = photoProfilUrl
    }
}

// //exportation du module
module.exports = FicheUser;