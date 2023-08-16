//declaraciones y configuraciones iniciales

const express = require('express');
const mysql = require('mysql');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));
morgan(':method :url :status :res[content-length] - :response-time ms');
//fin de declaraciones

//coneccion a base de datos

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'admin',
    database : 'Backend'
});
connection.connect((err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log("Base de datos conectada");
    }
});


//Funciones a fin persona
app.get('/api/persona', (req,res)=>{
    let $query = 'SELECT * FROM `Backend`.persona';
    connection.query($query, function(err, rows) {
        if(err){
            res.send(err);
            return;}
            res.send(rows);
    });
});

app.post('/api/persona', (req,res)=>{
    let $query = 'INSERT INTO persona (dni, nombre, apellido) VALUES (?, ?, ?) ';
    let insertar_persona = [req.body.dni, req.body.nombre, req.body.apellido];
    connection.query($query,insertar_persona, function(err, rows) {
        if(err){
            res.status(500).send({
                message:"Error del servidor",
                detail: err 
            });
            return;
        }else
            res.send("Se creo la persona " +  req.body.nombre + "con apellido " + req.body.apellido);
            });
    });

app.put('/api/persona', (req,res)=>{
    let $query = 'UPDATE persona set dni = ?, nombre = ?, apellido = ? WHERE dni = ?';
    let insertar_persona = [req.body.dni, req.body.nombre, req.body.apellido,req.body.dni];
    connection.query($query,insertar_persona, function(err, rows) {
        if(err){
            res.status(500).send({
                message:"Error del servidor",
                detail: err 
            });
        return;
        }else
            res.send (`Se modifico la persona ${req.body.nombre} `);
            });
    });

app.delete('/api/persona', (req,res)=>{
    let $query = 'DELETE FROM persona WHERE dni = ?';  
    let insertar_persona = [req.body.dni];
    connection.query($query, insertar_persona, function(err, rows) {
        if(rows?.affectedRows == 0){
        return res.status(404).send({
            message:"UPS, ocurrio algo inesperado... intentelo de nuevo"})}
        return res.send({
            message:"Se elimino la persona " + req.body.dni
        });
    }
)});       

//Funciones a fin usuario

app.get('/api/usuario', (req,res)=>{
    let $query = 'SELECT * FROM `Backend`.usuario';
    connection.query($query, function(err, rows) {
        if(err){
            res.send(err);
        return;
        }
        res.send(rows);
    });
});

app.post('/api/usuario', (req,res)=>{
    let $query = 'INSERT INTO usuario (mail, nickname, password) VALUES (?, ?, ?) ';
    let insertar_usuario = [req.body.mail, req.body.nickname, req.body.password];
    connection.query($query,insertar_usuario, function(err, rows) {
        if(err){
            res.status(500).send(
            {
                message:"Error del servidor",
                detail: err } 
            );
        return;
        }else
            res.send("Se creo el usuario " +  req.body.nickname + " con el email " + req.body.email);
        });
    });

app.put('/api/usuario', (req,res)=>{
    let $query = 'UPDATE usuario set mail = ?, nickname = ?, password = ? WHERE mail = ?';
    let insertar_usuario = [req.body.mail, req.body.nickname, req.body.password,req.body.mail];
    connection.query($query,insertar_usuario, function(err, rows) {
        if(err){
            res.status(500).send({
                message:"UPS, acaba de ocurrir algo inesperado, intentelo de nuevo",
                detail: err 
            } );
        return;
        }else
            res.send (`Se modifico el usuario ${req.body.nickname} `);
        });
    });

app.delete('/api/usuario', (req,res)=>{
    let $query = 'DELETE FROM usuario WHERE mail = ?';  
    let insertar_usuario = [req.body.mail];
    connection.query($query, insertar_usuario, function(err, rows) {
        if(rows?.affectedRows == 0){
            return res.status(404).send({
            })}
            return res.send({
            message:"Se elimino la persona " + req.body.usuario + "Con mail..." + req.body.mail
            });
        }
    )});

// algoritmo de ruta y ruta

connection.connect((err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log("Base de datos conectada")
    }
});

app.listen(8080, (err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log("Servidor escuchando en el puesto 8080");
    }
});