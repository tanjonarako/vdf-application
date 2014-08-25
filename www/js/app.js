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
        .when('/filter', {
          controller: 'FilterCtrl',
          templateUrl: 'partials/filter.html'
        })
        .otherwise({redirectTo: '/home'});
}]);

app.controller('FilterCtrl', ['$rootScope', '$scope', '$http',
function($rootScope, $scope, $http) {
  $scope.test = 'toto';
  $scope.pays = []
        $scope.showOnly = function() {
          $rootScope.selectChampionship = $scope.villeChoix.codepays;
        }

}]);

app.service("vdfService", [
    function() {
      	var Team = Parse.Object.extend("Team");
      	var Match = Parse.Object.extend("Match");
      	var Channel = Parse.Object.extend("Channel");
      	var PlaceChan = Parse.Object.extend("PlaceChan");

      	this.getMatchTeams = function(m) {

	      	var promises = [];

	      	promises.push(m.get('localTeam').fetch());
	      	promises.push(m.get('externalTeam').fetch());
	      	promises.push(getMatchPlaces(m));


	      	return Parse.Promise.when(promises);
      	};
      	this.getMatchPlaces = function(m) {

	      	var successful = new Parse.Promise();

	      	m
	      	.get('channel')
	      	.fetch()
	      	.then(function(channel) {
	        	return getChannelPlaces(channel);
	      	})
	      	.then(function(places) {
	         	successful.resolve(places);
	      	});
	      	return successful;
     	 };
     	this.getChannelPlaces = function(channel) {
	      	var query = new Parse.Query(PlaceChan);
	      	var successful = new Parse.Promise();

	      	query
	      	.equalTo('channel', channel)
	      	.find()
	      	.then(function(placeChannels) {
	        	return getAllPlaces(placeChannels);
	      	})
	      	.then(function() {
	        	successful.resolve(arguments);
	      	});

	      	return successful;
      	};
     	this.getAllPlaces = function(placeChannels) {

	      	var promisePlaces = [];

	      	for (var i = 0; i < placeChannels.length; i++) {
		        var placeChan = placeChannels[i];
		        promisePlaces.push(placeChan.get('place').fetch());
	      	}

	      	return Parse.Promise.when(promisePlaces);
      	};
    }
]);

app.controller('GeoCtrl', ['$rootScope', '$scope', '$http',
function($rootScope, $scope, $http) {

    // Get the most accurate position updates available on the
    // device.
    var options = { enableHighAccuracy: true };
    var map, zoneMarqueur;
    navigator.geolocation.watchPosition(onSuccess, onError, options);

  	var addresses = [];
	var queryPlace = new Parse.Query(Place);

	    queryPlace
	    .find()
	    .then(function(places) {
	     for(var p in places) {
	        var place = places[p];
      		vdfService.getAllPlaces(place).then(function(name, lat, lon, position) {
          	addresses.push([place.get('name'), place.get('lat'), place.get('lon'), place.get('position')])
        	});
    	};

        var markers = [];


      	function onSuccess(position) {
            initialize(addresses, position.coords.latitude, position.coords.longitude);
      	}
        function initialize(locations, lat, lon) {

        locations[0][1] = lat;
        locations[0][2] = lon;

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

          if($rootScope.selectChampionship) {
            if($rootScope.selectChampionship == locations[i][4]) {
              marker.setVisible(true);
            }
            else {
              marker.setVisible(false);
            }
          }


          markers.push(marker);
        }
    }
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }

    }
]);