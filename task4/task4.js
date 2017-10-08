let Client = require('node-rest-client').Client;

var client = new Client();
 
function getCountyByIso3Code(code){
	client.get("http://services.groupkt.com/country/get/iso3code/" + code, (data, response) =>
    	console.log(data)).on('error', (err) =>console.log('something went wrong on the request', err.request.options));

	client.on('error', function (err) {
	    console.error('Something went wrong on the client', err);
	});

}

getCountyByIso3Code("ARG");
