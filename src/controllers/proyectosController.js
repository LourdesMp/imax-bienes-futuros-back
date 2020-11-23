const con = require("./config");
const multer = require ('multer');
const path = require ('path')
let fs = require('fs');
const { json } = require("express");



const newProyecto =  (req, rest)=> {
    // upload.single('file');
     console.log('hola', req.body);
    try {
        var  {idProyecto,nombreProyecto, promotor,banco} = req.body;
        var nombreData = 'data-'+idProyecto + '.' + req.files.data[0].originalname.split('.').pop();
            var nombreTasacion = 'tasacion-'+idProyecto  + '.' + req.files.tasacion[0].originalname.split('.').pop();
        var data =  'D:\\imax\\imax-bienes-futuros-back\\uploads\\'+nombreData ;
             var tasacion = 'D:\\imax\\imax-bienes-futuros-back\\uploads\\' + nombreTasacion;
     
       
   
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
            var sql4 = ' CREATE TABLE matriz( unidad VARCHAR(255), num INT, nivel FLOAT, dni INT, nombre VARCHAR(255), terreno FLOAT, ocupada FLOAT, techada FLOAT, comunes FLOAT, moneda VARCHAR(100) , valor FLOAT, terrenousd FLOAT, edifusd FLOAT, comercialusd FLOAT, realizadausd FLOAT, aseguradausd FLOAT, tipocambio FLOAT, fecha DATE, clase VARCHAR(100), vueusd FLOAT, tipo VARCHAR(100), descripción VARCHAR(255));';
            var sql3 = ' CREATE TABLE tasacion( unidad VARCHAR(255), num INT, nivel FLOAT, dni VARCHAR(50), nombre VARCHAR(255), terreno FLOAT, ocupada FLOAT, techada FLOAT, comunes FLOAT, moneda VARCHAR(100) , valor FLOAT, terrenousd FLOAT, edifusd FLOAT, comercialusd FLOAT, realizadausd FLOAT, aseguradausd FLOAT, tipocambio FLOAT, fecha DATE, clase VARCHAR(100), vueusd FLOAT, tipo VARCHAR(100), descripción VARCHAR(255));';
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

        var sql = " SELECT IF(MAX(idProyecto) IS NULL,1,MAX(idProyecto)+1)  AS LastID FROM prueba.proyectos  ";
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


const matrizUpdate = async (req, rest) => {
    let dataFile = '';
    let archivo = fs.readFileSync('./json/matrixjson.json', 'utf-8');
    matrizJson = JSON.parse(archivo);

    matrizJson = matrizJson.DataProjects;
    nombredb = matrizJson.database;

    for(let i in matrizJson){
        let unidad = matrizJson[i].unidad; 
        let num = matrizJson[i].num;
        let nivel = matrizJson[i].nivel;
        let dni = matrizJson[i].dni;
        let nombre = matrizJson[i].nombre;
        let terreno= matrizJson[i].terreno;
        let ocupada =matrizJson[i].ocupada;
        let techada =matrizJson[i].techada;
        let comunes =matrizJson[i].comunes;
        let moneda =matrizJson[i].moneda;
        let valor = matrizJson[i].valor;
        let terrenousd= matrizJson[i].terrenousd;
        let edifusd = matrizJson[i].edifusd;
        let comercialusd = matrizJson[i].comercialusd;
        let realizadausd = matrizJson[i].realizadausd; 
        let aseguradausd = matrizJson[i].aseguradausd;
        let tipocambio = matrizJson[i].tipocambio; 
        let fecha = matrizJson[i].fecha;
        let clase = matrizJson[i].clase;
        let vueusd = matrizJson[i].vueusd; 
        let tipo = matrizJson[i].tipo; 
        let descripción = matrizJson[i].descripción;

        let sql = "INSERT INTO db_11.matriz(unidad, num, nivel, dni, nombre, terreno, ocupada, techada, comunes, moneda, valor, terrenousd, edifusd, comercialusd, realizadausd, aseguradausd, tipocambio, fecha, clase, vueusd, tipo, descripción)" + "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        const result = await con.query(sql,[unidad, num, nivel, dni, nombre, terreno, ocupada, techada, comunes, moneda, valor, terrenousd, edifusd, comercialusd, realizadausd, aseguradausd, tipocambio, fecha, clase, vueusd, tipo, descripción], async (err, res) => {
            if (err) {
                console.log(err);
             
            }


        });
    }
    return rest.status(200).json({ DataProjects: matrizJson, Message: "", StatusCode: 200 });
    //   console.log(dataFile);
    //   matrizJson = JSON.parse(dataFile);
    
      /*
      dataJson = dataJson.DataProjects;
      for(let i in dataJson){
        console.log(dataJson[i].num);
      }*/
}

const tasacionesUpdate = async (req, rest) => {
    let dataFile = '';
    let archivo = fs.readFileSync('./json/tasaciones.json', 'utf-8');
    tasacionesJson = JSON.parse(archivo);

    tasacionesJson = tasacionesJson.DataProjects;
    nombredb = tasacionesJson.database;

    for(let i in tasacionesJson){
        let unidad = tasacionesJson[i].unidad; 
        let num = tasacionesJson[i].num;
        let nivel = tasacionesJson[i].nivel;
        let dni = tasacionesJson[i].dni;
        let nombre = tasacionesJson[i].nombre;
        let terreno= tasacionesJson[i].terreno;
        let ocupada =tasacionesJson[i].ocupada;
        let techada =tasacionesJson[i].techada;
        let comunes =tasacionesJson[i].comunes;
        let moneda =tasacionesJson[i].moneda;
        let valor = tasacionesJson[i].valor;
        let terrenousd= tasacionesJson[i].terrenousd;
        let edifusd = tasacionesJson[i].edifusd;
        let comercialusd = tasacionesJson[i].comercialusd;
        let realizadausd = tasacionesJson[i].realizadausd; 
        let aseguradausd = tasacionesJson[i].aseguradausd;
        let tipocambio = tasacionesJson[i].tipocambio; 
        let fecha = tasacionesJson[i].fecha;
        let clase = tasacionesJson[i].clase;
        let vueusd = tasacionesJson[i].vueusd; 
        let tipo = tasacionesJson[i].tipo; 
        let descripción = tasacionesJson[i].descripción;

        let sql = "INSERT INTO db_11.tasacion(unidad, num, nivel, dni, nombre, terreno, ocupada, techada, comunes, moneda, valor, terrenousd, edifusd, comercialusd, realizadausd, aseguradausd, tipocambio, fecha, clase, vueusd, tipo, descripción)" + "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        const result = await con.query(sql,[unidad, num, nivel, dni, nombre, terreno, ocupada, techada, comunes, moneda, valor, terrenousd, edifusd, comercialusd, realizadausd, aseguradausd, tipocambio, fecha, clase, vueusd, tipo, descripción], async (err, res) => {
            if (err) {
                console.log(err);
             
            }


        });
    }
    return rest.status(200).json({ DataProjects: tasacionesJson, Message: "", StatusCode: 200 });
    //   console.log(dataFile);
    //   dataJson = JSON.parse(dataFile);
    
      /*
      dataJson = dataJson.DataProjects;
      for(let i in dataJson){
        console.log(dataJson[i].num);
      }*/
}

module.exports = {
    newProyecto,
    listProyectos,
    getLastId,
    matrizUpdate,
    tasacionesUpdate
}
