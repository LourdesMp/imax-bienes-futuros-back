const con = require("./config");
const multer = require ('multer');
const path = require ('path')


const newProyecto =  (req, rest)=> {
    // upload.single('file');
     console.log(req.body);
    try {
        var  {idProyecto,nombreProyecto, promotor,banco} = req.body;
        var nombreData = 'data-'+idProyecto + '.' + req.files.data[0].originalname.split('.').pop();
            var nombreTasacion = 'tasacion-'+idProyecto  + '.' + req.files.tasacion[0].originalname.split('.').pop();
        var data =  'D:\\imax\\imax-bienes-futuros-back\\uploads\\'+nombreData ;
             var tasacion = 'D:\\imax\\imax-bienes-futuros-back\\uploads\\' + nombreTasacion;
        // console.log(req.body)
       
   
        var sql = "INSERT INTO prueba.proyectos (nombreProyecto,promotor,banco,data,tasacion) "+
        "Values(?,?,?,?,?)";
       // console.log(sql);
        const result =  con.query(sql,[nombreProyecto,promotor,banco,data,tasacion], 
             (err, res) => {
                 console.log(err)
            if (err) {
                


                return rest.status(404).json({ DataProjects: [], Message: "Error en el servidor", StatusCode: 404 });
            }
            var nombreDb = 'db_'+idProyecto;
            var sql1  = 'CREATE DATABASE '+nombreDb;
            var sql2 = 'USE ' +nombreDb;
            var sql4 = ' CREATE TABLE matriz( idProyecto INT);';
            var sql3 = ' CREATE TABLE tasacion( idProyecto INT);';
            con.query(sql1,(err,res1) => {

            });
            con.query(sql2,(err,res2) => {

            });
            con.query(sql3,(err,res3) => {

            });

            con.query(sql4,(err,res4) => {

            });


            
            return rest.status(200).json({ DataProjects: res, Message: "Proyecto enviado correctamente", StatusCode: 200 });
           
        });
    } catch (error) {
        console.log(error);
        return rest.status(500).json({ DataProjects: error, Message: "Error en el servidor", StatusCode: 500 });
    }
    // rest.send("Todo ok");
};

const getLastId = async (req, rest) => {
 
    try {
      //  var {DniSolicitante,Solicitante} = req.body;


        var sql = " SELECT (idProyecto+1) AS LastID FROM prueba.proyectos ORDER BY idProyecto DESC LIMIT 1";
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

const listProyectos = async (req, rest) => {
 
    try {
      //  var {DniSolicitante,Solicitante} = req.body;

       

        var sql = " SELECT * FROM prueba.proyectos ";
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
    listProyectos,
    getLastId
}
