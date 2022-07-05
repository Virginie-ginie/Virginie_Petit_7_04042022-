<template>
  <main>
    <form>
      <div id="hautdepage"></div>
      <div class="container1">
        <div class="BoutonDisconect">
          <Disconect />
        </div>
        <p>
          <small>
            Bienvenue {{ member.name }} 😃
            <router-link class="redirection-profil" to="/profile">
              <p v-if="member.attachment">
                <img class="photoprofil" :src="member.attachment" alt="..." />
              </p>
              <p class="profilsansphoto" v-else>Mon profil</p>
            </router-link>
          </small>
        </p>
        <div class="form-group">
          <label for="inputTitle"><h3>Titre</h3> </label><br />
          <input
            type="text"
            class="form-control"
            id="inputTitle"
            v-model="dataMessage.title"
          />
        </div>
        <div class="form-group">
          <label for="inputContent"><h3>Quoi de neuf?</h3></label><br />
          <textarea
            id="inputContent"
            v-model="dataMessage.content"
            style="height: 100px; margin-top: -10px"
          ></textarea>
        </div>

        <div class="btn-upload">
          <input
            name="inputFile"
            type="file"
            class="upload"
            id="inputFile"
            @change="onFileChanged"
          />
        </div>

        <button @click.prevent="SendMessage" type="button" class="btn-publier">
          <span class="btnpublier">Publier</span>
        </button>
      </div>
      <div class="container2">
        <div class="test">
          <h3>Fil d'actualité</h3>

          <ul id="example-1">
            <li class="post-container" v-for="item in messages" :key="item.id">
              <div> {{ item.name }}</div>
              <span>{{ item.title }}<br /></span>
              <div class="contenu">{{ item.content }} <br /></div>
              <div v-if="item.attachment">
                <img class="image" :src="item.attachment" alt="..." />
              </div>
              <!-- j'affiche l'image uniquement si il y en a une-->
              <div class="bottom-post-container">
                <button
                  v-if="item.UserId == member.userId || member.isAdmin"
                  @click.prevent="DeleMessage(item.idpublication, item.userId)"
                  id="supprimer"
                  type="submit"
                  class="supp"
                >
                  <span class="supprimer">Supprimer</span>
                  <i class="fas fa-trash-alt"></i>
                </button>
                <textarea
                  type="text"
                  id="comment"
                  name="comment"
                  class="form-control"
                  v-model="dataComment.content"
                  placeholder="Insérer votre commentaire..."
                ></textarea>
              </div>
              <!--le bouton Supprimer s'affiche uniquement si la personne connectée est la personne qui a publié le message ou un admin-->
              <!--partie création commentaire -->
            </li>
          </ul>
        </div>
      </div>
    </form>
    <Footer />
  </main>
</template>

<script>
import Disconect from "@/components/Deconnection.vue"; //'j'importe ma fonction déconnexion
import Footer from "@/components/Footer.vue";
import axios from "axios";

