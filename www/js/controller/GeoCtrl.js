
appControllers.controller('GeoCtrl', ['$scope', '$http',
    function($scope, $http) {
        console.log('qsd');
       
        
        initialize(43, 5);


        function initialize(lat, lon) {
            var myMarkerImage = new google.maps.MarkerImage('img/icone_maison.gif');
            var mapOptions = {
              center: new google.maps.LatLng(lat, lon),
              icon: myMarkerImage,
              zoom: 20
            };
            var latlng = new google.maps.LatLng(lat, lon);
            
            var map = new google.maps.Map(document.getElementById("map-canvas"),
                mapOptions);
          }

        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: new google.maps.MarkerImage('img/icone_maison.gif')
        });
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }
    }
    /* var marker = new google.maps.Marker({
              position: latlng,
              map: map,
              icon: new google.maps.MarkerImage('img/icone_maison.gif')
          });*/
          
        // Info Window Content
        /*var infoWindowContent = [
            ['<div class="info_content">' +
            '<h3>London Eye</h3>' +
            '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>' +        '</div>'],
            ['<div class="info_content">' +
            '<h3>Palace of Westminster</h3>' +
            '<p>The Palace of Westminster is the meeting place of the House of Commons and the House of Lords, the two houses of the Parliament of the United Kingdom. Commonly known as the Houses of Parliament after its tenants.</p>' +
            '</div>']
        ];
       
             // Display multiple markers on a map
        var infoWindow = new google.maps.InfoWindow(), marker, i;
        
        // Loop through our array of markers & place each one on the map  
        for( i = 0; i < marker.length; i++ ) {
            var position = new google.maps.LatLng(marker[i][1], marker[i][2]);
            bounds.extend(position);
            marker = new google.maps.Marker({
                position: position,
                map: map,
                title: markers[i][0],
                icon: new google.maps.MarkerImage('img/icone_maison.gif')
            });
            
            // Allow each marker to have an info window    
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infoWindow.setContent(infoWindowContent[i][0]);
                    infoWindow.open(map, marker);
                }
            })(marker, i));
             // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
        }
        
       // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
      var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
      });*/

]);
