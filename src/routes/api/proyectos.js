const express = require("express");
const router = express.Router();
const { newProyecto, listProyectos,getLastId, matrizUpdate,tasacionesUpdate } = require("../../controllers/proyectosController");
const con = require("../../controllers/config");
const multer = require ('multer');

let storage = multer.diskStorage({
   // destination : '../uploads',
   destination :(req, file, cb)=> {
    cb(null, './uploads');
},
    filename:(req, file, cb)=> {
         console.log('nombre', req.body);
        cb(null, file.fieldname + '-'+ req.body.idProyecto+'.'+file.originalname.split('.').pop());
    }
});

const upload = multer({storage:storage});



router.post("/newProyecto", upload.fields([{ name: 'data'}, { name: 'tasacion' }]), newProyecto);
router.get("/list", listProyectos);
router.get("/getLastId", getLastId);
router.get("/upMatriz", matrizUpdate);
router.get("/upTasaciones", tasacionesUpdate)

module.exports = router;
