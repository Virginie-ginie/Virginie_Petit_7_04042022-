//importer le package HTTP de Node.js pour avoir les outils pour créé le serveur
const http = require("http");

//importer l'application app.js
const app = require("./app");

//importer le package pour utiliser les variable d'environnement 
const dotenv = require("dotenv");
const result = dotenv.config();

const normalizePort = (val) => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };

//la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne ;
const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

//la fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur ;
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//La méthode createServer(.) prend en argument la fonction qui sera appelé
// à chaque requête reçu par le serveur
//ici les fonctions seront dans app.js
const server =http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

// le serveur écoute les requetes sur le port
server.listen(process.env.PORT);


