
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
	mesa.findAll().then(function(mesas){
		mesas.forEach(function(mesa){
			mesa['dataValues'].pedido = "/mesa/" + mesa['dataValues'].mesaid + "/pedido";
			mesa['dataValues'].maquinaestado = "/maquinaestado/" + mesa['dataValues'].maquinaestadoid;
			delete mesa['dataValues'].maquinaestadoid;
		})
		response.jsonp(mesas);
	});
};
var findById 		= function(request, response){
	mesa.findAll({
		where : {
			mesaid :  request.params.mesaid 
		}
	}).then(function(mesas){
		mesas.forEach(function(mesa){
			mesa['dataValues'].pedido = "/mesa/" + mesa['dataValues'].mesaid + "/pedido";
			mesa['dataValues'].maquinaestado = "/maquinaestado/" + mesa['dataValues'].maquinaestadoid;
			delete mesa['dataValues'].maquinaestadoid;
		})
		response.jsonp(mesas);
	});
};
var create 			= function(request, response){
	var a = request.body;
	if("descripcion" in a && "maquinaestadoid" in a){
		sequelize.transaction(function(transaction){
			return Promise.all([
			     mesa.create({ 
			    	 descripcion : request.body.descripcion,
			    	 maquinaestadoid : request.body.maquinaestadoid
			     }, {transaction : transaction})
			]);
		}).then(function(mesa){
			mesas.forEach(function(mesa){
				mesa['dataValues'].pedido = "/mesa/" + mesa['dataValues'].mesaid + "/pedido";
				mesa['dataValues'].maquinaestado = "/maquinaestado/" + mesa['dataValues'].maquinaestadoid;
				delete mesa['dataValues'].maquinaestadoid;
			})
			response.jsonp(mesas);
		}).catch(function(error){
			response.status(500).send({response : error});
		});
	} else {
		response.status(400).send({ error : "Falta uno o algunos de los datos requeridos", datos : a });
	}
};
var updateAll 		= function(request, response){
	var a = request.body;
	sequelize.transaction(
	).then(function(transaction){
		mesa.update({ 
		    	descripcion : request.body.descripcion,
		    	maquinaestadoid : request.body.maquinaestadoid
		    },
			{ where : { mesaid : request.body.mesaid } }, 
			{ transaction : transaction }
		).then(function( rowUpdated ){
			if(rowUpdated.pop() == 0){
				transaction.rollback();
				response.status(500).jsonp({ response : "No se ha podido actualizar mesa" });
			} else {
				transaction.commit();
				mesa.findById(request.body.mesaid).then(function(mesa){
					mesa['dataValues'].pedido = "/mesa/" + mesa['dataValues'].mesaid + "/pedido";
					mesa['dataValues'].maquinaestado = "/maquinaestado/" + mesa['dataValues'].maquinaestadoid;
					delete mesa['dataValues'].maquinaestadoid;
					response.status(200).jsonp(mesa);
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
		mesa.destroy(
			{ where : { mesaid : request.params.mesaid }, transaction : transaction }
		).then(function( rowdeleted ){
			if( rowdeleted == 0 ){
				transaction.rollback();
				response.status(500).jsonp({ response : "No se ha podido eliminar el mesa" });
			} else {
				transaction.commit();
				response.status(200).jsonp([{ mesa : "/mesa/" + request.params.mesaid }]);
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