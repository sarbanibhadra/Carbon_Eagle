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
        modalprop.style.display = "none";
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
  return new Promise(resolve => {
    const chart1 = document.getElementById("chart_annual_mean");
    const chart2 = document.getElementById("chart_ROI_NPV_USDperYear");
    const areaField = document.getElementById("area");
    const tonField = document.getElementById("ton");
    const priceField = document.getElementById("price");

    const check = setInterval(() => {
      if (
        chart1 && chart1.childElementCount > 0 &&
        chart2 && chart2.childElementCount > 0 &&
        areaField && areaField.textContent.trim() !== "" &&
        tonField && tonField.textContent.trim() !== "" &&
        priceField && priceField.textContent.trim() !== ""
      ) {
        clearInterval(check);

        // invoke callback and if it returns a promise, wait on it
        const result = callback();
        if (result && typeof result.then === "function") {
          result.then(resolve);
        } else {
          resolve(result);
        }
      }
    }, 300);
  });
}


function insertMapScreenshotInModalMap() {
  const modalMap = document.getElementById("modalMap");
  // 1) remove every child (including the WebGL <canvas>)
  while (modalMap.firstChild) modalMap.removeChild(modalMap.firstChild);

  // 2) draw the screenshot image
  const imgData = map.getCanvas().toDataURL("image/png");
  const img = new Image();
  img.src = imgData;
  img.style.width  = "100%";
  img.style.height = "auto";
  modalMap.appendChild(img);
}

function exportReportAsPdf() {
  const element = document.getElementById("RevenueReport");
  insertMapScreenshotInModalMap();
  const rawName = document.getElementById('projectNameInput').value.trim() || 'Report';
  const safeName = rawName.replace(/\s+/g,'_').replace(/[^\w\-]/g,'');
  html2canvas(element, {
    scale:    2,
    useCORS:  true,
    scrollY:  0,
    ignoreElements: el => el.tagName.toLowerCase() === "canvas"
  })
  .then(canvas => {
    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("portrait", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const scaleFactor = pdfWidth / canvas.width;
    const pdfHeight = canvas.height * scaleFactor;
    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${safeName}_Revenue_Report.pdf`);
  })
  .catch(err => console.error("Error generating PDF:", err));
}

document.getElementById("savePdfBtn").addEventListener("click", () => {
  waitForChartsAndDataToRender(exportReportAsPdf);
});

function closePropModal() {
  const el = document.getElementById('propModal');
  bootstrap.Modal.getOrCreateInstance(el).hide();
}
function closeBarModal() {
  const el = document.getElementById('barModal');
  bootstrap.Modal.getOrCreateInstance(el).hide();
}

function saveProjectToDB() {
  // 1) basic checks
  const projectName = document.getElementById('projectNameInput').value.trim();
  if (!projectName) {
    alert('Project name is required!');
    return;
  }
  const feature = draw.getAll().features[0];
  if (!feature) {
    alert('Draw a polygon first!');
    return;
  }

  // 2) read summary fields
  const acres                = parseFloat(document.getElementById('area').innerText.replace(/[^0-9.\-]/g, '')) || 0;
  const annual_co2           = parseFloat(document.getElementById('ton').innerText.replace(/[^0-9.\-]/g, '')) || 0;
  const roi_per_year         = parseFloat(document.getElementById('price').innerText.replace(/[^0-9.\-]/g, ''))    || 0;

  // 3) read assumptions inputs
  const project_duration     = parseFloat(document.getElementById('projectDuration').value)    || 0;
  const development_cost     = parseFloat(document.getElementById('developmentCost').value)    || 0;
  const maintenance_cost     = parseFloat(document.getElementById('maintenanceCost').value)    || 0;
  const carbon_price         = parseFloat(document.getElementById('carbonPrice').value)        || 0;
  const annual_appreciation  = parseFloat(document.getElementById('annualAppreciation').value) || 0;
  const discount_rate        = parseFloat(document.getElementById('discountRate').value)       || 0;

  // 4) read analysis text
  const analysis_summary     = document.getElementById('analysis').innerText.trim();

  // 5) extract chart data from C3 instances
  function extractChartData(chart) {
    // returns [ [ 'x', ...years ], [ 'data', ...values ] ]
    const datasets = chart.data();
    // assume first dataset is x/data
    const series = datasets[0];
    const xcol = ['x'].concat(series.values.map(pt => pt.x));
    const ycol = [series.id].concat(series.values.map(pt => pt.value));
    return { x: xcol.slice(1), values: ycol.slice(1) };
  }
  const agbData    = extractChartData(chart_annual_mean);
  const carbonData = extractChartData(chart_annual_carbon);
  const npvData    = extractChartData(chart_ROI_NPV_USDperYear);

  // 6) build the single report_data object
  const report = {
    geometry: feature.geometry,
    summary: {
      acres: acres,
      co2: annual_co2,
      roi: roi_per_year
    },
    assumptions: {
      project_duration,
      development_cost,
      maintenance_cost,
      carbon_price,
      annual_appreciation,
      discount_rate
    },
    analysis: analysis_summary,
    charts: {
      agb:    { x: agbData.x,    values: agbData.values },
      carbon: { x: carbonData.x, values: carbonData.values },
      npv:    { x: npvData.x,    values: npvData.values }
    }
  };

  // 7) assemble full payload
  const payload = {
    user_id: 1,
    project_name: projectName,
    coordinates: JSON.stringify(feature.geometry),
    acres: acres,
    annual_equivalent_co2: annual_co2,
    roi_per_year: roi_per_year,
    report_data: JSON.stringify(report)
  };

  // 8) send to server
  fetch('/add_project', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      // refresh UI
      refreshMapProjects();
      refreshSidebar();
      // hide modal
      bootstrap.Modal.getOrCreateInstance(document.getElementById('barModal')).hide();
    })
    .catch(err => {
      console.error('Save project failed', err);
      alert('Failed to save project');
    });
}







document.getElementById('saveProjectBtn').addEventListener('click', () => {
  waitForChartsAndDataToRender(saveProjectToDB)
  .then(() => {
    refreshMapProjects();
    refreshSidebar();
    const modalEl = document.getElementById('barModal');
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
    modalInstance.hide();
  })
  .catch(err => console.error('error in waitForChartsAndDataToRender:', err));

});
