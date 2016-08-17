var L = require('leaflet'),
 Dawa = require('./geocoders/dawa');
// var L = {Control : {require('leaflet-control-geocoder');

module.exports = Dawa.class;

L.Util.extend(L.Control.Geocoder, {
	DAWA: module.exports,
	dawa: Dawa.factory
});
