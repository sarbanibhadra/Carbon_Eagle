var modallayer = document.getElementById("layerModal");
var modalprop = document.getElementById("propModal");
var modalbar = document.getElementById("barModal");
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

class CalculatorControl {
  onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';

    // Adding button to calculate forest carbon data
    this._button = document.createElement('button');
    this._button.className = 'mapbox-gl-draw_ctrl-draw-btn mapboxgl-ctrl-icon custom-button';
    this._button.type = 'button';
    this._button.title = 'Calculate Forest Carbon Data';
    this._button.innerHTML = '<div id="openModalBtn" align="middle"><i class="fas fa-calculator" aria-hidden="true"></i></div>';
    this._button.onclick = function() {
      const draw_data = draw.getAll().features[0];
      if (draw_data == null){
        alert("Please draw an polygon to define the area of interest!")
        return;
      } else {
        // modalprop.style.display = "block";
        $('#propModal').modal('show');
      
      }
    };
    this._container.appendChild(this._button);

    // Adding button to display layers
    this._button = document.createElement('button');
    this._button.className = 'mapbox-gl-draw_ctrl-draw-btn mapboxgl-ctrl-icon custom-button';
    this._button.type = 'button';
    this._button.title = 'Display Different Map Layers';
    this._button.innerHTML = '<div  class="layer-icon" id="open-modal" align="middle"><i class="fas fa-layer-group" aria-hidden="true"></i></div>';
    this._button.onclick = function() {
      console.log(modallayer)
      // modallayer.style.display = "block";
      // Bootstrap upgrade
      $('#layerModal').modal('show');
      console.log("modallayer")
    };
    this._container.appendChild(this._button);


  
    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

map.addControl(new CalculatorControl());

// map.on('draw.create', updateArea);
// map.on('draw.delete', updateArea);
// map.on('draw.update', updateArea);
 
function updateArea(e) {
  const draw_data = draw.getAll().features[0];
  $.ajax({
    type: "POST",
    url: "/agb_polygon_exposure",
    data: JSON.stringify(draw_data.geometry),
    //data: JSON.stringify([date, type]),
    contentType: "application/json",
    dataType: 'json',
    success: function(result) {
    //updateExposureChart(result)
        // window.latestCarbonData = result; // Store the results of the calculation for csv/pdf download
        console.log(result)
        //updatePointChart(result)
        //openPopupWithContent(result);
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
      window.latestCarbonData = result; // Store the results of the calculation for csv/pdf download
      updatePointChart(result)
    } 
  });
}

// function openPopupWithContent(result) {
//   // Set the dimensions of the popup window
//   const width = 600;
//   const height = 400;

//   // Calculate the top and left positions to center the popup
//   const left = (window.screen.width / 2) - (width / 2);
//   const top = (window.screen.height / 2) - (height / 2);

//   // Open the popup window with the specified dimensions and position
//   const popupWindow = window.open(
//       'http://127.0.0.1:5000/annual_mean_agb', // URL of the popup window HTML file
//       'AnnualMeanAGB', // Name of the popup window
//       `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
//   );

//   // Pass data to the popup window after it has loaded
//   popupWindow.onload = function() {
//       popupWindow.postMessage(result, '*');
//   };
// }

// Function to create the bar chart
function createCarbonBarChart() {
  const all_features = draw.getAll().features;
  let draw_data = '';
  // Check if there are any features
  if (all_features && all_features.length > 0) {
      // Access the latest feature (the last one in the array)
      draw_data = all_features[all_features.length - 1];
      console.log("draw_data.geometry=");
      console.log(draw_data.geometry);
  }else {
    console.error("No features available");
  }
  // Access the first feature in the array
  // const draw_data = draw.getAll().features[0];
  const projectDuration = document.getElementById('projectDuration').value;
  const developmentCost = document.getElementById('developmentCost').value;
  const maintenanceCost = document.getElementById('maintenanceCost').value;
  const carbonPrice = document.getElementById('carbonPrice').value;
  const annualAppreciation = document.getElementById('annualAppreciation').value;
  const discountRate = document.getElementById('discountRate').value;
  const project_variables = {
    'projectDuration': projectDuration,
    'developmentCost': developmentCost,
    'maintenanceCost': maintenanceCost,
    'carbonPrice': carbonPrice,
    'annualAppreciation': annualAppreciation,
    'discountRate': discountRate
  }
  const project_variables_dict = {...project_variables, ...draw_data.geometry};
  console.log("project_variables=")
  console.log(document.getElementById('projectDuration').value)
  console.log(project_variables_dict)
  $.ajax({
    type: "POST",
    url: "/agb_polygon_exposure",
    data: JSON.stringify(project_variables_dict),
    contentType: "application/json",
    dataType: 'json',
    success: function(result) {
    //updateExposureChart(result)
      window.latestCarbonData = result; // Store the results of the calculation for csv/pdf download
      updatePointChart(result)
    },
    error: function(xhr, status, error) {
      console.log("Error:", error);
      console.log("Status:", status);
      console.log("Response:", xhr.responseText);
    } 
  });  
}

// Trigger the modal display process
document.getElementById('calculateButton').onclick = function(e) {
        e.preventDefault();
        // modalprop.style.display = "none";
        $('#propModal').modal('hide');
        // Performing calculations
        createCarbonBarChart();
        // Show the waiting status
        const waitingStatus = document.getElementById('waitingStatus');
        waitingStatus.style.display = 'block';
        // Simulate a delay (e.g., loading data) before showing the modal
        setTimeout(function() {
            // Hide the waiting status
            waitingStatus.style.display = 'none';
            // Display the modal window
            // modalbar.style.display = "block";
            $('#barModal').modal('show');
        }, 8000); // Adjust the delay as needed (2000ms = 2 seconds)
}


function waitForChartsAndDataToRender(callback) {
  const chart1 = document.getElementById("chart_annual_mean");
  const chart2 = document.getElementById("chart_ROI_NPV_USDperYear");
  const areaField = document.getElementById("area");
  const tonField = document.getElementById("ton");
  const priceField = document.getElementById("price");

  const check = setInterval(() => {
    if (chart1 && chart1.childElementCount > 0 &&
        chart2 && chart2.childElementCount > 0 &&
        areaField && areaField.textContent.trim() !== "" &&
        tonField && tonField.textContent.trim() !== "" &&
        priceField && priceField.textContent.trim() !== "") {
      clearInterval(check);
      callback();
    }
  }, 300);
}

function insertMapScreenshotInModalMap() {
  // Verify that the map object exists
  if (typeof map !== 'undefined') {
    // Get the Mapbox canvas element
    const canvas = map.getCanvas();
    // Generate an image data URL from the canvas
    const imgData = canvas.toDataURL("image/png");
    // Get the container that holds the interactive map
    const modalMap = document.getElementById("modalMap");
    // Create an image element with the screenshot
    const img = document.createElement("img");
    img.src = imgData;

    img.style.width = "100%";
    img.style.height = "auto";
    // Replace the interactive map content with the static screenshot image
    modalMap.innerHTML = "";
    modalMap.appendChild(img);
  } else {
    console.error("Map object is not defined.");
  }
}

function exportReportAsPdf() {
  const element = document.getElementById("RevenueReport");
  
  // Replace the interactive map with a screenshot image
  insertMapScreenshotInModalMap();
  
  // Use html2canvas to capture the updated RevenueReport including the map screenshot
  html2canvas(element, {
    scale: 2,
    useCORS: true,
    scrollY: 0
  })
  .then(canvas => {
    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("portrait", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const scaleFactor = pdfWidth / canvas.width;
    const pdfHeight = canvas.height * scaleFactor;
    
    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

  })
  .catch(error => {
    console.error("Error generating PDF:", error);
  });
}

document.getElementById("savePdfBtn").addEventListener("click", () => {
  waitForChartsAndDataToRender(() => {
    exportReportAsPdf();
  })
});
