
/*
 * GET users listing.
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
	articulo.findAll().then(function(articulo){
		articulo.forEach(function(item){
			item['dataValues'].maquinaestado = "/maquinaestado/" + item['dataValues'].maquinaestadoid;
			item['dataValues'].tipoarticulo = "/tipoarticulo/" + item['dataValues'].tipoarticuloid;
			delete item['dataValues'].maquinaestadoid;
			delete item['dataValues'].tipoarticuloid;
		})
		response.jsonp(articulo);
	});
};
var findById 		= function(request, response){
	articulo.findAll({
		where : {
			articuloid :  request.params.articuloid
		}
	}).then(function(articulo){
		articulo.forEach(function(item){
			item['dataValues'].maquinaestado = "/maquinaestado/" + item['dataValues'].maquinaestadoid;
			item['dataValues'].tipoarticulo = "/tipoarticulo/" + item['dataValues'].tipoarticuloid;
			delete item['dataValues'].maquinaestadoid;
			delete item['dataValues'].tipoarticuloid;
		})
		response.jsonp(articulo);
	});
};
var create 			= function(request, response){
	sequelize.transaction(function(transaction){
		return Promise.all([
		     articulo.create({ 
		    	 descripcion : request.body.descripcion,
		    	 maquinaestadoid : request.body.maquinaestadoid,
		    	 tipoarticuloid : request.body.tipoarticuloid
		     }, {transaction : transaction})
		]);
	}).then(function(articulo){
		articulo.forEach(function(item){
			item['dataValues'].maquinaestado = "/maquinaestado/" + item['dataValues'].maquinaestadoid;
			item['dataValues'].tipoarticulo = "/tipoarticulo/" + item['dataValues'].tipoarticuloid;
			delete item['dataValues'].maquinaestadoid;
			delete item['dataValues'].tipoarticuloid;
		})
		response.jsonp(articulo);
	}).catch(function(error){
		response.jsonp({response : error});
	});
};

var findStateMachineByArticle = function(request, response){
	
};

/**
 * Export functions
 * 
 */
exports.all 		= all;
exports.findById 	= findById;
exports.create 		= create;