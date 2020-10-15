const express = require("express");
const apis = express.Router();
const apiProyectos = require("./api/proyectos");
let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};
apis.use(allowCrossDomain);
// const jwt = require("jsonwebtoken");

apis.use(async (req, res, next) => {
  //var nextApi = false;
 // console.log(req);
  next();
  /*
  var nextApi = true;
  if (req.url.includes("/usuarios/") == true || req.url.includes("/notarios/") == true) {
    nextApi = true;
  }
  if (nextApi) {
    next();
  } else {
    var token;
    if (req.headers.authorization)
      token = req.headers.authorization.replace("Bearer ", "");
    else return res.status(401).json({ message: "No Autorizado", uri: req.url });
    jwt.verify(token, process.env.llavejwt, function (err, decoded) {
      if (err) {
        return res.status(401).json({ err });
      } else {
        next();
      }
    });
  }*/
});


apis.use("/proyectos", apiProyectos);
module.exports = apis;