export default {
  name: "Message",
  components: { Disconect, Footer },
  data() {
    return {
      dataMessage: {
        title: null,
        content: null,
        attachment: null,
      },

      dataComment: {
        content: null,
      },

      messages: [], //je récupère les infos des messages
      member: {}, //je récupère les infos de la personnes connectée
    };
  },

  mounted() {
    let user = JSON.parse(window.localStorage.getItem("user"));
    this.member = user;
    axios
      .get(
        "http://localhost:5000/api/messages", //je récupère les messages postés

        {
          headers: {
            Authorization: "Bearer " + user["token"], //je récupère la clé présent dans le local storage
          },
        }
      )

      .then((response) => {
        console.log(response);
        this.messages = response.data.messages;
      })
      .catch((error) => console.log(error));
  },

  methods: {
    SendMessage() {
      //je récupère et envoie ce dont j'ai besoin pour créer un message
      let user = JSON.parse(window.localStorage.getItem("user"));
      const formData = new FormData();
      formData.append("title", this.dataMessage.title); //.append créé une clé de valeur en récupérant la valeur des inputs (name = 'title' value='this.dataMessage...')
      formData.append("content", this.dataMessage.content);
      formData.append("attachment", this.dataMessage.selectedFile);
      if (
        formData.get("title") !== null &&
        formData.get("content") !== null
        //.get renvoie la valeur associé a une clé créé précédement (ex: valeur de 'title' est le resulat de this.datamessage.title)
      ) {
        axios
          .post("http://localhost:5000/api/messages", formData, {
            //je récupère les éléments que je souhaite poster
            headers: {
              Authorization: "Bearer " + user["token"], //je récupère la clé présent dans le local storage
            },
          })
          .then((response) => {
            console.log(response);
            window.location.reload();
          })
          .catch((error) => console.log(error));
      } else {
        console.log("oops !");
      }
    },

    onFileChanged(event) {
      //me permet de charger un fichier (une image) au click

      this.dataMessage.selectedFile = event.target.files[0];
      console.log(this.dataMessage.selectedFile);
    },

    DeleMessage(id, userIdOrder) {
      //'jenvoie l'id du message selectionné ainsi que l'id de la personne qui a créé le message
      let user = JSON.parse(window.localStorage.getItem("user"));
      if (window.confirm("Voulez vous vraiment supprimer le post?"))
        axios
          .delete(`http://localhost:5000/api/messages/${id}`, {
            data: { userIdOrder }, //je récupère les éléments que je souhaite poster
            headers: {
              Authorization: "Bearer " + user["token"], //je récupère la clé présent dans le local storage
            },
          })
          .then(() => {
            window.location.reload();
          })
          .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
.h3 {
  margin-left: 20px;
  margin-bottom:20px;
}
.supprimer {
  font-size: 10px;
}
.bottom-post-container{
  display: flex;
  flex-direction: row;
  height: 60px;
  align-items: center;
  justify-content: space-between;

}

.image {
  width: 10px;
}
#supprimer {
  padding: 5px;
  font-size: 15px;
  background: linear-gradient(#9356dc, #f26896);
  text-decoration: none;
  color: white;
  border: 0px solid;
  border-radius: 20px;
  cursor: pointer;
}
.container1 {
  /*contient les inputs*/
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2; /*rgba(255,192,203,0.5);*/
  font-family: Arial, Helvetica, sans-serif;
  border: 2px solid none;
  border-radius: 8px;
  box-shadow: 1px 1px 2px #555;
  width: 800px;
  padding:30px;
  margin-bottom:30px;
}


.container1 .photoprofil {
  /*photo profil de la page profil perso*/

  height: 50px;
  width: 50px;
  border-radius: 50px;
}

.container2 .photoprofil {
  /*photo profil de la personne qui poste le message*/
  height: 65px;
  width: 65px;
  border-radius: 50px;
  margin-top: 8px;
}

.cacher {
  /*je cache le texte du bouton pour WAVE*/
  display: none;
}

span {
  /*titre, contenu... en gras */
  font-weight: bold;
  font-size: 20px;
}

.contenu {
  /*texte des messages*/
  font-size: 17px;
}

.test {
  /*contient le fil d'actualités et le reste des infos*/
  display: flex;
  flex-direction: column;
  background-color: #fffafa;

  background-position: center;
  background-size: 25%;
}

.profilsansphoto {
  color: blue;
  position: absolute;
  right: 60px;
}

.fa-arrow-circle-up {
  font-size: 30px;
}

.fas-fa-users {
  size: 40px;
}

.BoutonDisconect {
  position: absolute;
  right: 18px;
  top: 45px;
}

.test li {
  /*liste contenant les contenus, titre...*/
  background-color: #f2f2f2;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid none;
  border-radius: 8px;
  box-shadow: 1px 1px 2px #555;
  list-style: none;
  font-family: Arial, Helvetica, sans-serif;
  width: 60%;
}
.post-container {
  display: flex;
  flex-direction: column;
  padding: 30px;
  row-gap:17px ;
}
.container1 img {
  /*logo principal*/
  width: 250px;
  height: 50px;
  position: absolute;
  left: 10px;
}

.container2 img {
  /*image publié par les utilisateurs */
  object-fit: cover;
  width: 100%;
  height: 300px;
  border: 2px solid none;
  border-radius: 20px;
}

small {
  /*redirection vers la page profil*/
  position: absolute;
  right: 10px;
  top: 26px;
}

#inputContent,
#inputTitle,
textarea {
  border: 2px solid none;
  border-radius: 10px;
  border: none;
  outline: none;
  box-shadow: 1px 1px 1px black;
  width: 330px;
  height: 40px;
  margin-right: 0;
}

.btnpublier {
  font-size: 15px;
}

.btn-publier {
  padding: 5px;
  font-size: 15px;
  background: linear-gradient(#9356dc, #f26896);
  text-decoration: none;
  color: white;
  border: 0px solid;
  border-radius: 20px;
  cursor: pointer;
}
.supprimer:hover {
  opacity: 0.8;
  background: linear-gradient(black, red);
  text-shadow: 2px 2px 2px black;
  box-shadow: 2px 2px 2px black;
  transition-duration: 0.15s;
}

.btn-publier {
  opacity: 0.8;
  background: linear-gradient(rgb(255, 64, 255), #f510ed);
  text-shadow: 2px 2px 2px black;
  box-shadow: 2px 2px 2px black;
  transition-duration: 0.15s;
  width: 117px;
  height: 26px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 10px;
}



@media only screen and (min-width:320px) and (max-width:767px){

.container1 {
    width: 320px;
  }
.container1 img {
    width: 250px;
    height: 50px;
    position: static;
  }

  .container2 img {
    width: 150px;
    height: 140px;
    border: 2px solid none;
    border-radius: 20px;
  }
  #inputContent{
    width: 295px;;
  }
  #inputTitle{
    width: 295px;
  }
 #supprimer{
  margin-right: 15px;
  margin-left: -20px;
}
  .test li {
    width: 100%;
  }

  .profilsansphoto {
    position: static;
  }

  .message,.bienvenue,.BoutonDisconect{
font-size: 15px;
margin-left: 28px;
}
.titre-bienvenue{
  margin-left: 185px;
}

  Footer {
    width: 100%;
  }
}

@media screen and (min-width:768px) and (max-width:1023px) {
.container1{
  width: 750px;
}
#supprimer{
  margin-right: 15px;
  margin-left: -20px;
}
  
}
</style>

