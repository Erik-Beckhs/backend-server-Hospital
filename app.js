//Requires
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser")

//importar rutas
var appRoutes = require ("./routes/app")
var usuarioRoutes = require ("./routes/usuario");
var loginRoutes = require ("./routes/login");
const { urlencoded } = require("body-parser");

//Inicializar variables
var app = express();

//Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//conexion a la bd
mongoose.connection.openUri("mongodb://localhost:27017/hospitalDB", (err, res)=>{
 if(err) throw err;
 console.log('Base de datos: online');
})

//escuchar peticiones
app.listen(4000, ()=>{
    console.log("Express server ejecutandose en el puerto 4000", " online");
})

//Rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);
