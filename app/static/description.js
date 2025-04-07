const config = {
    title: 'Biomass2CarbonStock',
    
    indus_description:
    'Select a facility to show the emission as self-reported.',

    station_description:
    'Click on ground monitoring stations to access the confidence of our AI model at the clicked location',

    exposure_description:
    'Click to place a marker. Select a province/city or draw a polygon.',

  }; 


(updateText = () => {
  document.title = config.title;
  // document.getElementById('indus-description').innerHTML = config.indus_description;
  // document.getElementById('station-description').innerHTML = config.station_description;
  // document.getElementById('exposure-description').innerHTML = config.exposure_description;
})();