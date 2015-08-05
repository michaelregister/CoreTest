angular.module('lib/Core/map.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('lib/Core/map.html',
    "<leaflet class=sidebar-map id=mymap1 center=bastia layers=layers></leaflet>"
  );

}]);

;var xmod = angular.module("lba.Core", ["lib/Core/map.html", "leaflet-directive"]);
var app;
(function (app) {
    var map;
    (function (_map) {
        "use strict";
        var MapTileLayerOptions = (function () {
            function MapTileLayerOptions() {
            }
            return MapTileLayerOptions;
        })();
        _map.MapTileLayerOptions = MapTileLayerOptions;
        var Xmap = (function () {
            function Xmap() {
                this.restrict = "E";
                this.templateUrl = "lib/Core/map.html";
                this.transclude = true;
                this.scope = {
                    datasource: '=',
                    popupfunction: '='
                };
                this.controller = ["$rootScope", "$scope", "leafletData", "mapService", "$attrs", mapController];
                console.log("xmap constructor called");
            }
            return Xmap;
        })();
        var mapController = (function () {
            //    controller = ["$rootScope", "$scope",   
            //      "leafletData",  "mapService","$attrs",
            //function
            // static $inject = ["$rootScope", "$scope","leafletData",  "mapService","$attrs"]
            function mapController($rootScope, $scope, leafletData, mapService, $attrs) {
                var bingKey = "As3LPVTMbjlvopcBUBWlbYazvuvTE4MOUg5kr1oP0G_faR4baF4b0KDxTUAy4w4a";
                angular.extend($scope, {
                    bastia: { lat: 39.0997, lng: -94.5786, zoom: 4 },
                    markers: { bastia: { lat: 39.0997, lng: -94.5786 } },
                    layers: { baselayers: {} }
                });
                leafletData.getMap('mymap1').then(function (map) {
                    $rootScope.MYMAP = map;
                    $rootScope.mrkgrp = [];
                    $rootScope.ALLMARKERS = $scope.datasource;
                    $rootScope.getBaseLayers = mapService.getBaseLayers;
                    var baseLayers = $rootScope.getBaseLayers(map);
                    baseLayers["Bing Aerial Map"].addTo(map);
                    var layerControl = new L.Control.Layers(baseLayers).addTo(map);
                    $rootScope.layerControl = layerControl;
                    $rootScope.previouszoom = map.getZoom();
                    $(".leaflet-control-zoom").css("visibility", "visible");
                    $rootScope.$emit("AddedPrimaryControls", [map, bingKey]);
                    $scope.$watchCollection('datasource', function () {
                        if ($scope.datasource != undefined) {
                            for (var i = 0; i < $scope.datasource.length; i++) {
                                map.addLayer($scope.CreateMarkers($scope.datasource[i]));
                            }
                        }
                    });
                });
                $scope.CreateMarkers = function (datapoint) {
                    var mp = this;
                    var ll = new L.LatLng(datapoint.location.latitude, datapoint.location.longitude);
                    var geojsonMarkerOptions = {
                        radius: 8,
                        fillColor: "#00f",
                        color: "#fff",
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.8,
                    };
                    var cmarker = L.circleMarker(ll, geojsonMarkerOptions);
                    cmarker.MainColor = "#00f";
                    cmarker.Feature = datapoint;
                    cmarker.ID = datapoint.ID;
                    cmarker.on('mouseover', function (e) {
                        var selected = '#7bbf50';
                        this.setStyle({ radius: 12, fillOpacity: 1, color: '#fff', fillColor: selected });
                    });
                    cmarker.on('mouseout', function (e) {
                        this.setStyle({ radius: 8, fillOpacity: 1, color: '#fff', fillColor: this.MainColor });
                    });
                    cmarker.on('click', function (e) {
                        mp.popupfunction(cmarker);
                    });
                    return cmarker;
                };
                //}];
            }
            return mapController;
        })();
        //public static getInstance(): Xmap {
        //    return new Xmap();
        //}
        /*@ngInject*/
        function directive() {
            return new Xmap();
        }
        angular.module("lba.Core").directive("lbaMap", directive); //() => Xmap.getInstance());
    })(map = app.map || (app.map = {}));
})(app || (app = {}));
//# sourceMappingURL=map.js.map
;var mapModule;
(function (mapModule) {
    "use strict";
    var MapService = (function () {
        function MapService($http) {
            this.$http = $http;
        }
        MapService.prototype.getBaseLayers = function (myBingBasemap, map) {
            var my1BingBasemap = new L.BingLayer(mapModule.MapService.bingKey);
            var xbingHybridLyr = new L.BingLayer(mapModule.MapService.bingKey, {
                subdomains: [0, 1, 2, 3],
                type: "Road",
                attribution: "Bing",
                culture: ""
            });
            xbingHybridLyr.options.attribution = " Property data &copy; by <a href=\"http://xceligent.com/\" target=\"_blank\">" + " <img src=\"../images/xceligent-little-logo.png\"></a>";
            var stOptions;
            stOptions = new app.map.MapTileLayerOptions();
            stOptions.attribution = "Map tiles by <a href=\"http://stamen.com\">Stamen Design</a>," + " <a href=\"http://creativecommons.org/licenses/by/3.0\">CC BY 3.0</a> &mdash; Map data &copy;" + " <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, " + "<a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>";
            stOptions.subdomains = ["a", "b", "c", "d"];
            stOptions.minZoom = 0;
            stOptions.maxZoom = 20;
            var stamenToner = L.tileLayer("http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png", stOptions);
            var acOptions;
            acOptions = new app.map.MapTileLayerOptions();
            stOptions.attribution = "&copy;2012 Esri & Stamen, Data from OSM and Natural Earth |" + " Property data &copy; by <a href=\"http://xceligent.com/\" target=\"_blank\"> " + "<img src=\"../images/xceligent-little-logo.png\"></a>";
            stOptions.subdomains = ["0", "1", "2", "3"];
            stOptions.minZoom = 0;
            stOptions.maxZoom = 18;
            var acetateAll = L.tileLayer("http://a{s}.acetate.geoiq.com/tiles/acetate-hillshading/{z}/{x}/{y}.png", acOptions);
            var baseLayers = {
                "Bing Aerial Map": my1BingBasemap,
                "Bing Street Map": xbingHybridLyr,
                "Driving Map": stamenToner,
                "Open Street Map": acetateAll
            };
            return baseLayers;
        };
        MapService.$inject = ["$http"];
        MapService.IID = "mapService";
        MapService.bingKey = "As3LPVTMbjlvopcBUBWlbYazvuvTE4MOUg5kr1oP0G_faR4baF4b0KDxTUAy4w4a";
        return MapService;
    })();
    mapModule.MapService = MapService;
})(mapModule || (mapModule = {}));
angular.module("lba.Core").factory(mapModule.MapService.IID, ["$http", function ($http) {
    return new mapModule.MapService($http);
}]);
//# sourceMappingURL=map.service.js.map
;L.BingLayer = L.TileLayer.extend({
	options: {
		subdomains: [0, 1, 2, 3],
		type: 'AerialWithLabels',
		attribution: 'Bing',
		culture: ''
	},

	initialize: function(key, options) {
		L.Util.setOptions(this, options);

		this._key = key;
		this._url = null;
		this.meta = {};
		this.loadMetadata();
	},

	tile2quad: function(x, y, z) {
		var quad = '';
		for (var i = z; i > 0; i--) {
			var digit = 0;
			var mask = 1 << (i - 1);
			if ((x & mask) != 0) digit += 1;
			if ((y & mask) != 0) digit += 2;
			quad = quad + digit;
		}
		return quad;
	},

	getTileUrl: function(p, z) {
		var z = this._getZoomForUrl();
		var subdomains = this.options.subdomains,
			s = this.options.subdomains[Math.abs((p.x + p.y) % subdomains.length)];
		return this._url.replace('{subdomain}', s)
				.replace('{quadkey}', this.tile2quad(p.x, p.y, z))
				.replace('{culture}', this.options.culture);
	},

	loadMetadata: function() {
		var _this = this;
		var cbid = '_bing_metadata_' + L.Util.stamp(this);
		window[cbid] = function (meta) {
			_this.meta = meta;
			window[cbid] = undefined;
			var e = document.getElementById(cbid);
			e.parentNode.removeChild(e);
			if (meta.errorDetails) {
				if (window.console) console.log("Leaflet Bing Plugin Error - Got metadata: " + meta.errorDetails);
				return;
			}
			_this.initMetadata();
		};
		var url = document.location.protocol + "//dev.virtualearth.net/REST/v1/Imagery/Metadata/" + this.options.type + "?include=ImageryProviders&jsonp=" + cbid +
		          "&key=" + this._key + "&UriScheme=" + document.location.protocol.slice(0, -1);
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;
		script.id = cbid;
		document.getElementsByTagName("head")[0].appendChild(script);
	},

	initMetadata: function() {
		var r = this.meta.resourceSets[0].resources[0];
		this.options.subdomains = r.imageUrlSubdomains;
		this._url = r.imageUrl;
		this._providers = [];
		if (r.imageryProviders) {
			for (var i = 0; i < r.imageryProviders.length; i++) {
				var p = r.imageryProviders[i];
				for (var j = 0; j < p.coverageAreas.length; j++) {
					var c = p.coverageAreas[j];
					var coverage = {zoomMin: c.zoomMin, zoomMax: c.zoomMax, active: false};
					var bounds = new L.LatLngBounds(
							new L.LatLng(c.bbox[0]+0.01, c.bbox[1]+0.01),
							new L.LatLng(c.bbox[2]-0.01, c.bbox[3]-0.01)
					);
					coverage.bounds = bounds;
					coverage.attrib = p.attribution;
					this._providers.push(coverage);
				}
			}
		}
		this._update();
	},

	_update: function() {
		if (this._url == null || !this._map) return;
		this._update_attribution();
		L.TileLayer.prototype._update.apply(this, []);
	},

	_update_attribution: function() {
		var bounds = this._map.getBounds();
		var zoom = this._map.getZoom();
		for (var i = 0; i < this._providers.length; i++) {
			var p = this._providers[i];
			if ((zoom <= p.zoomMax && zoom >= p.zoomMin) &&
					bounds.intersects(p.bounds)) {
				if (!p.active && this._map.attributionControl)
					this._map.attributionControl.addAttribution(p.attrib);
				p.active = true;
			} else {
				if (p.active && this._map.attributionControl)
					this._map.attributionControl.removeAttribution(p.attrib);
				p.active = false;
			}
		}
	},

	onRemove: function(map) {
		for (var i = 0; i < this._providers.length; i++) {
			var p = this._providers[i];
			if (p.active && this._map.attributionControl) {
				this._map.attributionControl.removeAttribution(p.attrib);
				p.active = false;
			}
		}
        	L.TileLayer.prototype.onRemove.apply(this, [map]);
	}
});

L.bingLayer = function (key, options) {
    return new L.BingLayer(key, options);
};
