document.addEventListener('deviceready', function(){
	//ici tout le code de lancement de l'appli
}, false);

var app = angular.module('app',['ngRoute']);

app.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/home', {
        	controller: 'GeoCtrl',
        	templateUrl: 'partials/home.html'
        })
        .when('/about', {templateUrl: 'partials/about.html'})
        .when('/filter', {templateUrl: 'partials/filter.html'})
        .otherwise({redirectTo: '/home'});
}]);


app.controller('GeoCtrl', ['$scope', '$http',
function($scope, $http) {
       
        // Get the most accurate position updates available on the
        // device.
        var options = { enableHighAccuracy: true };
        var map, zoneMarqueurs;
        navigator.geolocation.watchPosition(onSuccess, onError, options);

	    function onSuccess(position) {
            initialize(position.coords.latitude, position.coords.longitude);
	    }
        function initialize(lat, lon) {
        	var locations = [
		      ['Bondi Beach', lat, lon, 4],
		      ['Coogee Beach', 48.865016100000000000, 2.375797899999952300, 5],
		      ['Cronulla Beach', 48.8434977, 2.3877827000000025, 3],
		      ['Manly Beach', 48.8318992, 2.3444131999999627, 2],
		      ['Maroubra Beach', 48.866131, 2.3981602999999723, 1]
		    ];


		    var map = new google.maps.Map(document.getElementById('map-canvas'), {
		      zoom: 10,
		      center: new google.maps.LatLng(lat, lon),
		      mapTypeId: google.maps.MapTypeId.ROADMAP
		    });
		    var infowindow = new google.maps.InfoWindow();
		    var marker, i;


		    for (i = 0; i < locations.length; i++) {  
		      marker = new google.maps.Marker({
		        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
		        map: map
		      });

		      google.maps.event.addListener(marker, 'click', (function(marker, i) {
		        return function() {
		          infowindow.setContent(locations[i][0]);
		          infowindow.open(map, marker);
		        }
		      })(marker, i));
		    }
		}
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }
    }
]);