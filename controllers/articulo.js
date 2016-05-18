
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
	var a = request.body;
	if("descripcion" in a && "maquinaestadoid" in a && "tipoarticuloid" in a){
		sequelize.transaction(function(transaction){	
			return Promise.all([
		    articulo.create({ 
		    	descripcion : a.descripcion,
		    	maquinaestadoid : a.maquinaestadoid,
		    	tipoarticuloid : a.tipoarticuloid
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
			response.status(500).send({response : error});
		});
	} else {
		response.status(400).send({ error : "Falta un dato requerido"});
	}
};


/**
 * Export functions
 * 
 */
exports.all 		= all;
exports.findById 	= findById;
exports.create 		= create;