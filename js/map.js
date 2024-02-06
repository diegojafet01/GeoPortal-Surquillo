// Cremos un objeto mapa
var map = L.map("map").setView([-12.121323, -77.029504], 14);
// map.zoomControl.remove();

//Enlazar el Open Street Map
var osm = L.tileLayer(
  "https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
).addTo(map);
var miniMap = new L.Control.MiniMap(L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'), {
    toggleDisplay: true // Permite mostrar/ocultar el minimapa con un botón
}).addTo(map);
// Obtiene el elemento select de capa de mapa
var mapLayerSelect = document.getElementById("map-layer");

// Agrega un evento de cambio al elemento select
mapLayerSelect.addEventListener("change", function () {
  // Obtiene el valor seleccionado
  var selectedLayer = mapLayerSelect.value;

  // Remueve las capas existentes
  // Remueve las capas existentes
  map.eachLayer(function (layer) {
    map.removeLayer(layer);
  });

  // Crea y agrega la nueva capa seleccionada
  switch (selectedLayer) {
    case "osm":
      osm.addTo(map);
      break;
    case "google-satellite"://SATELLITE
      var googleSatellite = L.tileLayer(
        "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
        {
          type: "satellite",
        }
      );
      googleSatellite.addTo(map);
      break;
    case "google-hybrid"://HYBRID
      var googleHybrid = L.tileLayer(
        "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
        {
          type: "hybrid",
        }
      );
      googleHybrid.addTo(map);
      break;
    case "google-terrain"://TERRAIN
      var googleTerrain = L.tileLayer(
        "https://mt1.google.com/vt/lyrs=t&x={x}&y={y}&z={z}",
        {
          type: "terrain",
        }
      );
      googleTerrain.addTo(map);
      break;
    case "google-traffic"://TRAFFIC
    var googleTraffic = L.tileLayer(
      "https://mt1.google.com/vt?lyrs=h@159000000,traffic|seconds_into_week:-1&style=3&x={x}&y={y}&z={z}",
      {
        type: "trafic",
      }
    );
    googleTraffic.addTo(map);
    break;
    case "google-roads"://ROADS
      var googleRoads = L.tileLayer(
        "https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}",
        {
          type: "roads",
        }
      );
      googleRoads.addTo(map);
      break;
    default:
      osm.addTo(map);
  }
});

//Enlazar servicios EMS
var zonas = L.tileLayer
  .wms("http://localhost:8080/geoserver/seguridad_surquillo/wms?", {
    Layers: "zonas",
    format: "image/png",
    transparent: true,
  })
  .addTo(map);
var delitos = L.tileLayer
  .wms("http://localhost:8080/geoserver/seguridad_surquillo/wms?", {
    Layers: "pg_delitos",
    format: "image/png",
    transparent: true,
  })
  .addTo(map);

//Controlador de Capas
var baseMaps = {};
var wms = {
  Zonas: zonas,
  Delitos: delitos,
};

// Crea un botón para buscar
var buscarBtn = L.control({ position: "topleft" });

buscarBtn.onAdd = function (map) {
  var container = L.DomUtil.create(
    "div",
    "leaflet-control leaflet-control-custom"
  );
  container.innerHTML =
    '<button class="btn btn-secondary btn-sm" onclick="buscarDatos()" title="Buscar"> <i class="fas fa-search"></i></button>';

  L.DomEvent.disableClickPropagation(container);
  L.DomEvent.on(container, "mouseover", function () {
    var tooltip = L.tooltip({
      permanent: true,
      className: "leaflet-tooltip-custom",
      direction: "bottom",
      opacity: 0.7,
    }).setContent("Buscar");

    container._tooltip = tooltip;
    tooltip.setLatLng(container._latlng).addTo(map);
  });

  L.DomEvent.on(container, "mouseout", function () {
    map.closeTooltip();
  });

  return container;
};

buscarBtn.addTo(map);

function buscarDatos() {
  // Aquí puedes agregar la lógica para buscar datos en tu mapa
  alert("Función de búsqueda de datos aún no implementada");
}


L.control.layers(baseMaps, wms).addTo(map);
// Crea botones de zoom anterior y zoom siguiente
var zoomAnteriorBtn = L.control({ position: "topleft" });
var zoomSiguienteBtn = L.control({ position: "topleft" });

zoomAnteriorBtn.onAdd = function (map) {
  var container = L.DomUtil.create(
    "div",
    "leaflet-control leaflet-control-custom"
  );
  container.innerHTML =
    '<button class="btn btn-secondary btn-sm" onclick="zoomAnterior()" title="Zoom Anterior"> <i class="fas fa-search-minus"></i></button>';

  // Agrega un tooltip usando el plugin de Leaflet
  L.DomEvent.disableClickPropagation(container); // Evita que el click en el botón active el mapa
  L.DomEvent.on(container, "mouseover", function () {
    var tooltip = L.tooltip({
      permanent: true,
      className: "leaflet-tooltip-custom",
      direction: "bottom",
      opacity: 0.7,
    }).setContent("Zoom Anterior");

    container._tooltip = tooltip;
    tooltip.setLatLng(container._latlng).addTo(map);
  });

  L.DomEvent.on(container, "mouseout", function () {
    map.closeTooltip();
  });

  return container;
};

