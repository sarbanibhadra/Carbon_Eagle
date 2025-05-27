 /**
 * Builds out the graph with GlobeEye's health indicator
 */
const chart_annual_mean = c3.generate({
  bindto: '#chart_annual_mean',
  data: {
    x : 'x',
    columns: [
      ['x', 2023]      
      ['data', 0]],
    names: { data: 'AGB (ton)' },
    type: 'bar',
    colors: {
      data: 'green',
  },
  },
  grid: {
    y: {
        lines: [
            {value: 10, text: '', position: 'end'},
        ]
    }
  },
  axis: {
    x: {
      type: 'category',
    },
    y: {
      // max: 160,
      // min: 0, 
      padding: {top: 10, bottom: 5}
  }
  },
  size: {
    height: 400,
    width: 500,
  },
  
});

const chart_annual_carbon = c3.generate({
  bindto: '#chart_annual_carbon',
  data: {
    x : 'x',
    columns: [
      ['x', 2023]      
      ['data', 0]],
    names: { data: 'Annual Forest Carbon (ton)' },
    type: 'bar',
    colors: {
      data: 'blue',
  },
  },
  grid: {
    y: {
        lines: [
            {value: 10, text: '', position: 'end'},
        ]
    }
  },
  axis: {
    x: {
      type: 'category',
    },
    y: {
      // max: 160,
      // min: 0, 
      padding: {top: 10, bottom: 5}
  }
  },
  size: {
    height: 400,
    width: 500,
  },
  
});

const chart_ROI_NPV_USDperYear = c3.generate({
  bindto: '#chart_ROI_NPV_USDperYear',
  data: {
    // TODO make the initial chart have as many points as the number of fields
    x: 'x',
    columns: [
      ['x',  23],
      ['data', 0]],
    names: { data: 'Next 30 years ROI Net Present Value (USD/Year)'},
    type: 'bar',
    colors: {
      data: '#3785d4',
  },
  },
  axis: {
    x: {
        type: 'category',
        tick: {
          values: [2024, 2034],
          format: 'YY'    
        }
    },
    y: {
      // max: 202616480,
      // min: 0, 
      // padding: {top: 0, bottom: 0}
  }
  },
  size: {
    height: 400,
    width: 500,
  },
});


