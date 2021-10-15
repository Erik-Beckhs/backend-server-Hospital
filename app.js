//Requires
var express = require("express");
var mongoose = require("mongoose");

//Inicializar variables
var app = express();

//conexion a la bd
mongoose.connection.openUri("mongodb://localhost:27017/hospitalDB", (err, res)=>{
 if(err) throw err;
 console.log('Base de datos: online');
})

//escuchar peticiones
app.listen(4000, ()=>{
    console.log("Express server ejecutandose en el puerto 4000", " online");
})

//rutas
app.get("/", (req, res, next)=>{
    res.status(201).json({
        ok:true,
        mensaje:'Ejecucion exitosa'
    });
});