angular.module('lib/Core/map.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('lib/Core/map.html',
    "<leaflet class=sidebar-map id=mymap1 center=bastia layers=layers></leaflet>"
  );

}]);
;var xmod = angular.module("lba.Core", ["lib/Core/map.html"]);
var app;
(function (app) {
    var map;
    (function (_map) {
        "use strict";
        // export class DisplayPropertiesModel {
        //   public  enabled: boolean = false;
        //     public genUsetype: string = "Office";
        //     public useSQFT: boolean = false;
        //     public sqFTRangeMin: number = -1;
        //     public sqFTRangeMax: number = -1;
        //     public demoFilterEnabled: boolean = false;
        // };
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
                };
                this.controller = ["$rootScope", "$scope", "leafletData", "mapService", "$attrs", function ($rootScope, $scope, leafletData, mapService, $attrs) {
                    var bingKey = "As3LPVTMbjlvopcBUBWlbYazvuvTE4MOUg5kr1oP0G_faR4baF4b0KDxTUAy4w4a";
                    angular.extend($scope, {
                        bastia: { lat: 39.0997, lng: -94.5786, zoom: 4 },
                        markers: { bastia: { lat: 39.0997, lng: -94.5786 } },
                        layers: { baselayers: {} }
                    });
                    leafletData.getMap('mymap1').then(function (map) {
                        $rootScope.MYMAP = map;
                        $rootScope.mrkgrp = [];
                        $rootScope.ALLMARKERS = $scope.datasource; // $attrs.datasource;//[];
                        $rootScope.getBaseLayers = mapService.getBaseLayers;
                        var baseLayers = $rootScope.getBaseLayers(map);
                        baseLayers["Bing Aerial Map"].addTo(map);
                        var layerControl = new L.Control.Layers(baseLayers).addTo(map);
                        $rootScope.layerControl = layerControl;
                        $rootScope.previouszoom = map.getZoom();
                        $(".leaflet-control-zoom").css("visibility", "visible");
                        $rootScope.$emit("AddedPrimaryControls", [map, bingKey]);
                    });
                }];
                console.log("xmap constructor called");
            }
            Xmap.getInstance = function () {
                return new Xmap();
            };
            return Xmap;
        })();
        angular.module("lba.Core").directive("lbaMap", function () { return Xmap.getInstance(); });
    })(map = app.map || (app.map = {}));
})(app || (app = {}));
//# sourceMappingURL=map.js.map