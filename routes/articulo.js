/**
 * New node file
 */
var appFastplate = require("../app");
var articulo = require("../controllers/articulo");

appFastplate.get('/articulo', articulo.all);
appFastplate.get('/articulo/:articuloid', articulo.findById);
appFastplate.post('/articulo', articulo.create);