<script setup>
import Map from './components/Map.vue';
</script>

<template>
  <router-view />
  <div class="Lower">
    <Map />
    <img class="logo" src="./assets/Pictures/Prodega-Logo.png" alt="">
    <footer><h3>&copy by Luis Allamand - <span class="footer-email">luis@g-12.ch</span></h3></footer>
  </div>
</template>

<style scoped>
.logo {
  width: 100%;
}
footer{
  background-color: #e7e7e7;
  padding: 5px;
}
.footer-email{
  color: #010a68;
}
h3{
  text-align: center;
  margin: 0;
}
.Lower{
  margin-top: 40px;
}
</style>