const updatePointChart = (point_data) => {
  console.log("Inside updatePointChart")
  // Get polygon coordinates
  var polygonCoordinates = point_data.nvp_results['coordinates']
  // const forestarea = document.getElementById('forestarea');
  // forestarea.innerText = point_data.nvp_results['Forest_area']+' hec ';
  let area = document.getElementById('area');
  area.innerText = point_data.nvp_results['TOTAL_poly_area_ha']+' hec ';
  //area.append(point_data.nvp_results['TOTAL_poly_area_ha']+' hec ');
  let ton = document.getElementById('ton');
  ton.innerText = point_data.nvp_results['ForestCarbon_tCo2e']+' tonnes per year ';
  //ton.append(point_data.nvp_results['ForestCarbon_tCo2e']+' tonnes per year ');
  let price = document.getElementById('price');
  price.innerText = point_data.nvp_results['ROI_NPV_USDperYear']+' per year';
  //price.append('$ '+point_data.nvp_results['ROI_NPV_USDperYear']+' per year');
  let analysis = document.getElementById('analysis');

  let projectDurationOp = document.getElementById('projectDurationOp');
  projectDurationOp.innerText = 'Carbon Project Duration (years): '+point_data.nvp_results['projectDurationOp'];
  let developmentCostOp = document.getElementById('developmentCostOp');
  developmentCostOp.innerText = 'Project Establishment Cost ($/ha): '+point_data.nvp_results['developmentCostOp'];
  let maintenanceCostOp = document.getElementById('maintenanceCostOp');
  maintenanceCostOp.innerText = 'Project Annual Maintenance Cost ($/ha): '+point_data.nvp_results['maintenanceCostOp'];
  let carbonPriceOp = document.getElementById('carbonPriceOp');
  carbonPriceOp.innerText = 'Starting Carbon Price for first 5 Years ($/ton): '+point_data.nvp_results['carbonPriceOp'];
  let annualAppreciationOp = document.getElementById('annualAppreciationOp');
  annualAppreciationOp.innerText = 'Carbon Price Appreciation for Subsequent Years ($): '+point_data.nvp_results['annualAppreciationOp'];
  let discountRateOp = document.getElementById('discountRateOp');
  discountRateOp.innerText = 'NPV Discount Rate (%): '+point_data.nvp_results['discountRateOp'];
  console.log("analysis::")
  console.log(document.getElementById('projectDuration').value)
  console.log("analysis")
  console.log(analysis)
  if (point_data.nvp_results['ROIperYear'] > 0){
    analysis.innerText = 'A ROI is positive, which indicates that the projected revenues from carbon credits, ecosystem services, and other benefits exceed the costs of forest conservation, restoration, and management. This suggests that the project is financially viable and will generate a profit over its lifespan.'
    console.log(analysis)
  } else if (point_data.nvp_results['ROIperYear'] <= 0){
    analysis.innerText = 'A ROI is negative, that indicates that the project results in a financial loss, meaning the costs are greater than the expected returns. This outcome, while undesirable financially, may still offer crucial environmental and social benefits, such as carbon sequestration and biodiversity conservation.'
    console.log(analysis)
  }

  // Show the past annual mean agb chart in the modal
  const x_year = point_data.year
  const annual_mean = point_data.annual_mean
  const annual_carbon = point_data.annual_carbon
  console.log("x_year")
  console.log(x_year)
  console.log(annual_mean)
  chart_annual_mean.load({
    columns: [
      ['x'].concat(x_year),
      ['data'].concat(annual_mean)],
  });
  chart_annual_carbon.load({
    columns: [
      ['x'].concat(x_year),
      ['data'].concat(annual_carbon)],
  });

  const npv_year = point_data.npv_years
  const npv_values = point_data.npv_values
  console.log("npv_year")
  console.log(npv_year)
  console.log(npv_values)
  chart_ROI_NPV_USDperYear.load({
    columns: [
      ['x'].concat(npv_year),
      ['data'].concat(npv_values)],
  });
  
  //Show the polygon map in the modal
  showPolyMap(polygonCoordinates);
};

//Function to show the polygon map inside the modal
function showPolyMap(polygonCoordinates) {
  console.log("Inside showPolyMap")
  console.log([polygonCoordinates[0][1][0], polygonCoordinates[0][0][1]])
  // Initialize the map in the modal
  var modMap = new mapboxgl.Map({
      container: 'modalMap',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [polygonCoordinates[0][0][0], polygonCoordinates[0][0][1]], // Center the map initially
      zoom: 7, // Adjust zoom level
      preserveDrawingBuffer: true
  });

  // Add the polygon to the modal map
  modMap.on('load', function () {
      modMap.resize();
      modMap.addSource('polygon', {
          'type': 'geojson',
          'data': {
              'type': 'Feature',
              'geometry': {
                  'type': 'Polygon',
                  'coordinates': polygonCoordinates
              }
          }
      });
      modMap.addLayer({
          'id': 'polygonLayer',
          'type': 'fill',
          'source': 'polygon',
          'layout': {},
          'paint': {
              'fill-color': '#800069',
              'fill-opacity': 0.4
          }
      });

      // Fit the map to the polygon bounds
      const bounds = polygonCoordinates[0].reduce(function (bounds, coord) {
          return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(
        { lng: polygonCoordinates[0][0][0], lat: polygonCoordinates[0][0][1] },
        { lng: polygonCoordinates[0][1][0], lat: polygonCoordinates[0][1][1] }
        ));

      modMap.fitBounds(bounds, {
          padding: 1
      });
  });

  $('#barModal').on('shown.bs.modal', function() {
    modMap.resize();
  });
}
