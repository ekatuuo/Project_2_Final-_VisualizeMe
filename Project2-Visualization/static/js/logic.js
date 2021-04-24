
// // Creating our initial map object
// // We set the longitude, latitude, and the starting zoom level
// // This gets inserted into the div with an id of 'map'
function createMap(Mlandings) {
  // var myMap = L.map("mapid", {
  //     center: [45.52, -122.67],
  //     zoom: 2
  //   });
  //   // Adding a tile layer (the background map image) to our map
  //   // We use the addTo method to add objects to our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
    });
  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
      "Light Map": lightmap
    };
    // Create an overlayMaps object to hold the layer
    var overlayMaps = {
      "Landings": Mlandings
    };
    // Create the map object with options
    var myMap = L.map("mapid", {
      center: [40.73, -74.0059],
      zoom: 1,
      layers: [lightmap, Mlandings]
    });
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  }
function createMarkers(response) {
      // response.data
      console.log(response)
      var landings = response;
      // Initialize an array to hold markers
      var landingMarkers = [];
      // Loop through array
      for (var index = 0; index < landings.length; index++) {
        var landing = landings[index];
        // For each landing, create a marker and bind a popup with name
        var landingMarker = L.marker([parseFloat(landing.latitude), parseFloat(landing.longitude)])
          .bindPopup("<h3>" + landing.name + "<h3><h3>Capacity: " + landing.mass + "</h3>");
        // Add the marker to the array
        landingMarkers.push(landingMarker);
      }
      // Create a layer group made from the array, pass it into the createMap function
      createMap(L.layerGroup(landingMarkers));
    }
    
d3.csv("../../../Data/meteorite_landings_clean.csv", createMarkers)