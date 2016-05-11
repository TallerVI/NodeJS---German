/**
 * New node file
 */
var appFastplate = require("../app");
var mesa = require("../controllers/mesa");

appFastplate.get('/mesa', mesa.all);
appFastplate.get('/mesa/:mesaid', mesa.findById);
appFastplate.post('/mesa', mesa.create);