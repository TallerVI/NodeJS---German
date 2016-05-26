/**
 * New node file
 */
var appFastplate = require("../app");
var mesa = require("../controllers/mesa");

appFastplate.get('/mesa', mesa.all);
appFastplate.get('/mesa/:mesaid', mesa.findById);
appFastplate.post('/mesa', mesa.create);
appFastplate.put('/mesa', mesa.updateAll);
appFastplate.patch('/mesa', mesa.updatePart);
appFastplate.delete('/mesa/:mesaid', mesa.deleteById);