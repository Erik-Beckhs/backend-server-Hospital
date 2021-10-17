var express = require ("express")
var bcrypt = require('bcrypt');
var app = express();
var Usuario = require('../models/usuario')
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

app.post('/', (req, res)=>{

    var body=req.body

    Usuario.findOne({email:body.email}, (err, usuarioDB)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }
        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales no validas - email',
                errors: err
            }); 
        }
        if(!bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales no validas - password',
                errors: err
            }); 
        }

        //Crear un token 
        usuarioDB.password = ':)'
         var token = jwt.sign ({usuario:usuarioDB}, SEED , {expiresIn:14400}) //4 horas

        res.status(200).json({
            ok:true,
            usuario:usuarioDB,
            id:usuarioDB._id,
            token:token
        });

    } )

    
})

module.exports = app;