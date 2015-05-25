var zenefitsLatLng, map;

function initializeMap() {
	//define the coordinates for the map
	zenefitsLatLng = new google.maps.LatLng(37.785, -122.396);

	//define map options, center and zoom level
	var mapOptions = {
	  center: zenefitsLatLng,
	  zoom: 16
	};

	//find the map canvas element by id
	var mapCanvas = $("#map-canvas")[0];
 
	//create a map with the above specified options
	map = new google.maps.Map(mapCanvas, mapOptions);

	//define a marker for the map center: Zenefits HQ ;)
	var marker = new google.maps.Marker({
        position: zenefitsLatLng,
        title: "Zenefits HQ",
        icon: "zenefits_bird.png"
    });

    // Add the main marker to the map 
    marker.setMap(map);
}

$(document).ready(function() {
	initializeMap();

});

var infoWindow;

function searchPlaces() {

	var request = {
		types: ['food', 'restaurant', 'meal_takeaway', 'meal_delivery'],
		keywords: $("input").val(),
		location: zenefitsLatLng,
		radius: 500,
		openNow: true
	}

	infoWindow = new google.maps.InfoWindow();
	var service = new google.maps.places.PlacesService(map);
	  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(place.name);
    infoWindow.open(map, this);
  });
}

