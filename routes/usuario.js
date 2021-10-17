var express = require ("express")
var bcrypt = require('bcrypt');
var app = express();
var Usuario = require('../models/usuario')
var mdAutenticacion = require('../middlewares/autenticacion');

//==============================
//Obtener todos los usuarios
//==============================

app.get("/", (req, res, next)=>{
    
    Usuario.find({}, 'name email img rol')
    .exec(
        (err, usuarios)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                mensaje:'Error cargando usuario',
                errors:err
            });
        }
        res.status(200).json({
            ok:true,
            usuarios:usuarios
        });
    })
    
    
});

//======================================
//Crea un nuevo usuario
//=======================================
app.post('/', mdAutenticacion.verificaToken, (req, res)=>{
   var body = req.body;

   var usuario = new Usuario({
        nombre:body.nombre,
        email:body.email,
        password:bcrypt.hashSync(body.password, 10),
        img: body.img,
        rol: body.rol
   });

   usuario.save((err, usuarioGuardado)=>{
       if (err){
           return res.status(400).json({
               ok:false,
               mensaje:'error al crear usuario',
               errors:err
           });
       }
       res.status(201).json({
        ok:true,
        usuario:usuarioGuardado,
        usuariotoken: req.usuario
    });
   })

   
});

//======================================
//Modifica un usuario
//=======================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }


        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.rol = body.rol;

        usuario.save((err, usuarioGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = ':)';

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });

        });

    });

});

app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id
    var body = req.body

    Usuario.findByIdAndDelete(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar usuario',
                errors: err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                //mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }
        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });
    });

})


module.exports = app;