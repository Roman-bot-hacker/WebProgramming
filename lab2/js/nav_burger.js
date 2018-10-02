function nav_burger_click() {
    if (document.getElementById("nav_menu").style.display === "none") {
        document.getElementById("nav_menu").style.display = "inline-block";
    }
    else {document.getElementById("nav_menu").style.display = "none";}
}

// Initialize and add the map
function initMap() {
  // The location of Uluru
  var uluru = {lat: 50.4914036, lng: 30.6002492};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 16, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}