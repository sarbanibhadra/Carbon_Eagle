const config_legend = {
    legendColors: ['#d9dbdb','#afd709', '#62b20f', '#40810f', "#3a610f", "#284e2b", '#234d2b' ],

    legendValues: [25, 50, 75, 100, 125, 150, 175],
  };
  
  /**
 * Builds out a legend from the viz layer
 */
 const buildLegend = () => {
    const legend = document.getElementById('legend');
    const legendColors = document.getElementById('legend-colors');
    const legendValues = document.getElementById('legend-values');
    legend.classList.add('block-ml');
  
    config_legend.legendValues.forEach((stop, idx) => {
      const key = `<div class='col h12' style='background-color:${config_legend.legendColors[idx]}'></div>`;
      const value = `<div class='col align-center'>${stop}</div>`;
      legendColors.innerHTML += key;
      legendValues.innerHTML += value;
    });    
  };
