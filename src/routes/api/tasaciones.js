const express = require("express");
const router = express.Router();


const { newTasacion, listTasaciones } = require ("../../controllers/tasacionController");

router.post("/newTasacion", newTasacion);
router.get("/listTasaciones", listTasaciones);


module.exports = router;
