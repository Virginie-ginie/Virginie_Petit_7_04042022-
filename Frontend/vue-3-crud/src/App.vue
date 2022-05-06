<template>
  <div>
    <div class="barre_nav">
      <ul class="nav">
        <li><a href="Accueil">Accueil</a></li>
        <li><a href="Connexion">Connexion</a></li>
        <li><a href="Inscription">Inscription</a></li>
        <li><a href="Contact">Contact</a></li>
      </ul>
    </div>
    <div class="logo_groupomania">
      <img class="logo" alt="Vue logo" src="./assets/logo.png" />
      <router-view> </router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap");
* {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  max-width: 100%;
  font-size: 20px;
  margin-left: 100px;
  margin-top: 0;
}
.logo_groupomania {
  width: 350px;
  margin-left: -150px;
  margin-top: -200px;
  margin-bottom: 0px;
}
.barre_nav {
  font-size: 16px;
  margin-top: -310px;
  margin-left: 800px;
}

a {
  text-decoration: none;
  color: black;
  margin-left: 10px;
}
ul {
  display: flex;
  justify-content: space-around;
  list-style-type: none;
}

body {
  background-image: linear-gradient(62deg, #9c0a8b 0%, #f7f5ee 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px;
}
img {
  max-width: 100%;
  border-radius: 8px;
}
</style>