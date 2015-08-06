angular.module('lib/Core/map.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('lib/Core/map.html',
    "<leaflet class=sidebar-map id=mymap1 center=bastia layers=layers></leaflet>"
  );

}]);

;angular.module('lib/Core/map.html', []).run(['$templateCache', function($templateCache) {
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
                this.controller = ["$rootScope", "$scope", "leafletData", "mapService", "$attrs", "$compile", mapController];
                console.log("xmap constructor called");
            }
            return Xmap;
        })();
        var mapController = (function () {
            //    controller = ["$rootScope", "$scope",   
            //      "leafletData",  "mapService","$attrs",
            //function
            // static $inject = ["$rootScope", "$scope","leafletData",  "mapService","$attrs"]
            function mapController($rootScope, $scope, leafletData, mapService, $attrs, $compile) {
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
                    cmarker.mp = mp;
                    cmarker.on('click', function (e) {
                        var pop = cmarker.mp.popupfunction(cmarker);
                        var latlng = new L.LatLng(cmarker.Feature.location.latitude, cmarker.Feature.location.longitude);
                        var ele = angular.element(pop);
                        var newScope = $scope.$new();
                        var compiled = $compile(ele)($scope);
                        var popup1 = L.popup().setLatLng(e.latlng).setContent(compiled[0]);
                        popup1.openOn($rootScope.MYMAP);
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