zoomSiguienteBtn.onAdd = function (map) {
  var container = L.DomUtil.create(
    "div",
    "leaflet-control leaflet-control-custom"
  );
  container.innerHTML =
    '<button class="btn btn-secondary btn-sm" onclick="zoomSiguiente()" title="Zoom Siguiente"> <i class="fas fa-search-plus"></i></button>';

  // Agrega un tooltip usando el plugin de Leaflet
  L.DomEvent.disableClickPropagation(container);
  L.DomEvent.on(container, "mouseover", function () {
    var tooltip = L.tooltip({
      permanent: true,
      className: "leaflet-tooltip-custom",
      direction: "bottom",
      opacity: 0.7,
    }).setContent("Zoom Siguiente");

    container._tooltip = tooltip;
    tooltip.setLatLng(container._latlng).addTo(map);
  });

  L.DomEvent.on(container, "mouseout", function () {
    map.closeTooltip();
  });

  return container;
};

zoomSiguienteBtn.addTo(map);
zoomAnteriorBtn.addTo(map);


// Funciones para controlar el zoom
function zoomAnterior() {
  map.zoomOut();
}

function zoomSiguiente() {
  map.zoomIn();
}

// Crea un botón para imprimir el mapa
var imprimirBtn = L.control({ position: "topleft" });

imprimirBtn.onAdd = function (map) {
  var container = L.DomUtil.create(
    "div",
    "leaflet-control leaflet-control-custom"
  );
  container.innerHTML =
    '<button class="btn btn-secondary btn-sm" onclick="imprimirMapa()" title="Imprimir Mapa"> <i class="fas fa-print"></i></button>';

  L.DomEvent.disableClickPropagation(container);
  L.DomEvent.on(container, "mouseover", function () {
    var tooltip = L.tooltip({
      permanent: true,
      className: "leaflet-tooltip-custom",
      direction: "bottom",
      opacity: 0.7,
    }).setContent("Imprimir Mapa");

    container._tooltip = tooltip;
    tooltip.setLatLng(container._latlng).addTo(map);
  });

  L.DomEvent.on(container, "mouseout", function () {
    map.closeTooltip();
  });

  return container;
};

imprimirBtn.addTo(map);

function imprimirMapa() {
  // Aquí puedes agregar la lógica para imprimir el mapa
  alert("Función de impresión de mapa aún no implementada");
}

// Crea un botón para maximizar
var maximizarBtn = L.control({ position: "topleft" });

maximizarBtn.onAdd = function (map) {
  var container = L.DomUtil.create(
    "div",
    "leaflet-control leaflet-control-custom"
  );
  container.innerHTML =
    '<button class="btn btn-secondary btn-sm" onclick="maximizarMapa()" title="Maximizar Extensión"> <i class="fas fa-expand"></i></button>';

  L.DomEvent.disableClickPropagation(container);
  L.DomEvent.on(container, "mouseover", function () {
    var tooltip = L.tooltip({
      permanent: true,
      className: "leaflet-tooltip-custom",
      direction: "bottom",
      opacity: 0.7,
    }).setContent("Maximizar Extensión");

    container._tooltip = tooltip;
    tooltip.setLatLng(container._latlng).addTo(map);
  });

  L.DomEvent.on(container, "mouseout", function () {
    map.closeTooltip();
  });

  return container;
};

maximizarBtn.addTo(map);

function maximizarMapa() {
  // Reemplaza las coordenadas con las coordenadas que desees para la extensión máxima
  map.setView([-12.121323, -77.029504], 14);
}
L.control.scale().addTo(map);
// Crea un botón para mostrar coordenadas
var coordenadasBtn = L.control({ position: "topleft" });

coordenadasBtn.onAdd = function (map) {
  var container = L.DomUtil.create(
    "div",
    "leaflet-control leaflet-control-custom"
  );
  container.innerHTML =
    '<button class="btn btn-secondary btn-sm" onclick="toggleCoordenadas()" title="Mostrar Coordenadas"> <i class="fas fa-mouse-pointer"></i></button>';

  L.DomEvent.disableClickPropagation(container);
  L.DomEvent.on(container, "mouseover", function () {
    var tooltip = L.tooltip({
      permanent: true,
      className: "leaflet-tooltip-custom",
      direction: "bottom",
      opacity: 0.7,
    }).setContent("Mostrar Coordenadas");

    container._tooltip = tooltip;
    tooltip.setLatLng(container._latlng).addTo(map);
  });

  L.DomEvent.on(container, "mouseout", function () {
    map.closeTooltip();
  });

  return container;
};

coordenadasBtn.addTo(map);

// Función para alternar la visualización de las coordenadas
function toggleCoordenadas() {
  if (map.hasLayer(coordenadasLayer)) {
    map.removeLayer(coordenadasLayer);
  } else {
    map.addLayer(coordenadasLayer);
  }
}

// Capa para mostrar las coordenadas al pasar el mouse sobre el mapa
var coordenadasLayer = L.tooltip();

map.on('mousemove', function(e) {
    coordenadasLayer.setLatLng(e.latlng).setContent("Latitud: " + e.latlng.lat.toFixed(4) + ", Longitud: " + e.latlng.lng.toFixed(4));
});
