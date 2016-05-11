/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require("fs")
  , Sequelize = require('sequelize');

var sequelize = new Sequelize('fastplate', 'root', '1234', { host: 'localhost', dialect: 'mysql', pool: { max: 5, min: 0, idle: 10000}});

var appFasplate = module.exports = express();

// all environments
appFasplate.set('sequelize',sequelize);
appFasplate.set('http', http);
appFasplate.set('port', process.env.PORT || 4000);
appFasplate.use(express.favicon());
appFasplate.use(express.logger('dev'));
appFasplate.use(express.bodyParser());
appFasplate.use(express.methodOverride());
appFasplate.use(appFasplate.router);
appFasplate.use(require('./routes/articulo'));
appFasplate.use(require('./routes/mesa'));
appFasplate.use(require('./routes/tipoarticulo'));

// development only
if ('development' == appFasplate.get('env')) {
	appFasplate.use(express.errorHandler());
}

http.createServer(appFasplate).listen(appFasplate.get('port'), function(){
  console.log('Express server listening on port ' + appFasplate.get('port'));
});
