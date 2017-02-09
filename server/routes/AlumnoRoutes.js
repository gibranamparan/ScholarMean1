module.exports = function(io,Carrera,Grupo){
    var mongoose = require('../../app/models/dbConnection');
    //Se importa el modelo
    var Alumno = require('../../app/models/Alumno');

    var router = require('express').Router();
    
    // middleware to use for all requests
    router.use(function(req, res, next) {
        // do logging
        console.log('Something is happening.');
        next(); // make sure we go to the next routes and don't stop here
    });

    // POST /api/Alumno
    /*
    * Registra un nuevo objeto de esta entidad
    */
    router.route('/Alumno')
    .post(function(req, res) {
        // create a new instance of the Alumno model
        var nuevaAlumno = new Alumno({
            Nombre:req.body.Nombre,
            ApellidoP:req.body.ApellidoP,
            ApellidoM:req.body.ApellidoM,
            FechaNac:req.body.FechaNac,
            _carrera: req.body._carrera
        });
        console.log(nuevaAlumno);
        // save the Alumno and check for errors
        nuevaAlumno.save(function(err) {
            if (err){console.log('error guardar alumno');res.send(err);}
            else
                //Si el nuevo alumno es reogistrado, se relaciona con su carrera
                Carrera.findById(nuevaAlumno._carrera,
                function(err,carrera){
                    if (err){console.log('error buscar carrera');res.send(err);}
                    else{
                        //Se hace la relacion alumno-carrera
                        carrera._alumnos.push(nuevaAlumno);
                        carrera.save(function(err){
                            if(err){console.log('error guardar cambios carrera');res.send(err);}
                            else{
                                console.log('alumno guardado');
                                nuevaAlumno._carrera = carrera;
                                io.sockets.emit('AlumnoCreado',nuevaAlumno);
                                res.json(nuevaAlumno);
                            }
                        });
                    }
                });
        });
    });

    // PUT /api/Alumno
    /*
    * Edita un objeto de esta entidad
    */
    router.route('/Alumno')
    .put(function(req, res) {
        // Busca instancia existente en la base de datos
        Alumno.findById(req.body._id,function(err,alumno){
            alumno.nombre = req.body.nombre;
            alumno.abreviacion = req.body.abreviacion;
            // save the Alumno and check for errors
            alumno.save(function(err) {
                if (err){
                    console.log('Error');
                    res.send(err);
                }else{
                    console.log('DONE!');
                    io.sockets.emit('AlumnoEditada',alumno);
                    res.json(Alumno);
                }
            });
        });
    });

    // GET /api/Alumno
    /*
    * Entrega un listado completo de todos los registros
    */
    router.route('/Alumno')
    .get(function(req, res) {

        //Listado de todas las Alumnos
        Alumno.find().populate("_carrera").exec(function(err,Alumnos) {
            if (err){
                console.log('Error');
                res.send(err);
            }else{
                console.log('DONE!');
                res.json(Alumnos);
            }
        });
        
    });

    // DELETE /api/Alumno:id
    /*
    * Elimina el registro identificado por el ID indicado
    */
    router.route('/Alumno/:id')
    .delete(function(req, res) {
        var id = req.params.id;
        console.log("id: "+id);
        //Listado de todas las Alumnos
        Alumno.findOne({_id:id}).remove().exec(function(err,data) {
            if (err){
                console.log('Error');
                res.send(err);
            }else{
                console.log('DONE!: '+data);
                io.sockets.emit('AlumnoEliminada',id);
                res.json(data);
            }
        });
        
    });

    // GET /api/Alumno:id
    /*
    * Entrega toda la informacion concreta dado
    * un ID sobre un registro especifico de esta entidad
    */
    router.route('/Alumno/:id')
    .get(function(req, res) {
        var id = req.params.id;
        console.log("Get alumno by id: "+id);
        //Listado de todas las Alumnos
        Alumno.findOne({_id:id})
        .populate("_carrera")
        .exec(function(err,Alumnos) {
            if (err){
                console.log('Error');
                res.send(err);
            }else{
                console.log('DONE!');
                res.json(Alumnos);
            }
        });
    });


    return router;
};