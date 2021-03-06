var chalk = require('chalk');
module.exports = function(io, Alumno){
//Codigo para conectar a base de datos Mongo
	var mongoose = require('../../app/models/dbConnection');

	//Se instancia el modelo de deposito
	var Deposito = require('../../app/models/deposito');

	//Codigo para declarar un router
	var express = require('express');
	var router = express.Router();

	/* GET api listing. */
	//GET localhost:8000/api/Depositos
	router.route("/Depositos")
		.get(function(req,res){
			Deposito.find().populate('_alumno').exec(function(err,depositos){
				if(err){res.send(err);}
				else{
					console.log(depositos)
					res.json(depositos);
				}
			});
	});

	//POST localhost:3000/api/Depositos
	router.route("/Depositos")
		.post(function(req,res){
			var nuevoDeposito = new Deposito({
				monto:req.body.monto,
				fecha:req.body.fecha,
				_alumno:req.body._alumno,
			});
			nuevoDeposito.save(function(err){
				if(err){res.send(err);}
				else{
					console.log("Se dio de alta deposito");
					io.sockets.emit('pagoCreado',nuevoDeposito);
					Alumno.findById(nuevoDeposito._alumno, function(err,alumno){
	                    if (err){console.log('error buscar alumno');res.send(err);}
	                    else{
	                        //Se hace la relacion deposito-alumno
	                        alumno._depositos.push(nuevoDeposito);
	                        alumno.save(function(err){
	                            if(err){console.log('error guardar cambios alumno');res.send(err);}
	                            else{
	                                console.log(chalk.green('depositoCreado'));
	                                console.log(chalk.green(nuevoDeposito));
	                                nuevoDeposito._alumno = Deposito;
	                                io.sockets.emit('depositoCreado',nuevoDeposito);
	                                res.json(nuevoDeposito);
	                            }
	                        });
	                    }
	                });
				}
			});
			
	});

	//DELETE localhost:3000/api/Depositos
	router.route("/Depositos/:id")
		.delete(function(req,res){
			var id = req.params.id;
			Deposito.findOne({_id:id}).remove(function(err,data){
				if(err){res.send(err);}
				else{
					res.json(data);
				}
			});
	});

	//GET localhost:3000/api/Depositos
	router.route("/Depositos/:id")
		.get(function(req,res){
			var id = req.params.id;
			Deposito.findById(id,function(err,deposito){
				if(err){res.send(err);}
				else{
					res.json(Deposito);
				}
			});
	});

	//PUT localhost:3000/api/Depositos
	router.route("/Depositos/")
		.put(function(req,res){
			var id = req.body._id;
			Deposito.findById(id,function(err,deposito){
				if(err){res.send(err);}
				else{
					deposito.monto = req.body.monto;
					deposito.fecha = req.body.fecha;
					deposito.save(function(err){
						if(err){res.send(err);}
						else{
							res.json(deposito);
						}
						
					});
				}
			});
	});

	// POST /api/Depositos/buscar
    /*
    * Buscador por fechas
    */
    router.route('/Depositos/buscar')
    .post(function(req, res) {
    	console.log("tambien llego");
        //var regexNombre = new RegExp(req.body.Nombre,'i');
        var inicio = new Date(req.body.inicio);
        var final = new Date(req.body.final);
        console.log(chalk.blue('Inicio:')+chalk.red(inicio));
        console.log(chalk.blue('Final:')+chalk.red(final));


        //Listado de todas las Alumnos
        /*Alumno.find({
            $and:[
                {_carrera:req.body._carrera?req.body._carrera:{$ne:null}},
                {_grupo:req.body._grupo?req.body._grupo:{$ne:null}},
                {$or:[
                    {ApellidoM:regexNombre},
                    {ApellidoP:regexNombre},
                    {Nombre:regexNombre},
                ]}
            ]
        })*/
        Deposito.find({ 
        	createdAt: { $gte:inicio, $lt:final } })
        .populate("_alumno")
        .exec(function(err,Depositos) {
            if (err){console.log(chalk.red('Error: '+err));res.send(err);}
            else{
            	console.log(Depositos)
                res.json(Depositos);
            }
        });
    });

	return router;
};