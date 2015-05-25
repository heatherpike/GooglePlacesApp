function initializeMap() {
	//define the coordinates for the map
	var zenefitsLatLng = new google.maps.LatLng(37.785, -122.396);

	//define map options, center and zoom level
	var mapOptions = {
	  center: zenefitsLatLng,
	  zoom: 13
	};

	//find the map canvas element by id
	var mapCanvas = $("#map-canvas")[0];
 
	//create a map with the above specified options
	var map = new google.maps.Map(mapCanvas, mapOptions);

	//define a marker for the map center: Zenefits HQ ;)
	var marker = new google.maps.Marker({
        position: zenefitsLatLng,
        title: "Zenefits HQ",
        icon: "zenefits_bird.png"
    });

    // Add a main marker to the map 
    marker.setMap(map);
}

$(document).ready(function() {
	initializeMap();
})
