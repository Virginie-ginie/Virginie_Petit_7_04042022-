<template>
     <footer>
    <div class="wrapper">
      <small>&copy;2021 <strong>Groupomania</strong>, Tous droit réservé</small>
      <nav class="footer-nav">
        <a href="#hautdepage">Retour en haut</a>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
strong {
  font-weight: 700;
}

footer {
   background: linear-gradient(#9356DC,#f26896);
  display: table;
  width: 100vw;
  text-align: center;
  padding: 1rem;
  font-family: 'Arial', sans-serif;
  font-size: .875rem;
  width: 100%;
}

.wrapper {
  display: table-cell;
  vertical-align: middle;
}

footer small {
  color: white;
  letter-spacing: .025rem;
  margin-bottom: 1.5rem;
  display: block;
}

.footer-nav a, .redirection-profil {
  color: #f7f3f5;
  text-decoration: none;
  margin: 0 .5rem;
  display: inline-block;
}

.footer-nav a:hover {
  color: #f7f0f7ea;
  transition: color .15s ease-in-out;
}

</style>