const express = require("express");
const router = express.Router();

const {createExpediente,listProyectos } = require("../../controllers/proyectosController");

router.post("/createexpediente", createExpediente);
router.get("/list", listProyectos);


module.exports = router;
