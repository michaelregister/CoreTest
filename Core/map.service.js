var mapModule;
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