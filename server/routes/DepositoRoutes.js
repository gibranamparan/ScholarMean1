module.exports = function(io){
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
			Deposito.find().populate('_alumnoID').exec(function(err,depositos){
				if(err){res.send(err);}
				else{
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
					res.json(nuevoDeposito);
				}
			})
			
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
							res.json(deposito)
						}
						
					});
				}
			});
	});

	return router;
};