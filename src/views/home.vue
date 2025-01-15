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
            <h1>Wir wünschen Dir ein unvergessliches Wochenende im winterlichen Engelberg.</h1>
            <br>
            <h2>Alle Infos die du brauchst</h2>
            <div class="Tabelle">
                <table class="grid-table">
                    <tbody>
                        <tr class="uppertr">
                        <td class="td1">Gletscherspalte</td>
                        <td class="td1">Dorfstrasse 21</td>
                        <td class="td1">Mi – Sa: 21.00 – 04.00 Uhr</td>
                        <td class="insta">
                            <a class="button" href="https://www.gletscherspalte.ch/">
                                <span class="span">💻</span>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td class="td1">Grand Bar Singh</td>
                        <td class="td1">Bahnhofstrasse 7</td>
                        <td class="td1">
                            <div class="tooltip">
                                <div class="icon">i</div>
                                <div class="tooltiptext">Special: 17.00 – 18.00 Uhr Happy Hour</div>
                            </div>
                            Mo – So: 16.00 Uhr 
                        </td>
                        <td class="insta">
                            <a class="Btn" href="https://www.instagram.com/grandbarbysingh/">
                                <span class="svgContainer">
                                    <svg fill="white" class="svgIcon" viewBox="0 0 448 512" height="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
                                </span>
                                <span class="BG"></span>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td class="td1">Café & Apéro Bar Laub</td>
                        <td class="td1">Titlisstrasse 8</td>
                        <td class="td1">Mi – So: 11.00 – 20.00 Uhr</td>
                        <td class="insta">
                            <a class="button" href="http://www.cafebarlaub.ch/">
                                <span class="span">💻</span>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td class="td1">Café zum Hoheneck</td>
                        <td class="td1">Dorfstrasse 4</td>
                        <td class="td1">
                            <div class="tooltip">
                                <div class="icon">i</div>
                                <div class="tooltiptext">Special: Live-Band ab 15.00 Uhr</div>
                            </div>
                            Mo-So: 14.30 – 23.30 Uhr
                        </td>
                        <td class="insta">
                            <a class="Btn" href="https://www.instagram.com/das_verrueckte_cafe/">
                                <span class="svgContainer">
                                    <svg fill="white" class="svgIcon" viewBox="0 0 448 512" height="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
                                </span>
                                <span class="BG"></span>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td class="td1">Titlis – Bärghuis Jochpass</td>
                        <td class="td1">Titlis Skigebiet</td>
                        <td class="td1">?</td>
                        <td class="insta">
                            <a class="button" href="https://www.titlis.ch/de/restaurants/baerghuis-jochpass">
                                <span class="span">💻</span>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td class="td1">Brunni – Berglodge "Ristis"</td>
                        <td class="td1">Brunni – Ski & Schlittelgebiet</td>
                        <td class="td1">?</td>
                        <td class="insta">
                            <a class="button" href="https://brunni.ch/de/detail/berglodge-restaurant-ristis">
                                <span class="span">💻</span>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td class="td1">Sportingpark</td>
                        <td class="td1">Engelbergerstrasse 11</td>
                        <td class="td1">?</td>
                        <td class="insta">
                            <a class="button" href="https://sportingpark.ch/">
                                <span class="span">💻</span>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td class="td1">Restaurant Ende der Welt</td>
                        <td class="td1">Horbistrasse 124</td>
                        <td class="td1">Mi – So: 09.00 – 23.00 Uhr</td>
                        <td class="insta">
                            <a class="button" href="https://www.ende-der-welt.ch/">
                                <span class="span">💻</span>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td class="td1">Restaurant Wasserfall</td>
                        <td class="td1">Wasserfallstrasse 2020</td>
                        <td class="td1">Do-Mo 08.30 – 22.30 Uhr</td>
                        <td class="insta">
                            <a class="button" href="https://www.restaurant-wasserfall.ch/">
                                <span class="span">💻</span>
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="map">
            <Map />
        </div>
    </div>
</template>
<style scoped>
    @import '../assets/css/styles.css';
    .programm{
        text-align: center;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    .Tabelle {
        text-align: center;
        display: flex;
        justify-content: center;
        margin-top: 30px;
    }
    table.grid-table {
    border-collapse: collapse;
    border: none;
    }
    tr{
        border-top: #000 1px solid;
        text-align: center;
    }
    .td1 {
        border-right: #000 1px solid;
        padding: 1%;
    }
    td{
        padding: 2px;
        font-size: 3vw;
    }
    table.grid-table th {
        background-color: #f2f2f2;
    }
.insta{
    display: flex;
    justify-content: center;
}
.uppertr{
    border: none;
}
/* From Uiverse.io by vinodjangid07 */ 
.Btn {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  position: relative;
  /* overflow: hidden; */
  border-radius: 7px;
  cursor: pointer;
  transition: all .3s;
}

.svgContainer {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  backdrop-filter: blur(4px);
  letter-spacing: 0.8px;
  border-radius: 10px;
  transition: all .3s;
  border: 1px solid rgba(156, 156, 156, 0.466);
}

.BG {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background: #f09433;
  background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  background: -webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
  background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 );
  z-index: -1;
  border-radius: 9px;
  pointer-events: none;
  transition: all .3s;
}

.Btn:hover .BG {
  transform: rotate(35deg);
  transform-origin: bottom;
}

.Btn:hover .svgContainer {
  background-color: rgba(156, 156, 156, 0.466);
}
/* From Uiverse.io by gharsh11032000 */ 
.button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e8e8e8;
  background-color: #212121;
  width: 45px;
  height: 45px;
  font-size: 24px;
  text-transform: uppercase;
  border: 2px solid #212121;
  border-radius: 10px;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
  box-shadow: 5px 5px 2px rgba(0, 0, 0, 0.15),
    2px 2px 2px rgba(0, 0, 0, 0.1),
    -3px -3px 2px rgba(255, 255, 255, 0.05),
    -2px -2px 1px rgba(255, 255, 255, 0.05);
  overflow: hidden;
  cursor: pointer;
}

.button .span {
  position: relative;
  z-index: 2;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
}

.button::before {
  content: "";
  position: absolute;
  background-color: #e8e8e8;
  width: 100%;
  height: 100%;
  left: 0%;
  bottom: 0%;
  transform: translate(-100%, 100%);
  border-radius: 10px;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
}

.button:hover::before {
  transform: translate(0,0);
  transition-delay: 0.4s;
}

.button:hover .span {
  scale: 1.2;
}

.button:hover {
  box-shadow: none;
}

.button:active {
  scale: 0.95;
}

/* From Uiverse.io by SmookyDev */ 
.tooltip {
  position: relative;
  display: inline-block;
  cursor: pointer;
  font-family: "Arial", sans-serif;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.tooltiptext {
  visibility: hidden;
  width: 200px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 10px;
  position: absolute;
  z-index: 1;
  top: 125%;
  left: 50%;
  margin-left: -100px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltiptext::after {
  content: "";
  position: absolute;
  top: -10px;
  left: 50%;
  margin-left: -10px;
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent #333 transparent;
}

.tooltip .icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: #D3001F;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
}


</style>