/**
 * New node file
 */
var appFastplate = require("../app");
var articulo = require("../controllers/articulo");

appFastplate.get('/articulo', articulo.all);
appFastplate.get('/articulo/:articuloid', articulo.findById);
appFastplate.post('/articulo', articulo.create);
appFastplate.put('/articulo', articulo.updateAll);
appFastplate.patch('/articulo', articulo.updatePart);
appFastplate.delete('/articulo/:articuloid', articulo.deleteById);

appFastplate.get('/tipoarticulo/:tipoarticuloid/articulo', articulo.findByTipoArticulo);