const express = require("express");
const router = express.Router();

const { newProyecto, listProyectos } = require("../../controllers/proyectosController");


router.post("/newProyecto", newProyecto);
router.get("/list", listProyectos);



module.exports = router;
