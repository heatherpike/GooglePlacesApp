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

//load map after document is ready
$(document).ready(function() {
	initializeMap();

});

var infoWindow;
var markers = [];

function searchPlaces() {

	var keyword = $("input").val();

	//clear previous search results' markers
	if (markers.length > 0) {
		clearMarkers();
	}

	//set request parameters
	var request = {
		types: ['food', 'restaurant', 'meal_takeaway', 'meal_delivery'],
		keyword: keyword,
		location: zenefitsLatLng,
		radius: 500,
		//openNow: true
	}

	//draw info window for each marker
	infoWindow = new google.maps.InfoWindow();

	//run search method using request parameters and callback function
	var service = new google.maps.places.PlacesService(map);
	  service.nearbySearch(request, callback);
}

function callback(results, status) {
  //draw marker for each result
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }

  else {
  	alert ("Error: No results found. Try a different keyword.");
  }

  //clear search bar text
  $("input").val("");
}

//function to create a marker
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  //push to markers array
  markers.push(marker);

  //event listener to display a place's info window upon clicking a marker
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(place.name);
    infoWindow.open(map, this);
  });
}

//remove all markers from the map (to be called when a new search is performed)
function clearMarkers() {
	for (var i=0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
}

