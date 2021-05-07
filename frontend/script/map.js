$(document).on('click', '#btn-modal-endereco', function () {
    map.resize();
});

mapboxgl.accessToken = 'pk.eyJ1IjoiZG9nc3RlcHMiLCJhIjoiY2syamJ0dW0wMXBycTNjdGdtOWw2bzdlciJ9.4nNwhazChxwj1pYZ1ZbNEg';
let styleMap = 'mapbox://styles/mapbox/streets-v11';
let coodenadaInicial = [-43.938748, -19.932998];//longitude - latitude
let zoom = 14.5;
var limites = [[-44.30099, -19.75636], [-43.61984, -20.07915]];

var map = new mapboxgl.Map({
    container: 'map',
    style: styleMap,
    center: coodenadaInicial,
    zoom: zoom,
});

let geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker: false,
    placeholder: 'Search',
    marker: {
        color: 'orange'
    },
    mapboxgl: mapboxgl,
    proximity: {
        longitude: coodenadaInicial[0],
        latitude: coodenadaInicial[1]
    }


})

map.addControl(geocoder);

