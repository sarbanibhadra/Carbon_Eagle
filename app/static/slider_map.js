mapboxgl.accessToken = 'pk.eyJ1Ijoiam50dWNjZWxsYSIsImEiOiJja3VyNW84eDIwZzZ3Mm5sbjJ4bmk5ZW5pIn0.pJS-tfqDmr1IfUajBzMggQ';
const beforeMap = new mapboxgl.Map({
container: 'before',
style: 'mapbox://styles/jntuccella/cktwvphku15sk18l980kn20rj',
center: [0, 0],
zoom: 0
});
 
const afterMap = new mapboxgl.Map({
container: 'after',
style: 'mapbox://styles/jntuccella/cktwvqmnu0l4n17o34f3ayg98',
center: [0, 0],
zoom: 0
});
 
// A selector or reference to HTML element
const container = '#comparison-container';
 
const map = new mapboxgl.Compare(beforeMap, afterMap, container, {
// Set this to enable comparing two maps by mouse movement:
});
