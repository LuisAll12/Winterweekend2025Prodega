<script setup>
import { onMounted } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const locations = [
    { lat: 46.82130600684915, lng: 8.405203889197415, title: 'Gletscherspalte' },
  { lat: 46.81902924629579, lng: 8.40291577423752, title: 'Grand Bar Singh' },
  { lat: 46.82051151056999, lng: 8.40636751857344, title: 'Café & Apéro Bar Laub' },
  { lat: 46.82127615722031, lng: 8.407697890993768, title: 'Das Verrückte Café zum Hoheneck' },
  { lat: 46.778852949190316, lng: 8.387587772193593, title: 'Titlis - Bärghuis Jochpass' },
  { lat: 46.83244972820594, lng: 8.407717451442599, title: 'Brunni - Berglodge Restaurant Ristis' },
  { lat: 46.81811897234078, lng: 8.40454085592928, title: 'Sportingpark' },
  { lat: 46.83164021119922, lng: 8.43320191049598, title: 'Ende der Welt' },
  { lat: 46.80474078931307, lng: 8.446212657377915, title: 'Restaurant - Wasserfall' }
];

const mapCenter = { lat: 46.81923962382889, lng: 8.399967692364593 }; // Zürich  46.81902924629579, 8.40291577423752
const zoom = 12;

// Initialize the map when the component is mounted
onMounted(() => {
  const map = L.map('map').setView([mapCenter.lat, mapCenter.lng], zoom);

  // Setze den OpenStreetMap Tile Layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  // Verwende ein CDN für Leaflet Icons
  const icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
  });

  // Füge Marker mit benutzerdefinierten Icons hinzu
  locations.forEach((location) => {
    const marker = L.marker([location.lat, location.lng], { icon: icon }).addTo(map);
    marker.bindPopup(`<b>${location.title}</b>`).openPopup();
  });
});


</script>
<template>
    <div class="Map-container">
            <h1>Nächste Standorte</h1>
        <div id="map" style="height: 400px; width: 100%;"></div>
    </div>
</template>
<style>
.Map-container{
  margin-top: 120px;
  text-align: center;
  
}
</style>