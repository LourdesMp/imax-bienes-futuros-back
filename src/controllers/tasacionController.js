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
                return rest.status(404).json({ DataTasaciones: [], Message: "Error en el servidor", StatusCode: 404 });
            }
            return rest.status(200).json({ DataTasaciones: res, Message: "Proyecto enviado correctamente", StatusCode: 200 });
        });
    } catch (error) {
        console.log(error);
        return rest.status(500).json({ DataTasaciones: error, Message: "Error en el servidor", StatusCode: 500 });
    }
}

const listTasaciones = async (req, rest) => {
 
    try {
      //  var {DniSolicitante,Solicitante} = req.body;

       

        var sql = " SELECT * FROM tasaciones ";
       // console.log(sql);
        const result = await con.query(sql, async (err, res) => {
            if (err) {
                console.log(err);
                return rest.status(404).json({ DataTasaciones: [], Message: "Error en el servidor", StatusCode: 404 });
            }
            return rest.status(200).json({ DataTasaciones: res, Message: "", StatusCode: 200 });
        });
    } catch (error) {
        console.log(error);
        return rest.status(500).json({ DataTasaciones: error, Message: "Error en el servidor", StatusCode: 500 });
    }
}

module.exports = {
    newProyecto,
    listTasaciones
}
