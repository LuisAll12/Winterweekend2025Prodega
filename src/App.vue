<script setup>

</script>

<template>
  <router-view />
  <img class="logo" src="./assets/Pictures/Prodega-Logo.png" alt="">
  <footer><h3>&copy by Luis Allamand - <span class="footer-email">luis@g-12.ch</span></h3></footer>

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
</style>
