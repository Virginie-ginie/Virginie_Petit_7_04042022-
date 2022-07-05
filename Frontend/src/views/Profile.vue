<template>
  <main>
    <div class="BoutonDisconect">
      <Disconect />
      <p>
        <small class="bienvenue">
          Bienvenue  😃
          <router-link class="redirection-messages" to="/messages"
            ><div class="message">Les Messages</div>
          </router-link>
        </small>
      </p>
    </div>
    <div class="container1">
      <br />
      <br />
      <br />
      <div class="titre-bienvenue">Coucou {{ member.name }} !!!  😃 </div>
      <div  class="infos" @click.prevent="SendProfil">
        <span class="name"> Nom:</span> {{ member.name }}<br>
        <span class="email"> Email :</span> {{ member.email }}<br/>

      </div>
      <br />
      <!-- le profil administrateur ne s'affiche que si la personne connectée est admin -->
      <p>
        <button @click.prevent="SupProfile" type="submit" class="btn-supcompte">
          Supprimer le compte
        </button>
      </p>
      <Footer />
    </div>
  </main>
</template>

<script>
import Disconect from "@/components/Deconnection.vue"; //j'appel ma fonction déconnexion
import Footer from "@/components/Footer.vue";
import Logo from "@/components/Logo.vue";
import axios from "axios";

export default {
  name: "PageProfil",
  components: { Disconect, Footer, Logo },
  data() {
    return {
      messages: [],
      member: [], //je récupère les infos de la personnes connectée
    };
  },

  mounted() {
   let user = JSON.parse(window.localStorage.getItem("user"));
    this.member = user;
  },
methods: {
  SendProfil(userId){
    // je récupère les données du profil connecté
    
    let user = JSON.parse(window.localStorage.getItem("user"));
     this.member = user;
    axios
      .get("http://localhost:5000/api/profile/" + userId, {

        headers: {
          Authorization: "Bearer " + user["token"], //je récupère la clé présent dans le local storage
        },
      })

      .then((response) => {
        console.log("réponse API", response);
        this.messages = response.data;
      })
      .catch((error) => console.log(error));
  },
  
    SupProfile(id,userIdOrder ) {
      let user = JSON.parse(window.localStorage.getItem("user"));
       this.member = user;
      //me permet de supprimer un profil au click
      if (window.confirm("Voulez vous vraiment supprimer votre compte?"))
        axios
          .delete(`http://localhost:5000/api/fiche_user`, {
             data: { userIdOrder }, //je récupère les éléments que je souhaite poster
            headers: {
              Authorization: "Bearer " + user["token"], //je récupère la clé présent dans le local storage
            },
          })

          .then(() => {
            localStorage.clear();
            document.location.href = "http://localhost:3000";
          })
          .catch((error) => console.log(error));
    },
  }
};

</script>

<style scoped>
.cacher {
  /*je cache le texte du bouton pour WAVE*/
  display: none;
}

.titre-bienvenue{
    margin-bottom: 50px;
    font-size: 21px;
    margin-left: 100px;
}

.infos {
  margin-top: 10px;
}
img {
  width: 240px;
  height: 50px;
}

.photoprofil {
  height: 200px;
  width: 200px;
}

main {
  background-color: whitesmoke;
  background-image: url("../assets/logo.png");
  background-position: center;
  margin: auto;
  justify-content: center;
  height: 600px;
  font-family: Arial, Helvetica, sans-serif;
}

span {
  font-weight: bold;
  margin-left: 10px;
}

.BoutonDisconect {
  position: absolute;
  right: 12px;
  top: 1px;
}

.btn-supcompte {
  padding: 5px;
  font-size: 15px;
  background: linear-gradient(#9356dc, #f26896);
  text-decoration: none;
  color: white;
  border: 0px solid;
  border-radius: 20px;
  cursor: pointer;
  margin-left: 113px;
  margin-bottom: 146px;
  margin-top: 150px;
}

.btn-supcompte:hover {
  opacity: 0.8;
  background: linear-gradient(black, red);
  text-shadow: 2px 2px 2px black;
  box-shadow: 2px 2px 2px black;
  transition-duration: 0.15s;
}

Footer {
  top: 331px;
}

@media only screen and (min-width:320px) and (max-width:767px) {


.message,.bienvenue,.BoutonDisconect{
font-size: 15px;
margin-left: 28px;
}
.titre-bienvenue{
  margin-left: 30px;
}



  Footer {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    top:888px
  }
}

@media screen and (min-width:768px) and (max-width:1023px) {

main{
   width: 665px;
}

.message,.bienvenue,.BoutonDisconect{
font-size: 15px;
margin-left: 28px;
}
.titre-bienvenue{
  margin-left: 185px;
}

.infos{
  margin-left: 185px;
  font-size: 20px;
}

.btn-supcompte{
  margin-left: 185px;
}
.redirection-message {
    position: static;
  }

  .BoutonDisconect {
    position: static;
  }

  Footer {
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    top:930px
  }

}
</style>






