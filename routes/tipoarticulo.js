/**
 * New node file
 */
var appFastplate = require("../app");
var tipoarticulo = require("../controllers/tipoarticulo");

appFastplate.get('/tipoarticulo', tipoarticulo.all);
appFastplate.get('/tipoarticulo/:tipoarticuloid', tipoarticulo.findById);
appFastplate.post('/tipoarticulo', tipoarticulo.create);