const con = require("./config");

const newTasacion = async (req, rest) => {
  
    try {
        var {idTasacion,nombreCliente,dniCliente,nombreConyugue,dniConyugue,tipodeCambio, nombreProyecto,
            direccionProyecto,promotor,banco, departamento, estacionamiento, deposito, valorVenta, moneda,
            valorMetroCuadrado, valorComercial,porcentajeRevision} = req.body;

        var sql = "INSERT INTO tasaciones (idTasacion,nombreCliente,dniCliente,nombreConyugue,dniConyugue,tipodeCambio, nombreProyecto,direccionProyecto,promotor,banco, departamento, estacionamiento, deposito, valorVenta, moneda,valorMetroCuadrado, valorComercial,porcentajeRevision) "+
        "Values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
       console.log(sql);
        const result = await con.query(sql,[idTasacion,nombreCliente,dniCliente,nombreConyugue,dniConyugue,tipodeCambio, nombreProyecto,direccionProyecto,promotor,banco, departamento, estacionamiento, deposito, valorVenta, moneda,valorMetroCuadrado, valorComercial,porcentajeRevision], 
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
    newTasacion,
    listTasaciones
}
