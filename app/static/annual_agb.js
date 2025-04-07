
  /**
 * Builds out the graph with GlobeEye's health indicator
 */

  var gauge_population = c3.generate({
    bindto: '#gauge_population',
      data: {
          columns: [
              ['Good', 0],
              ['Moderate', 0],
              ['Poor', 0],
              ['Very poor', 0],
              ['Severe', 0],
          ],
          colors: {
            "Good": '#60B044',
            "Moderate": '#F6C600',
            "Poor": '#F97600',
            "Very poor" :  '#FF0000',
            "Severe": '#000000'
        },
        
          type : 'donut',
          onclick: function (d, i) { console.log("onclick", d, i); },
          onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          onmouseout: function (d, i) { console.log("onmouseout", d, i); }
      },
      donut: {
          title: "Population Exposure"
      }
  });
  
  console.log("Inside js")
  
  const updateExposureChart = (result) => {
    console.log(result)
  
    gauge_population.load({
      columns: [
          ["Good", result.percent_good],
          ["Moderate", result.percent_moderate],
          ["Poor", result.percent_poor],
          ["Very poor", result.percent_very_poor],
          ["Severe", result.percent_severe],
      ]
    });
  
      const panel = expan_exposure.nextElementSibling;
      if (!panel.style.maxHeight) {
        expan_exposure.classList.toggle("active");
        panel.style.maxHeight = panel.scrollHeight + "px";  
      }
    };
  
  
  const chart_annual_mean = c3.generate({
    bindto: '#chart_annual_mean',
    data: {
      x : 'x',
      // TODO make the initial chart have as many points as the number of fields
      columns: [
        ['x', 2021]
        
        ['data', 0]],
      names: { data: 'Concentration annual mean (μg/m3)' },
      // To make a bar chart uncomment this line
      type: 'bar',
      colors: {
        data: '#3785d4',
    },
    },
    grid: {
      y: {
          lines: [
              {value: 10, text: 'WHO Guideline Value', position: 'end'},
          ]
      }
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
  
  const chart_daily_concentration = c3.generate({
    bindto: '#chart_daily_concentration',
    data: {
      // TODO make the initial chart have as many points as the number of fields
      x: 'x',
      columns: [
        ["x",  "2020-01-01"],
        ["data", 0]],
      names: { data: 'Daily Estimated Concetration(μg/m3)'},
      // To make a bar chart uncomment this line
      type: 'line',
      colors: {
        data: '#3785d4',
    },
    },
  
    grid: {
      y: {
          lines: [
              {value: 25, text: 'WHO Guideline Value', position: 'end', },
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
  
  const gauge_exposure = c3.generate({
    bindto: '#gauge_exposure',
    data: {
        columns: [
            ['% days above WHO guideline value', 0]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    gauge: {
  
    },
    color: {
        pattern: ['#60B044', '#F6C600', '#F97600', '#FF0000'],
        threshold: {
  //            unit: 'value', // percentage is default
  //            max: 200, // 100 is default
            values: [30, 60, 90, 100]
        }
    },
    size: {
        height: 180
    }
  });
  
  
  const updatePointChart = (point_data) => {
    console.log(point_data)
    const x_year = point_data.year
    const annual_mean = point_data.annual_mean
  
  
    chart_annual_mean.load({
      columns: [
        ['x'].concat(x_year),
        ['data'].concat(annual_mean)],
    });
  

  
  
    // open expansion panel
    const panel = expan_exposure.nextElementSibling;
    if (!panel.style.maxHeight) {
      panel.style.maxHeight = panel.scrollHeight + "px";  
    }
  };
  
  
  /**
   * Open/Close expansion panel
   */
  
  const expan_exposure = document.getElementById("expansion_exposure");
  console.log("expan_exposure== "+ expan_exposure)
  
  expan_exposure.addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } 
    });
  
//   /**
//  * Builds out the graph with annual mean agb
//  */
// const chart_annual_mean = c3.generate({
//   bindto: '#chart_annual_mean',
//   data: {
//     x : 'x',
//     // TODO make the initial chart have as many points as the number of fields
//     columns: [
//       ['x', 2021]
      
//       ['data', 0]],
//     names: { data: 'Concentration annual mean (μg/m3)' },
//     // To make a bar chart uncomment this line
//     type: 'bar',
//     colors: {
//       data: '#3785d4',
//   },
//   },
//   grid: {
//     y: {
//         lines: [
//             {value: 10, text: 'WHO Guideline Value', position: 'end'},
//         ]
//     }
//   },
//   axis: {
//     x: {
//       type: 'category',
//     },

//     y: {
//       max: 50,
//       min: 0, 
//       padding: {top: 0, bottom: 0}
//   }
//   },
//   size: {
//     height: 200,
//   },
  
// });


// const updatePointChart = (point_data) => {
//   console.log(point_data)
//   const x_year = point_data.year
//   const annual_mean = point_data.annual_mean


//   chart_annual_mean.load({
//     columns: [
//       ['x'].concat(x_year),
//       ['data'].concat(annual_mean)],
//   });

  
  

//   // open expansion panel
// //   const panel = expan_exposure.nextElementSibling;
// //   if (!panel.style.maxHeight) {
// //     expan_indus.classList.toggle("active");
// //     panel.style.maxHeight = panel.scrollHeight + "px";  
// //   }
// };


// /**
//  * Open/Close expansion panel
//  */

// // const expan_exposure = document.getElementById("expansion_exposure");

// // expan_exposure.addEventListener("click", function() {
// //     this.classList.toggle("active");
// //     var panel = this.nextElementSibling;
// //     if (panel.style.maxHeight) {
// //       panel.style.maxHeight = null;
// //     } else {
// //       panel.style.maxHeight = panel.scrollHeight + "px";
// //     } 
// //   });
