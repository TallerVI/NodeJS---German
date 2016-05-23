
/*
 * GET users listing.
 */

 /**
 * Articulos Propiedades
 * articuloid 
 * descripcion NOTNULL
 * fechacreacion TIMESTAMP
 * maquinaestadoid NOTNULL
 * tipoarticuloid NOTNULL
 */

/**GERMAN
 * Private Attributes
 * */
var sequelize		= require ("../app").get("sequelize");
var articulo		= sequelize.import("../models/articulos");

/** 
 * Private Functions 
 * */
var all 			= function(request, response){
	articulo.findAll().then(function(articulos){
		if(articulos.length == 0){
			response.status(400).send({ error : 'Recursos no encontrados' });
		} else {
			articulos.forEach(function(articulo){
				articulo['dataValues'].maquinaestado = "/maquinaestado/" + articulo['dataValues'].maquinaestadoid;
				articulo['dataValues'].tipoarticulo = "/funcion/" + articulo['dataValues'].tipoarticuloid;
				delete articulo['dataValues'].maquinaestadoid;
				delete articulo['dataValues'].tipoarticuloid;
			});
			response.status(200).jsonp(articulos);	
		}
	});
};

var findById 		= function(request, response){
	articulo.findById(request.params.articuloid).then(function(articulo){
		if(articulo == null){
			response.status(400).send({ error : 'Recurso no encontrado' });
		} else {
			articulo['dataValues'].maquinaestado = "/maquinaestado/" + articulo['dataValues'].maquinaestadoid;
			articulo['dataValues'].tipoarticulo = "/funcion/" + articulo['dataValues'].tipoarticuloid;
			delete articulo['dataValues'].maquinaestadoid;
			delete articulo['dataValues'].tipoarticuloid;
			response.status(200).send(articulo);	
		}
	});
};

var create 			= function(request, response){
	var a = request.body;
	sequelize.transaction(function(transaction){	
		return Promise.all([
	    articulo.create({ 
	    	descripcion : a.descripcion,
	    	maquinaestadoid : a.maquinaestadoid,
	    	tipoarticuloid : a.tipoarticuloid,
	    	precio : a.precio
	     	}, {transaction : transaction})
		]);
	}).then(function(articulos){
		if(articulos.length == 0){
			response.status(500).send({ error : 'Recurso no creado' });
		} else {
			var articulo = articulos.pop();
			articulo['dataValues'].maquinaestado = "/maquinaestado/" + articulo['dataValues'].estadmaquinaestadoid;
			articulo['dataValues'].tipoarticulo = "/funcion/" + articulo['dataValues'].tipoarticuloid;
			delete articulo['dataValues'].estadmaquinaestadoid;
			delete articulo['dataValues'].tipoarticuloid;
			response.status(200).jsonp(articulo);	
		}
	}).catch(function(error){
		response.status(500).send({response : error});
	});
};
var updateAll 		= function(request, response){
	var a = request.body;
	sequelize.transaction(
	).then(function(transaction){
		articulo.update({ 
		    	descripcion : a.descripcion,
		    	maquinaestadoid : a.maquinaestadoid,
		    	tipoarticuloid : a.tipoarticuloid,
		    	precio : a.precio
	     	},
			{ where : { articuloid : request.body.articuloid } }, 
			{ transaction : transaction }
		).then(function( rowUpdated ){
			if(rowUpdated.pop() == 0){
				transaction.rollback();
				response.status(500).jsonp({ response : "No se ha podido actualizar articulo" });
			} else {
				transaction.commit();
				articulo.findById(request.body.articuloid).then(function(articulo){
					articulo['dataValues'].estado = "/estado/" + articulo['dataValues'].estadoid;
					articulo['dataValues'].funcion = "/funcion/" + articulo['dataValues'].funcionid;
					delete articulo['dataValues'].estadoid;
					delete articulo['dataValues'].funcionid;
					response.status(200).jsonp(articulo);
				});
			}
		});
	}).catch(function(error){
		response.status(500).jsonp(error);
	});
};
var updatePart 		= function(request, response){
	response.status(500).jsonp({ response : "Implementar updatePart" });
};
var deleteById 		= function(request, response){
	sequelize.transaction(
	).then(function(transaction){
		articulo.destroy(
			{ where : { articuloid : request.params.articuloid }, transaction : transaction }
		).then(function( rowdeleted ){
			if( rowdeleted == 0 ){
				transaction.rollback();
				response.status(500).jsonp({ response : "No se ha podido eliminar el articulo" });
			} else {
				transaction.commit();
				response.status(200).jsonp([{ articulo : "/articulo/" + request.params.articuloid }]);
			}
		});
	}).catch(function(error){
		response.status(500).jsonp(error);
	});
};

/**
 * Export functions
 * 
 */
exports.all 		= all;
exports.findById 	= findById;
exports.create 		= create;
exports.updateAll 	= updateAll;
exports.updatePart 	= updatePart;
exports.deleteById 	= deleteById;