const express = require("express");
const router = express.Router();
const { body } = require("express-validator/check");

const controllers = require("../controller/controllers");

module.exports = function () {
  //metodos get
  router.get("/", controllers.controllerHome);
  router.get("/nuevo-proyecto", controllers.controllerNuevoProyecto);
  router.get("/proyectos/:url", controllers.proyectosPorUrl);
  router.get("/proyectos/editar/:id", controllers.formularioEditar);

  //metodos post
  router.post(
    "/nuevo-proyecto",
    body("nombre").not().isEmpty().trim().escape(),
    controllers.nuevoProyecto
  );
  router.post(
    "/nuevo-proyecto/:id",
    body("nombre").not().isEmpty().trim().escape(),
    controllers.editarProyecto
  );
  return router;
};
