L.Control.Geocoder.DAWA = L.Class.extend({
    options: {
        serviceUrl: '//dawa.aws.dk/adgangsadresser/',
        geocodingQueryParams: {},
        reverseQueryParams: {}
    },

    initialize: function(options) {
        L.Util.setOptions(this, options);
    },

    geocode: function(query, cb, context) {
        L.Control.Geocoder.jsonp(this.options.serviceUrl + '', L.extend({
            q: query,
            //kommunekode: '0147'
        }, this.options.geocodingQueryParams),
        function(data) {
            var results = [];
            for (var i = data.length - 1; i >= 0; i--) {
                results[i] = {
                    name: data[i].vejstykke.navn + " " + data[i].husnr + ", " + data[i].postnummer.nr + " " + data[i].postnummer.navn,
                    
                    // there is no bounding box in the results, so return a small box centered around the point
                    bbox: L.latLngBounds([data[i].adgangspunkt.koordinater[1]-0.00001, data[i].adgangspunkt.koordinater[0]-0.00001], 
                                         [data[i].adgangspunkt.koordinater[1]+0.00001, data[i].adgangspunkt.koordinater[0]+0.00001]),
                    center: L.latLng(data[i].adgangspunkt.koordinater[1],data[i].adgangspunkt.koordinater[0])
                };
            };
            
            cb.call(context, results);
        }, this, 'callback');
    },

    reverse: function(location, scale, cb, context) {
        L.Control.Geocoder.jsonp(this.options.serviceUrl + 'reverse/', L.extend({
            lat: location.lat,
            lon: location.lng,
            zoom: Math.round(Math.log(scale / 256) / Math.log(2)),
        }, this.options.reverseQueryParams), function(data) {
            var result = [],
                loc;

            if (data && data.lat && data.lon) {
                loc = L.latLng(data.lat, data.lon);
                result.push({
                    name: data.display_name,
                    center: loc,
                    bounds: L.latLngBounds(loc, loc)
                });
            }

            cb.call(context, result);
        }, this, 'callback');
    }
});

L.Control.Geocoder.dawa = function(options) {
    return new L.Control.Geocoder.DAWA(options);
};
