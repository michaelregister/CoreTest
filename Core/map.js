angular.module('lib/Core/map.html', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('lib/Core/map.html',
    "<leaflet ng-show=\"isActiveView('map')\" class=sidebar-map id=mymap1 center=bastia layers=layers></leaflet>"
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
                // include= xMap.directive("pins");
                this.transclude = true;
                this.controller = ["$rootScope", "$scope", "leafletData", "mapService", function ($rootScope, $scope, leafletData, mapService) {
                    var bingKey = "As3LPVTMbjlvopcBUBWlbYazvuvTE4MOUg5kr1oP0G_faR4baF4b0KDxTUAy4w4a";
                    angular.extend($scope, {
                        bastia: { lat: 39.0997, lng: -94.5786, zoom: 4 },
                        markers: { bastia: { lat: 39.0997, lng: -94.5786 } },
                        layers: { baselayers: {} }
                    });
                    /* map Layers*/
                    // $rootScope.getBaseLayers = mapService.getBaseLayers;
                    /* map Layers-filters*/
                    leafletData.getMap().then(function (map) {
                        $rootScope.MYMAP = map;
                        $rootScope.mrkgrp = [];
                        $rootScope.ALLMARKERS = [];
                        $rootScope.getBaseLayers = mapService.getBaseLayers;
                        var baseLayers = $rootScope.getBaseLayers(map);
                        baseLayers["Bing Aerial Map"].addTo(map);
                        //var geocoder = L.Control.Geocoder.bing(bingKey),
                        //    control = new L.Control.geocoder({
                        //        geocoder: geocoder
                        //    }).addTo(map);
                        var layerControl = new L.Control.Layers(baseLayers).addTo(map);
                        $rootScope.layerControl = layerControl;
                        $rootScope.previouszoom = map.getZoom();
                        $(".leaflet-control-zoom").css("visibility", "visible");
                        var currentMkt;
                        // $rootScope.LoadControlBar();
                        $rootScope.$emit("AddedPrimaryControls", [map, bingKey]);
                    });
                    /* map Demographics*/
                    //$rootScope.FilterByDemo =
                    //function () {
                    //    $rootScope.mrkgrp["other"] = undefined;
                    //    $rootScope.refreshProps();
                    //};
                    //$rootScope.refreshProps =
                    //function refreshProps() {
                    //    for (var i = 0; i < $rootScope.PropertyLayers.length; i++) {
                    //        var name = $rootScope.PropertyLayers[i];
                    //        console.log(name);
                    //        var genuse = { text: name, isApplied: true };
                    //        $rootScope.selectGenUse(genuse);
                    //    }
                    //};
                    //var filterTypes = {Demographics : "demographics", Property : "property", GeneralUse : "GeneralUse"};
                    //$rootScope.AddToPropertyFilter = function (filterObject: any) {
                    //    switch (filterObject.value) {
                    //        case "bldgsize":
                    //            $rootScope.DisplayPropertiesModel.UseSQFT = filterObject.isApplied;
                    //            $rootScope.DisplayPropertiesModel.SQFTRangeMin = filterObject.newRange[0];
                    //            $rootScope.DisplayPropertiesModel.SQFTRangeMax = filterObject.newRange[1];
                    //            $rootScope.refreshProps();
                    //            break;
                    //    }
                    //};
                    //$rootScope.applyFilter = function (filterObject: any) {
                    //    switch (filterObject.filterType) {
                    //        case "demographics":
                    //            $rootScope.AddToDemoFilter(filterObject);
                    //            break;
                    //        case "property":
                    //            $rootScope.AddToPropertyFilter(filterObject);
                    //            break;
                    //        case "GeneralUse":
                    //            $rootScope.DisplayPropertiesModel.genUseType = filterObject.name;
                    //            $rootScope.selectGenUse();
                    //            break;
                    //        default:
                    //            break;
                    //    }
                    //    console.log("apply filter was called, filterObject is " + JSON.stringify(filterObject));
                    //    return true;
                    //};
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