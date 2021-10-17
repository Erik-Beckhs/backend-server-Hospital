var express = require ("express")
var app = express();

app.get("/", (req, res, next)=>{
    res.status(201).json({
        ok:true,
        mensaje:'Ejecucion exitosa'
    });
});

app.get("/", (req, res, next)=>{
    res.status(201).json({
        ok:true,
        mensaje:'Ejecucion exitosa'
    });
});

module.exports = app;