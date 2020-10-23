const con = require("./config");

const newProyecto = async (req, rest) => {
  
    try {
        var {IdProyecto,NombreProyecto,
            Direccion,Promotor,Banco} = req.body;

       

        var sql = "INSERT INTO proyectos (IdProyecto,NombreProyecto,Direccion,Promotor,Banco) "+
        "Values(?,?,?,?,?)";
       // console.log(sql);
        const result = await con.query(sql,[IdProyecto,NombreProyecto,Direccion,Promotor,Banco], 
            async (err, res) => {
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
}

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
