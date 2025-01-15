<script setup>
import Map from '../components/Map.vue';
</script>
<template>
    <div class="container">
        <div class="header"> 
            <h2>Winterweekend 2025 Wettbewerb</h2>
        </div>
        <div class="programm">
            <br>
            <h1>Wir wünschen Ihnen einen besonderen Abend im wunderschönen Engelberg</h1>
        </div>
        <div class="map">
            <Map />
        </div>
    </div>
</template>
<style scoped>
    @import '../assets/css/styles.css';
    .programm{
        text-align: center
    }
</style>