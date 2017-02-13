module.exports = function(io){
	var mongoose = require('../../app/models/dbConnection');

	//Se importa el modelo
	var Grupo = require('../../app/models/grupo');
	var router = require('express').Router();
	/*
	// middleware to use for all requests
	router.use(function(req, res, next) {
	    // do logging
	    console.log('Something is happening.');
	    next(); // make sure we go to the next routes and don't stop here
	});*/

    // POST /api/grupo
    /*
    * Registra un nuevo objeto de esta entidad
    */
    router.route('/Grupo')
    .post(function(req, res) {
        // create a new instance of the carrera model
        var nuevoGrupo = new Grupo({
            nombre:req.body.nombre,
        });
        
        // save the Carrera and check for errors
        nuevoGrupo.save(function(err) {
            if (err){
                console.log('Error');
                res.send(err);
            }else{
                console.log('DONE!');
                io.sockets.emit('grupoCreado',nuevoGrupo);
                res.json(nuevoGrupo);
            }
        });
    });

    // GET /api/grupo
    /*
    * Entrega un listado completo de todos los registros
    */
    router.route('/Grupo')
    .get(function(req, res) {

        //Listado de todas las carreras
        Grupo.find(function(err,grupos) {
            if (err){
                console.log('Error');
                res.send(err);
            }else{
                console.log('DONE!');
                res.json(grupos);
            }
        });
        
    });

    // GET /api/grupo/:id
    /*
    * Entrega un listado completo de todos los registros
    */
    router.route('/Grupo/:id')
    .get(function(req, res) {
        var id = req.params.id;
        //Listado de todas las carreras
        Grupo.findById(id).populate('_alumnos').exec(function(err,grupo) {
            if (err){
                console.log('Error');
                res.send(err);
            }else{
                console.log('DONE!');
                res.json(grupo);
            }
        });
        
    });

    // DELETE /api/grupo/:id
    /*
    * Entrega un listado completo de todos los registros
    */
    router.route('/Grupo/:id')
    .delete(function(req, res) {
        var id = req.params.id;
        //Listado de todas las carreras
        Grupo.findById(id)
        .remove(function(err,data) {
            if (err){console.log('Error');res.send(err);}
            else{
                console.log('DONE!');
                res.json(data);
            }
        });
        
    });
    return {router:router,model:Grupo};
};