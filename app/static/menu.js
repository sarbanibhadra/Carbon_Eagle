const select_year = document.getElementById('select-year');
console.log(document.getElementById('layer1-checkbox'))

function checkOnlyOne(checkbox) {
    const checkboxes = document.getElementsByName('layer-checkbox');
    checkboxes.forEach((item) => {
      if (item !== checkbox) {
        item.checked = false;
      }
    });
  }

select_year.addEventListener('change', (e) => {
    var isl1Checked = document.getElementById('layer1-checkbox').checked;
    var isl2Checked = document.getElementById('layer2-checkbox').checked;
    if (isl1Checked){
      updateDataLayer(e.target.value, 'agb');
    }
    if (isl2Checked){
      updateDataLayer(e.target.value, 'carbon');
    }
  });

const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');  
const waiting = () => {
    if (!map.isStyleLoaded()) {
      setTimeout(waiting, 200);
    } else {
      console.log(" check check check")
      addDataLayer(select_year.value);  
    }
  };
  
map.on('style.load', () => {
    waiting();
  });

map.on('idle', () => {
    for (const input of inputs) {
      input.onclick = (layer) => {
        const layerId = layer.target.id;
        if (layer.target.type == 'radio'){
          map.setStyle('mapbox://styles/jntuccella/' + layerId + '/draft');
        }
        else if (layer.target.type == 'checkbox') {
          const visibility = map.getLayoutProperty(
            'NO2 layer FR',
            'visibility'
            );
  
          if (visibility === 'visible') {
              map.setLayoutProperty('NO2 layer FR', 'visibility', 'none');
              
  
          } else {
              map.setLayoutProperty('NO2 layer FR', 'visibility','visible');
              
            }
      }
      };
      }
      
    });


