const express = require("express");
const router = express.Router();
const { newProyecto, listProyectos,getLastId } = require("../../controllers/proyectosController");
const con = require("../../controllers/config");
const multer = require ('multer');

let storage = multer.diskStorage({
   // destination : '../uploads',
   destination :(req, file, cb)=> {
    cb(null, './uploads');
},
    filename:(req, file, cb)=> {
         console.log(req.files.data);
        cb(null, file.fieldname + '-'+ req.body.idProyecto+'.'+file.originalname.split('.').pop());
    }
});

const upload = multer({storage:storage});



// router.post("/newProyecto",  upload.single('file'), (req, rest)=> {
//     try {
//         var matriz =  'D:\\imax\\imax-bienes-futuros-back\\uploads'+req.file.filename;
//         var tasacion = '';
//     var  {idProyecto,nombreProyecto,
//    direccion,promotor,banco} = req.body;
   
//         var sql = "INSERT INTO proyectos (idProyecto,nombreProyecto,direccion,promotor,banco,matriz,tasacion) "+
//         "Values(?,?,?,?,?,?,?)";
//        // console.log(sql);
//         const result =  con.query(sql,[idProyecto,nombreProyecto,direccion,promotor,banco,matriz, tasacion], 
//              (err, res) => {
//             if (err) {
//                 console.log(err);
//                 return rest.status(404).json({ DataProjects: [], Message: "Error en el servidor", StatusCode: 404 });
//             }
//             return rest.status(200).json({ DataProjects: res, Message: "Proyecto enviado correctamente", StatusCode: 200 });
//         });
//     } catch (error) {
//         console.log(error);
//         return rest.status(500).json({ DataProjects: error, Message: "Error en el servidor", StatusCode: 500 });
//     }
//     // rest.send("Todo ok");
// });


router.post("/newProyecto", upload.fields([{ name: 'data'}, { name: 'tasacion' }]), newProyecto);
router.get("/list", listProyectos);
router.get("/getLastId", getLastId);

// router.get('/form', (req,res)=> {
//     res.sendFile('D:/imax/imax-bienes-futuros-back/src/view/index.html');
// });



module.exports = router;
