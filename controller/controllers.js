const Proyectos = require("../models/Proyectos");
const slug = require("slug");

exports.controllerHome = async (req, res) => {
  const proyectosdb = await Proyectos.findAll();
  res.render("index", {
    nombrePagina: "Proyectos",
    proyectosdb,
  });
};

exports.controllerNuevoProyecto = (req, res) => {
  res.render("nuevoProyecto", {
    nombrePagina: "NuevoProyecto",
  });
};

exports.nuevoProyecto = async (req, res) => {
  //Enviar a la consola lo que el usuario escriba
  console.log(req.body);

  //validar formulario
  const { nombre } = req.body;

  let errores = [];

  if (!nombre) {
    errores.push({ texto: "Agrega un nombre al proyecto" });
  }

  //si hay errores
  //verificar que ocurre en grupo de facebook error
  if (errores.length > 0) {
    res.render("nuevoProyecto", {
      nombrePagina: "Nuevo Proyecto",
      errores,
    });
  } else {
    //no hay errores
    //insertar db

    const proyectos = await Proyectos.create({ nombre });
    res.redirect("/");
  }
};

exports.proyectosPorUrl = async (req, res, next) => {
  const proyecto = await Proyectos.findOne({
    where: {
      url: req.params.url,
    },
  });

  if (!proyecto) return next();

  res.render("tareas", {
    nombrePagina: "Tareas del proyecto",
    proyecto,
  });
};
