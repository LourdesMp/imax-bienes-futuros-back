const express = require("express");
const router = express.Router();


const { listTasaciones } = require ("../../controllers/tasacionController");


router.get("/listTasaciones", listTasaciones);


module.exports = router;
