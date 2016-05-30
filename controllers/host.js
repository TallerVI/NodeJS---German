var getHost = function(request, response){
	var hostname = ( request.headers.host.match(/:/g) ) ? request.headers.host.slice( 0, request.headers.host.indexOf(":") ) : request.headers.host
	return request.protocol + '://' + hostname + ':3000';
};

exports.getHost = getHost;