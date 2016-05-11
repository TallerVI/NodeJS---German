
/*
 * GET users listing.
 */

/**GERMAN
 * Private Attributes
 * */
var sequelize		= require ("../app").get("sequelize");
var mesa		= sequelize.import("../models/mesas");

/** 
 * Private Functions 
 * */
var all 			= function(request, response){
	mesa.findAll().then(function(mesa){
		mesa.forEach(function(item){
			item['dataValues'].maquinaestado = "/maquinaestado/" + item['dataValues'].maquinaestadoid;
			delete item['dataValues'].maquinaestadoid;
		})
		response.jsonp(mesa);
	});
};
var findById 		= function(request, response){
	mesa.findAll({
		where : {
			mesaid :  request.params.mesaid 
		}
	}).then(function(mesa){
		mesa.forEach(function(item){
			item['dataValues'].maquinaestado = "/maquinaestado/" + item['dataValues'].maquinaestadoid;
			delete item['dataValues'].maquinaestadoid;
		})
		response.jsonp(mesa);
	});
};
var create 			= function(request, response){
	sequelize.transaction(function(transaction){
		return Promise.all([
		     mesa.create({ 
		    	 descripcion : request.body.descripcion,
		    	 maquinaestadoid : request.body.maquinaestadoid
		     }, {transaction : transaction})
		]);
	}).then(function(mesa){
		mesa.forEach(function(item){
			item['dataValues'].maquinaestado = "/maquinaestado/" + item['dataValues'].maquinaestadoid;
			delete item['dataValues'].maquinaestadoid;
		})
		response.jsonp(mesa);
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