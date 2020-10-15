const con = require("./config");

const createExpediente = async (req, rest) => {
  
    try {
        var {IdTipoTramite,AsuntoSolicitud,
            IdTipoDocumentoSolicitante,NumeroDocumentoSolicitante,
        Contenido,Direccion,Correo,Celular,Nombres,Apellidos} = req.body;

       

        var sql = "INSERT INTO expediente(IdTipoTramite,AsuntoSolicitud,IdTipoDocumentoSolicitante,"+
        "NumeroDocumentoSolicitante,Contenido,Direccion,Correo,Celular,Apellidos,Nombres) "+
        "Values(?,?,?,?,?,?,?,?,?,?)";
       // console.log(sql);
        const result = await con.query(sql,[IdTipoTramite,
            AsuntoSolicitud,IdTipoDocumentoSolicitante,
            NumeroDocumentoSolicitante,Contenido,Direccion,
            Correo,Celular,Apellidos,Nombres], async (err, res) => {
            if (err) {
                console.log(err);
                return rest.status(404).json({ Data: [], Message: "Error en el servidor", StatusCode: 404 });
            }
            return rest.status(200).json({ Data: res, Message: "Expediente enviado correctamente", StatusCode: 200 });
        });
    } catch (error) {
        console.log(error);
        return rest.status(500).json({ Data: error, Message: "Error en el servidor", StatusCode: 500 });
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
                return rest.status(404).json({ Data: [], Message: "Error en el servidor", StatusCode: 404 });
            }
            return rest.status(200).json({ Data: res, Message: "", StatusCode: 200 });
        });
    } catch (error) {
        console.log(error);
        return rest.status(500).json({ Data: error, Message: "Error en el servidor", StatusCode: 500 });
    }
}

module.exports = {
    createExpediente,
    listProyectos
}
