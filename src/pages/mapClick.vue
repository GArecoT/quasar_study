<template>
  <div id="container">
    <div id="mapContainer" style="height: 100vh; width: 100vw"></div>
  </div>
  <q-dialog
    v-model="showCity"
    @before-hide="map.setView([-20.79666, -54.37119], 7)"
  >
    <q-card style="width: 600px">
      <q-card-section class="flex justify-center">
        <p style="font-size: 2rem">{{ nomeCidade }}</p>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { onMounted, ref } from 'vue';
import estado_ms from '../utils/estado_ms';

const center = [-20.484657, -54.595946];
const zoom = 7;
const showCity = ref(false);
const nomeCidade = ref('');
let MS_geojson = estado_ms;
let geojson;
let map;
const style = {
  fillColor: '#C5E1A5',
  weight: 2,
  opacity: 1,
  color: 'white',
  dashArray: '3',
  fillOpacity: 0.7,
};
const cidades = ['campo grande', 'bonito', 'aquidauana', 'eldorado', 'corumbá'];

//Funções leaflet
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: (e) => highlightFeature(e, feature),
    mouseout: resetHighlight,
    click: (e) => {
      zoomToFeature(e, feature);
    },
  });
}
function highlightFeature(e, feature) {
  var layer = e.target;

  layer.bindTooltip(feature.properties.NM_MUN, { opacity: 1 }).openTooltip();

  layer.setStyle({
    weight: 2,
    color: '#E8F5E9',
    dashArray: '',
    fillOpacity: 1,
    fill: true,
    fillColor: '#66BB6A',
  });

  layer.bringToFront();
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  e.target.closeTooltip();
}

function zoomToFeature(e, feature) {
  map.fitBounds(e.target.getBounds());
  nomeCidade.value = feature.properties.NM_MUN;
  showCity.value = true;
}

function setupLeafletMap(map) {
  map.createPane('labels');
  map.getPane('labels').style.zIndex = 400;
  map.getPane('labels').style.pointerEvents = 'none';
  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
    {
      attribution: '©OpenStreetMap, ©CartoDB',
    }
  ).addTo(map);
  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png',
    {
      attribution: '©OpenStreetMap, ©CartoDB',
      pane: 'labels',
    }
  ).addTo(map);

  map.createPane('pane_RS');
  map.getPane('pane_RS').style.zIndex = 405;
  map.getPane('pane_RS').style['mix-blend-mode'] = 'normal';
  geojson = L.geoJson(MS_geojson, {
    style: style,
    onEachFeature: onEachFeature,
  }).addTo(map);
}

//Funções
function selecionarEstados(value, params) {
  for (let item in params) {
    if (value == params[item]) return true;
  }
  return false;
}
onMounted(() => {
  MS_geojson.features = Object.values(
    MS_geojson.features.filter((v) =>
      selecionarEstados(v.properties.NM_MUN.toLowerCase(), cidades)
    )
  );
  map = L.map('mapContainer').setView(center, zoom);
  setupLeafletMap(map);
});
</script>
