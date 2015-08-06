# lba.Core

Location Based Anylitics

**Core Component**
```javascript
  <lba-map datasource="testdata" popupfunction="mypopup" 
                      class="custom-popup"></lba-map>
```
**Attributes**
* datasource
  * this is the array of items to display as pins on the map
    * the specific item structure show look like 
    ```javascript
      $scope.testdata = [{ location: { latitude: 37.9, longitude: -94 }, ID: 'test1' },
                    { location: { latitude: 38, longitude: -94 },ID: 'test2' }];

    ```
    * specifically we are looking for the location property of the item and retrieving the latitude and logitude properties
    * the ID property will be returned on click as part of the marker.Feature to allow for retrieving of detail info.
* popupfunction
  * this function allows for a popup to be displayed on pin click.
```javascript
$scope.mypopup = function (marker:any)
                {
                        var popup = "<h1>" + marker.Feature.ID + "</h1>";
                        return popup;
               
                }
```

