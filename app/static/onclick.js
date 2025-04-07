map.on('click', (e) => {
    console.log(draw.getMode())
    const point = e.point
    console.log(point)
 });


map.on('dblclick', e => {
  add_marker(e);
  })