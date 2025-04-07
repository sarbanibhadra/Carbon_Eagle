
const draw = new MapboxDraw({
  displayControlsDefault: false,
  // Select which mapbox-gl-draw control buttons to add to the map.
  controls: {
  polygon: true,
  trash: true
  },
  // Set mapbox-gl-draw to draw by default.
  // The user does not have to click the polygon control button first.
  });

map.addControl(
  new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  marker : true,
  })
),

map.addControl(new mapboxgl.NavigationControl());

map.addControl(
  new mapboxgl.GeolocateControl({
  positionOptions: {
  enableHighAccuracy: true
  },
  // When active the map will receive updates to the device's location as it changes.
  trackUserLocation: true,
  // Draw an arrow next to the location dot to indicate which direction the device is heading.
  showUserHeading: true
  })
  );

map.addControl(draw);


map.on('draw.create', updateArea);
map.on('draw.delete', updateArea);
map.on('draw.update', updateArea);
 
function updateArea(e) {
  const draw_data = draw.getAll().features[0];
  $.ajax({
    type: "POST",
    url: "/polygon_exposure",
    data: JSON.stringify(draw_data.geometry),
    contentType: "application/json",
    dataType: 'json',
    success: function(result) {
      updateExposureChart(result)
    } 
  });
}

marker = new mapboxgl.Marker({ "color": "#f44336" });


function add_marker(event) {
  var coordinates = event.lngLat;
  console.log(coordinates)
  marker.setLngLat(coordinates).addTo(map);
  $.ajax({
    type: "POST",
    url: "/point_exposure",
    data: JSON.stringify(coordinates),
    contentType: "application/json",
    dataType: 'json',
    success: function(result) {
      updatePointChart(result)
    } 
  });
}