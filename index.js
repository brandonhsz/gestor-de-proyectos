const express = require("express");
const path = require("path");
const routes = require("./routes/routes");

//Importar Helpers
const helpers = require("./helpers");

//Crear la conexion a la BD
const db = require("./config/db");
//importar el modelo
require("./models/Proyectos");

db.sync()
  .then(() => console.log("Conectando al Servidor"))
  .catch((error) => console.log(error));

//inicializar aplicacion express
const app = express();

//cargar archivos estaticos
app.use(express.static("public"));

//habilitar pug
app.set("view engine", "pug");
//seleccionar ubicacion del archivo de vistas
app.set("views", path.join(__dirname, "./views"));

//pasar var dump a la aplicacion
app.use((req, res, next) => {
  res.locals.vardump = helpers.Vardump;
  next();
});

//Habilitart bodyParser para leer datos del formulario
app.use(express.urlencoded({ extended: true }));

app.use("/", routes());

app.listen(3000);
