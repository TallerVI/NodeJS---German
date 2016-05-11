
/*
 * GET users listing.
 */

/**GERMAN
 * Private Attributes
 * */
var sequelize		= require ("../app").get("sequelize");
var tipoarticulo		= sequelize.import("../models/tiposarticulo");

/** 
 * Private Functions 
 * */
var all 			= function(request, response){
	tipoarticulo.findAll().then(function(tipoarticulo){
		response.jsonp(tipoarticulo);
	});
};
var findById 		= function(request, response){
	tipoarticulo.findAll({
		where : {
			tipoarticuloid :  request.params.tipoarticuloid
		}
	}).then(function(tipoarticulo){
		response.jsonp(tipoarticulo);
	});
};
var create 			= function(request, response){
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
		//response.set_status(400);
		response.jsonp(error);
	});
};

/**
 * Export functions
 * 
 */
exports.all 		= all;
exports.findById 	= findById;
exports.create 		= create;