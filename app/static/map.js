
mapboxgl.accessToken = 'pk.eyJ1Ijoiam50dWNjZWxsYSIsImEiOiJja3VyNW84eDIwZzZ3Mm5sbjJ4bmk5ZW5pIn0.pJS-tfqDmr1IfUajBzMggQ';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jntuccella/cl11wwg25000z14t2q0gi2w5b/draft', 
    zoom: 5,
    center: [2, 48],
});

const addDataLayer = (date) => {

    $.ajax({
      type: "POST",
      url: "/gc_url",
      data: JSON.stringify(date),
      contentType: "application/json",
      dataType: 'json',
      success: function(result) {
        map.addSource('NO2 source FR', {
          'type': 'image',
          'url' : result.FR,
          'coordinates': [
            [-5, 52],
            [9 , 52],
            [9, 42],
            [-5, 42]
            ]
        });
  
        map.addLayer(
          {
            'id': 'NO2 layer FR',
            'source': 'NO2 source FR',
            'type': 'raster',
            'layout' : {
              'visibility': 'visible',
            },
            "paint" : {
                "raster-opacity" : 0.5,
                "raster-contrast" : -0.1
              
              }
            },
            "indus-process",
            );
        
      
      } 
    });
  };

const updateDataLayer = (date) => {
    map.removeLayer('NO2 layer FR');
    map.removeSource('NO2 source FR');
    addDataLayer(date);
  };

map.on('load', () => {
  buildLegend();
  });  