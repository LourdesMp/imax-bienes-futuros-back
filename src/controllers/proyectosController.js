const con = require("./config");
const multer = require ('multer');
const path = require ('path')


const newProyecto =  (req, rest)=> {
    // upload.single('file');
    console.log(req.files);
    try {
        var matriz =  'D:\\imax\\imax-bienes-futuros-back\\uploads\\'+ req.files.file[0].filename;
        var tasacion = 'D:\\imax\\imax-bienes-futuros-back\\uploads\\' + req.files.tasacion[0].filename;
        // console.log(req.body)
        var  {nombreProyecto, direccion,promotor,banco} = req.body;
   
        var sql = "INSERT INTO proyectos (nombreProyecto,direccion,promotor,banco,matriz,tasacion) "+
        "Values(?,?,?,?,?,?)";
       // console.log(sql);
        const result =  con.query(sql,[nombreProyecto,direccion,promotor,banco,matriz, tasacion], 
             (err, res) => {
            if (err) {
                console.log(err);
                return rest.status(404).json({ DataProjects: [], Message: "Error en el servidor", StatusCode: 404 });
            }
            return rest.status(200).json({ DataProjects: res, Message: "Proyecto enviado correctamente", StatusCode: 200 });
        });
    } catch (error) {
        console.log(error);
        return rest.status(500).json({ DataProjects: error, Message: "Error en el servidor", StatusCode: 500 });
    }
    // rest.send("Todo ok");
};

const listProyectos = async (req, rest) => {
 
    try {
      //  var {DniSolicitante,Solicitante} = req.body;

       

        var sql = " SELECT * FROM proyectos ";
       // console.log(sql);
        const result = await con.query(sql, async (err, res) => {
            if (err) {
                console.log(err);
                return rest.status(404).json({ DataProjects: [], Message: "Error en el servidor", StatusCode: 404 });
            }
            return rest.status(200).json({ DataProjects: res, Message: "", StatusCode: 200 });
        });
    } catch (error) {
        console.log(error);
        return rest.status(500).json({ DataProjects: error, Message: "Error en el servidor", StatusCode: 500 });
    }
}

module.exports = {
    newProyecto,
    listProyectos
}
