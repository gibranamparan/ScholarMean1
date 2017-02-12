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
            //Si el nuevo alumno es registrado, se relaciona con su carrera
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
        Alumno.findById(req.body._id,function(err,alumnoEditado){
            //Se registran los nuevos valores de los atributos de la entidad
            alumnoEditado.Nombre=req.body.Nombre;
            alumnoEditado.ApellidoP=req.body.ApellidoP;
            alumnoEditado.ApellidoM=req.body.ApellidoM;
            alumnoEditado.FechaNac=req.body.FechaNac;
            var tempCarreraID = alumnoEditado._carrera;
            alumnoEditado._carrera= req.body._carrera;

            // save the Alumno and check for errors
            alumnoEditado.save(function(err) {
                if (err){
                    console.log('Error');
                    res.send(err);
                }else{
                    io.sockets.emit('AlumnoEditado',alumnoEditado);
                    console.log('DONE!');
                    if(tempCarreraID!=alumnoEditado._carrera){
                        //Si el nuevo alumno es reogistrado, se relaciona con su carrera
                        Carrera.findById(alumnoEditado._carrera,
                        function(err,carrera){
                            if (err){console.log('error buscar carrera');res.send(err);}
                            else{
                                //Se hace la relacion alumno-carrera
                                carrera._alumnos.push(alumnoEditado);
                                carrera.save(function(err){
                                    if(err){console.log('error guardar cambios carrera');res.send(err);}
                                    else console.log('alumno asociado a su nueva carrera'); 
                                });
                            }
                        });
                    }
                    res.json(alumnoEditado);
                }
            });
        });
    });

    // GET /api/Alumno/:soloPreinscritos
    /*
    * Entrega un listado completo de todos los registros
    */
    router.route('/Alumno/')
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

    // GET /api/Alumno/:soloPreinscritos
    /*
    * Entrega un listado completo de todos los registros
    */
    router.route('/Alumno/soloPreinscritos')
    .get(function(req, res) {
        var soloPreinscritos = req.params.soloPreinscritos;
        //Listado de todas las Alumnos
        Alumno.find().populate("_carrera").exec(function(err,Alumnos) {
            if(soloPreinscritos)//Filtrar a los que ya tienen grupo
                Alumnos = Alumnos.filter(function(alumno){
                    return !alumno.grupo;
                });

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
            if (err){console.log('Error');res.send(err);}
            else{
                console.log('DONE!: '+data);
                io.sockets.emit('AlumnoEliminado',id);
                res.json({data:data});
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
        //Se busca por ID
        Alumno.findById(id, function(err,alumno) {
            if (err){
                console.log('Error');
                res.send(err);
            }else{
                console.log('DONE!');
                res.json(alumno);
            }
        });
    });

    // GET /api/Alumno:id
    /*
    * Entrega toda la informacion concreta dado
    * un ID sobre un registro especifico de esta entidad
    */
    router.route('/Alumno/registrarAlumno/:id')
    .get(function(req, res) {
        var id = req.params.id;
        //Se busca por ID
        Alumno.findById(id, function(err,alumno) {
            if (err){res.send(err);}
            else{
                Carrera.findById(alumno._carrera)
                .populate('_grupos')
                .exec(function(err,carrera){
                    if (err){console.log('Error');res.send(err);}
                    else{
                        if(carrera._grupos.length===0){ //Si no habia grupos de la carrera
                            //Se crea uno nuevo y se registra el alumno
                            var nuevoGrupo = new Grupo({
                                nombre:carrera.abreviacion+'1-1',
                                _alumnos:[alumno]
                            });
                            //Se asocia el nuevo grupo a su carrera correspondiente
                            nuevoGrupo.save(function(err){ if (err){res.send(err);}
                                carrera._grupos.push(nuevoGrupo._id);
                                carrera.save(function(err){
                                    if (err){res.send(err);}
                                    else{
                                        io.sockets.emit('grupoCreado',nuevoGrupo);
                                        res.json(nuevoGrupo);
                                    }
                                });
                            });
                        }else{
                            //Se busca el primer grupo de la carrera y se asocia el alumno
                            Grupo.findById(carrera._grupos[0]._id,function(err,grupo){
                                grupo._alumnos.push(alumno_id);
                                grupo.save(function(err){
                                    if (err){res.send(err);}
                                    else
                                        res.json(grupo);
                                });
                            });
                        }
                    }
                });
            }
        });
    });


    return router;
};