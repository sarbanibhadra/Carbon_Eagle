
  /**
 * Builds out the graph for industrial self-reported data.
 */

const chart_indus = c3.generate({
    bindto: '#chart_indus',
    data: {
      x : 'x',
      // TODO make the initial chart have as many points as the number of fields
      columns: [
        ['x', 2020]
        
        ['data', 0]],
      names: { data: 'Total NOX emission (t)' },
      // To make a bar chart uncomment this line
      type: 'bar',
      colors: {
        data: '#3785d4',
    },
    },
    axis: {
      x: {
        type: 'category',
      },
      y: {
        max: 500,
        min: 0, 
        padding: {top: 0, bottom: 0}
    }
    },
    size: {
      height: 200,
    },
    
  });

const updateChartIndusFromClick = (feature) => {
    const data = JSON.parse(feature.properties.reported_emission);
    const emission = data[0]
    const x_year = data[1] 
  
    chart_indus.load({
      columns: [
        ['x'].concat(x_year),
        ['data'].concat(emission)],
    });
    // open expansion panel
    const panel = expan_indus.nextElementSibling;
    if (!panel.style.maxHeight) {
      expan_indus.classList.toggle("active");
      panel.style.maxHeight = panel.scrollHeight + "px";  
    }
  };
  
  /**
 * Builds out the graph with GlobeEye's industrial indicator.
 */


const chart_indus_predict_year = c3.generate({
  bindto: '#chart_indus_predict_year',
  data: {
    x : 'x',
    // TODO make the initial chart have as many points as the number of fields
    columns: [
      ['x', 2020]
      
      ['data', 0]],
    names: { data: 'Yearly Mean Estimation of Concentration in Surounding Area (μg/m3)' },
    // To make a bar chart uncomment this line
    type: 'bar',
    colors: {
      data: '#3785d4',
  },
  },
  axis: {
    x: {
      type: 'category',
    },
    y: {
      max: 50,
      min: 0, 
      padding: {top: 0, bottom: 0}
  }
  },
  size: {
    height: 200,
  },
  
});

const chart_indus_predict = c3.generate({
    bindto: '#chart_indus_predict',
    data: {
      // TODO make the initial chart have as many points as the number of fields
      x: 'x',
      columns: [
        ["x",  "2020-01-01"],
        ["data", 0]],
      names: { data: 'Daily Mean Estimation of Concentration in Surounding Area (μg/m3)'},
      // To make a bar chart uncomment this line
      type: 'line',
      colors: {
        data: '#3785d4',
    },
    },
    axis: {
      x: {
          type: 'timeseries',
          tick: {
            
            culling: {
              max: 6 // the number of tick texts will be adjusted to less than this value
          },
            format: '%Y-%m-%d'
              
          }
      }, 
      y: {
        max: 110,
        min: 0, 
        padding: {top: 0, bottom: 0}
    }
    },
    size: {
      height: 200,
    },
    point: {
      show: false,
    }, 
    zoom: {
      enabled: true,
  }
  });

const updateChartIndusPredictFromClick = (feature) => {
  const data_day = JSON.parse(feature.properties.model_emission);
  const data_pred_day = data_day[0];
  const x_date = data_day[1];
  chart_indus_predict.load({
    columns: [
      ['x'].concat(x_date),
      ['data'].concat(data_pred_day)
    ],
  });


  const data_year = JSON.parse(feature.properties.annual_mean);
  const data_pred_year = data_year[0];
  const x_year = data_year[1];
  chart_indus_predict_year.load({
    columns: [
      ['x'].concat(x_year),
      ['data'].concat(data_pred_year)
    ],
  });

};


/**
 * Builds out the graph of observation versus model's prediction
 */


const chart_station = c3.generate({
    bindto: '#chart_station',
    data: {
      // TODO make the initial chart have as many points as the number of fields
      x: 'x',
      columns: [
        ["x",  "2020-01-01"],
        ["data1", 0],
        ["data2", 0]],
      names: { data1: 'Ground Concentration NO2 (μg/m3)', data2: 'Model Prediction (μg/m3)', },
      // To make a bar chart uncomment this line
      type: 'line',
      colors: {
        data2: '#3785d4',
        data1: '#fa050d'
    },
    },
    grid: {
      y: {
          lines: [
              {value: 25, text: 'WHO Guideline Value', position: 'end'}
          ]
      }
    },
    axis: {
      x: {
          type: 'timeseries',
          tick: {
            
            culling: {
              max: 6 // the number of tick texts will be adjusted to less than this value
          },
            format: '%Y-%m-%d'
              
          }
      },
      y: {
        max: 110,
        min: 0, 
        padding: {top: 0, bottom: 0}
    }
    },
    size: {
      height: 200,
    },
    point: {
      show: false,
    }, 
    zoom: {
      enabled: true,
  }
  });



const gauge_accuracy = c3.generate({
  bindto: '#gauge_accuracy',
  data: {
      columns: [
          ['Confidence of the Deep Learning model', 100]
      ],
      type: 'gauge',
      onclick: function (d, i) { console.log("onclick", d, i); },
      onmouseover: function (d, i) { console.log("onmouseover", d, i); },
      onmouseout: function (d, i) { console.log("onmouseout", d, i); }
  },
  gauge: {

  },
  color: {
      pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'],
      threshold: {
//            unit: 'value', // percentage is default
//            max: 200, // 100 is default
          values: [10, 40, 70, 100]
      }
  },
  size: {
      height: 180
  }
});
  

const updateChartStationFromClick = (feature) => {
  data_NO2 = JSON.parse(feature.properties.NO2_Concentration);
  data_Pred = JSON.parse(feature.properties.Prediction);
  const x_date = JSON.parse(feature.properties.Dates);
  
  chart_station.load({
    columns: [
      ['x'].concat(x_date),
      ['data1'].concat(data_NO2),
      ['data2'].concat(data_Pred)
    ],
  });
  
  gauge_accuracy.load({
    columns: [['Confidence of the Deep Learning model', (1 - feature.properties.MAPE)*100]]
  });

  const panel = expan_station.nextElementSibling;
  if (!panel.style.maxHeight) {
    expan_station.classList.toggle("active");
    panel.style.maxHeight = panel.scrollHeight + "px";  
  }
};
  

/**
 * Open/Close expansion panel
 */
//const expan_indus = document.getElementById("expansion_indus");
// const expan_station = document.getElementById("expansion_station");

// expan_indus.addEventListener("click", function() {
//     this.classList.toggle("active");
//     var panel = this.nextElementSibling;
//     if (panel.style.maxHeight) {
//       panel.style.maxHeight = null;
//     } else {
//       panel.style.maxHeight = panel.scrollHeight + "px";
//     } 
//   });

// expan_station.addEventListener("click", function() {
//     this.classList.toggle("active");
//     var panel = this.nextElementSibling;
//     if (panel.style.maxHeight) {
//       panel.style.maxHeight = null;
//     } else {
//       panel.style.maxHeight = panel.scrollHeight + "px";
//     } 
//   });






