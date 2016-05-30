
/*
 * GET users listing.
 */

/**GERMAN
 * Private Attributes
 * */
var sequelize		= require ("../app").get("sequelize");
var tipoarticulo		= sequelize.import("../models/tiposarticulo");
var host			= require ("./host");

/** 
 * Private Functions 
 * */
var all 			= function(request, response){
	var h = host.getHost(request, response);
	tipoarticulo.findAll().then(function(tipoarticulos){
		tipoarticulos.forEach(function(tipoarticulo){
			tipoarticulo['dataValues'].articulo = h + "/tipoarticulo/" + tipoarticulo['dataValues'].tipoarticuloid + '/articulo';
		});
		response.jsonp(tipoarticulos);
	});
};
var findById 		= function(request, response){
	var h = host.getHost(request, response);
	tipoarticulo.findAll({
		where : {
			tipoarticuloid :  request.params.tipoarticuloid
		}
	}).then(function(tipoarticulos){
		tipoarticulos.forEach(function(tipoarticulo){
			tipoarticulo['dataValues'].articulo = h + "/tipoarticulo/" + tipoarticulo['dataValues'].tipoarticuloid + '/articulo';
		});
		response.jsonp(tipoarticulos);
	});
};
var create 			= function(request, response){
	var h = host.getHost(request, response);
	var a = request.body;
	if("descripcion" in a && "cocina" in a){
		sequelize.transaction(function(transaction){
			return Promise.all([
			     tipoarticulo.create({ 
			    	 descripcion : request.body.descripcion,
			    	 cocina : request.body.cocina
			     }, {transaction : transaction})
			]);
		}).then(function(tipoarticulo){
			response.jsonp(tipoarticulo);
		}).catch(function(error){
			response.status(500).send({response : error});
		});
	} else {
		response.status(400).send({ error : "Falta uno o algunos de los datos requeridos", datos : a });
	}
};
var updateAll 		= function(request, response){
	var h = host.getHost(request, response);
	sequelize.transaction(
	).then(function(transaction){
		tipoarticulo.update({ 
		    	descripcion : request.body.descripcion,
		    	cocina : request.body.cocina
		    },
			{ where : { tipoarticuloid : request.body.tipoarticuloid } }, 
			{ transaction : transaction }
		).then(function( rowUpdated ){
			if(rowUpdated.pop() == 0){
				transaction.rollback();
				response.status(500).jsonp({ response : "No se ha podido actualizar mesa" });
			} else {
				transaction.commit();
				tipoarticulo.findById(request.body.tipoarticuloid).then(function(tipoarticulo){
					response.status(200).jsonp(mesa);
				});
			}
		});
	}).catch(function(error){
		response.status(500).jsonp(error);
	});
};
var updatePart 		= function(request, response){
	var h = host.getHost(request, response);
	response.status(500).jsonp({ response : "Implementar updatePart" });
};
var deleteById 		= function(request, response){
	var h = host.getHost(request, response);
	sequelize.transaction(
	).then(function(transaction){
		tipoarticulo.destroy(
			{ where : { tipoarticuloid : request.params.tipoarticuloid }, transaction : transaction }
		).then(function( rowdeleted ){
			if( rowdeleted == 0 ){
				transaction.rollback();
				response.status(500).jsonp({ response : "No se ha podido eliminar el tipoarticulo" });
			} else {
				transaction.commit();
				response.status(200).jsonp([{ tipoarticulo : h + "/tipoarticulo/" + request.params.tipoarticuloid }]);
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