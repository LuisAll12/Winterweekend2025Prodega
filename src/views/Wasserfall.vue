<template>
    <div class="RegisterComponent">
        <Register v-if="ShowRegister"/>
    </div>
<div class="container" :class="{ 'non-clickable': !ShowRegister == false }">
    <div class="header"> 
        <h2>Winterweekend 2025 Wettbewerb</h2>
    </div>

    <div class="image">
        <img src="../assets/Pictures/Wasserfall.jpg" alt="Winterweekend Location" />
        <div class="Image-OverlayTitleContainer">
            <div class="Image-OverlayTitle">
                Restaurant Wasserfall
            </div>
        </div>
    </div>
    <div class="form">
        <div class="Question1" v-if="QuestionNumber == 1">
            <h2 class="Question-Title">
                <br>Welches Bier wird im Wasserfall getrunken?
            </h2>
            <div class="Answers">
                <div class="Answer Answer1" @click="OnClickAsnwer1(1)" :class="{ 'SelectedAnswer': Q1_SelectedAnswer == 1 }">
                    <h3 class="Answer-Text">Appenzeller</h3>
                </div>
                <div class="Answer Answer2" @click="OnClickAsnwer1(2)" :class="{ 'SelectedAnswer': Q1_SelectedAnswer == 2 }">
                    <h3 class="Answer-Text">Eichhof</h3>
                </div>
                <div class="Answer Answer3" @click="OnClickAsnwer1(3)" :class="{ 'SelectedAnswer': Q1_SelectedAnswer == 3 }">
                    <h3 class="Answer-Text">Cardinal</h3>
                </div>
                <div class="Answer Answer4" @click="OnClickAsnwer1(4)" :class="{ 'SelectedAnswer': Q1_SelectedAnswer == 4 }">
                    <h3 class="Answer-Text">Botti</h3>
                </div>
            </div>
        </div>
        <div class="Question3" v-else-if="QuestionNumber == 2 && timerFinished" >
            <h2 class="Question-Title">
                <br><br><br>
                Teile deine persönliche Impression der Berglodge
            </h2>
            <div class="input-container">
                <label for="file" class="custum-file-upload">
                <div class="icon">
                    <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g></svg>
                </div>
                <div class="text">
                    <span>Klicken Sie zum Hochladen eines Bildes</span>
                </div>
                <input ref="fileInput" id="file" type="file">
            </label>
            </div>
            <div class="Send-Button" @click="submit()">
                <button>
                    <span class="txt">submit</span>
                    <span class="txt2">sent!</span>
                    <span class="loader-container">
                        <span class="loader-button"></span>
                    </span>
                </button>
            </div>
            <p class="oder">oder</p>
            <div class="Send-Button" @click="submit()">
                <button>
                    <span class="txt">weiter</span>
                </button>
            </div>
        </div>
        <div class="Submitloader" v-if="QuestionNumber == 3"></div>
        <div class="CompleteMessage" v-if="QuestionNumber == 4">
            <div class="card">
            <a class="card1" href="#">
                <p>Frage abgeschlossen</p>
                <p class="small">Punkte wurden hinzugefügt<span v-if="!file">und Datei erfolgreich hochgeladen.</span></p>
                <router-link class="go-corner" to="/">
                    <div class="go-arrow">
                        →
                    </div>
                </router-link>
            </a>
            </div>
        </div>
        <span class="loader" 
        v-if="!timerFinished"></span>
    </div>
    <br><br><br>
    <Map />
</div>
</template>

<script setup>
import Register from '../components/Register.vue';
import Map from '../components/Map.vue';
import axios from 'axios';
import { } from '../services/newfields.js'
import Cookies from 'js-cookie';
import { ref } from 'vue';
import { onMounted } from 'vue';
import Airtable from 'airtable';
import heic2any from "heic2any";

const convertedImage = ref(null);

// Methode zur Verarbeitung der Datei
const handleFile = async (event) => {
  const file = event.target.files[0]; // Ausgewählte Datei
  if (!file) return;

  try {
    // HEIC in JPEG konvertieren
    const convertedBlob = await heic2any({
      blob: file,
      toType: "image/jpeg",
    });

    // Vorschau-URL erstellen
    convertedImage.value = URL.createObjectURL(convertedBlob);
  } catch (error) {
    console.error("Fehler beim Konvertieren der HEIC-Datei:", error);
  }
};
const ShowRegister = ref(true)

const apiKey = import.meta.env.VITE_APP_API_KEY;
const baseId = import.meta.env.VITE_APP_BASE_ID;
const QuestionNumber = ref(1);
const base = new Airtable({ apiKey: apiKey }).base(baseId);
const Points = ref(10);

const Q1_SelectedAnswer = ref(0);
const Q2_SelectedAnswer = ref(0);

const fileInput = ref(null);

const sessionStatus = ref(null);
const checkSession = async () => {
const sessionKey = getCookie('sessionKey');

if (!sessionKey) {
sessionStatus.value = false; // No session key found
ShowRegister.value = true;
return;
}

try {
    const url = `https://api.airtable.com/v0/${baseId}/tbleY98skJRVKtQr4`;
// Replace with your Airtable base URL and API details
const response = await axios.get(url, {
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
  params: {
    filterByFormula: `{sessionKey} = "${sessionKey}"`, 
  },
});

// If we have a record with the session key
if (response.data.records.length > 0) {
  sessionStatus.value = true;
  ShowRegister.value = false;
} else {
  sessionStatus.value = false; // session key is not registered
}
} catch (error) {
console.error('Error checking session in Airtable:', error);
sessionStatus.value = false; // handle error case
}
};

// Call checkSession when the component is mounted
onMounted(() => {
checkSession();
});


const getCookie = (name) => {
const value = `; ${document.cookie}`;
const parts = value.split(`; ${name}=`);
if (parts.length === 2) return parts.pop().split(';').shift();
return null;
};
function OnClickAsnwer1(value){
    if(value == 1){
        //Wrong Answer
        Q1_SelectedAnswer.value = 1;
        startTimer();
        Points.value += 10;
        QuestionNumber.value = 2;
    }
    else if(value == 2){
        //Wrong Answer
        Q1_SelectedAnswer.value = 2;
        startTimer();
        QuestionNumber.value = 2;
    }
    else if(value == 3){
        Q1_SelectedAnswer.value = 3;
        //Correct Answer
        startTimer();
        QuestionNumber.value = 2;
    }
    else if(value == 4){
        Q1_SelectedAnswer.value = 4;
        //Wrong Answer
        startTimer();
        QuestionNumber.value = 2;
    }

}

const timerFinished = ref(false);
const startTimer = () => {
timerFinished.value = false; // Timer zurücksetzen
setTimeout(() => {
timerFinished.value = true; // Nach 2 Sekunden auf "fertig" setzen
}, 2000); // 2000 ms = 2 Sekunden
};


//Submit Function
async function submit() {

if (!fileInput.value) {
    alert('Datei-Input ist nicht verfügbar.');
    return;
}
QuestionNumber.value = 3;
const sessionKey = getCookie('sessionKey');
if (!sessionKey || !base) {  // Now 'base' is defined
    alert('Fehlende Sitzung oder Base-Konfiguration.');
    return;
}
const file = fileInput.value.files[0];
if (!file) {
    //Keine datei vorhanden
    try{
        const userRecords = await base("tbleY98skJRVKtQr4").select({
            filterByFormula: `{SessionKey} = "${sessionKey}"`,
        }).firstPage();
        if (userRecords.length === 0) {
            alert('Benutzer nicht gefunden. Bitte melden Sie sich erneut an.');
            return;
        }
        const userRecord = userRecords[0];
        const userId = userRecord.id;
        const currentPoints = userRecord.fields.Points || 0;
        const newPoints = currentPoints + Points.value;
        await base("tbleY98skJRVKtQr4").update(userId, {
            Points: newPoints,
        });
        QuestionNumber.value = 4;
    }catch (error){
        console.error('Fehler beim Verarbeiten der Anfrage:', error.response?.data || error.message);
        alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    }
}
else{
    try {
    const userRecords = await base("tbleY98skJRVKtQr4").select({
        filterByFormula: `{SessionKey} = "${sessionKey}"`,
    }).firstPage();

    if (userRecords.length === 0) {
        alert('Benutzer nicht gefunden. Bitte melden Sie sich erneut an.');
        return;
    }

    const userRecord = userRecords[0];
    const userId = userRecord.id;
    const currentPoints = userRecord.fields.Points || 0;

    // Update points
    const newPoints = currentPoints + Points.value + 10;
    await base("tbleY98skJRVKtQr4").update(userId, {
        Points: newPoints,
    });
    const userNumber = userRecord.fields.UserId
    // File Upload
    const reader = new FileReader();
    reader.onload = async (e) => {
        const base64File = reader.result.split(",")[1];
        const base64Image = splitBase64(e.target.result)
        const res = await fetch("https://api.airtable.com/v0/appcAiz7ZeW6bn1um/Pictures", {
         method: "POST",
         headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
                fields: {
                    Split1: base64Image ? base64Image.part1 : "",
                    Split2: base64Image ? base64Image.part2 : "",
                    Split3: base64Image ? base64Image.part3 : "",
                    Split4: base64Image ? base64Image.part4 : "",
                    Split5: base64Image ? base64Image.part5 : "",
                    Split6: base64Image ? base64Image.part6 : "",
                    Split7: base64Image ? base64Image.part7 : "",
                    Split8: base64Image ? base64Image.part8 : "",
                    Split9: base64Image ? base64Image.part9 : "",
                    Split10: base64Image ? base64Image.part10 : "",
                    Split11: base64Image ? base64Image.part11 : "",
                    Split12: base64Image ? base64Image.part12 : "",
                    Split13: base64Image ? base64Image.part13 : "",
                    Split14: base64Image ? base64Image.part14 : "",
                    Split15: base64Image ? base64Image.part15 : "",
                    Split16: base64Image ? base64Image.part16 : "",
                    Split17: base64Image ? base64Image.part17 : "",
                    Split18: base64Image ? base64Image.part18 : "",
                    Split19: base64Image ? base64Image.part19 : "",
                    Split20: base64Image ? base64Image.part20 : "",
                    Split21: base64Image ? base64Image.part21 : "",
                    Split22: base64Image ? base64Image.part22 : "",
                    Split23: base64Image ? base64Image.part23 : "",
                    Split24: base64Image ? base64Image.part24 : "",
                    Split25: base64Image ? base64Image.part25 : "",
                    Split26: base64Image ? base64Image.part26 : "",
                    Split27: base64Image ? base64Image.part27 : "",
                    Split28: base64Image ? base64Image.part28 : "",
                    Split29: base64Image ? base64Image.part29 : "",
                    Split30: base64Image ? base64Image.part30 : "",
                    Split31: base64Image ? base64Image.part31 : "",
                    Split32: base64Image ? base64Image.part32 : "",
                    Split33: base64Image ? base64Image.part33 : "",
                    Split34: base64Image ? base64Image.part34 : "",
                    Split35: base64Image ? base64Image.part35 : "",
                    Split36: base64Image ? base64Image.part36 : "",
                    Split37: base64Image ? base64Image.part37 : "",
                    Split38: base64Image ? base64Image.part38 : "",
                    Split39: base64Image ? base64Image.part39 : "",
                    Split40: base64Image ? base64Image.part40 : "",
                    Split41: base64Image ? base64Image.part41 : "",
                    Split42: base64Image ? base64Image.part42 : "",
                    Split43: base64Image ? base64Image.part43 : "",
                    Split44: base64Image ? base64Image.part44 : "",
                    Split45: base64Image ? base64Image.part45 : "",
                    Split46: base64Image ? base64Image.part46 : "",
                    Split47: base64Image ? base64Image.part47 : "",
                    Split48: base64Image ? base64Image.part48 : "",
                    Split49: base64Image ? base64Image.part49 : "",
                    Split50: base64Image ? base64Image.part50 : "",
                    Split51: base64Image ? base64Image.part51 : "",
                    Split52: base64Image ? base64Image.part52 : "",
                    Split53: base64Image ? base64Image.part53 : "",
                    Split54: base64Image ? base64Image.part54 : "",
                    Split55: base64Image ? base64Image.part55 : "",
                    Split56: base64Image ? base64Image.part56 : "",
                    Split57: base64Image ? base64Image.part57 : "",
                    Split58: base64Image ? base64Image.part58 : "",
                    Split59: base64Image ? base64Image.part59 : "",
                    Split60: base64Image ? base64Image.part60 : "",
                    Split61: base64Image ? base64Image.part61 : "",
                    Split62: base64Image ? base64Image.part62 : "",
                    Split63: base64Image ? base64Image.part63 : "",
                    Split64: base64Image ? base64Image.part64 : "",
                    Split65: base64Image ? base64Image.part65 : "",
                    Split66: base64Image ? base64Image.part66 : "",
                    Split67: base64Image ? base64Image.part67 : "",
                    Split68: base64Image ? base64Image.part68 : "",
                    Split69: base64Image ? base64Image.part69 : "",
                    Split70: base64Image ? base64Image.part70 : "",
                    Split71: base64Image ? base64Image.part71 : "",
                    Split72: base64Image ? base64Image.part72 : "",
                    Split73: base64Image ? base64Image.part73 : "",
                    Split74: base64Image ? base64Image.part74 : "",
                    Split75: base64Image ? base64Image.part75 : "",
                    Split76: base64Image ? base64Image.part76 : "",
                    Split77: base64Image ? base64Image.part77 : "",
                    Split78: base64Image ? base64Image.part78 : "",
                    Split79: base64Image ? base64Image.part79 : "",
                    Split80: base64Image ? base64Image.part80 : "",
                    Split81: base64Image ? base64Image.part81 : "",
                    Split82: base64Image ? base64Image.part82 : "",
                    Split83: base64Image ? base64Image.part83 : "",
                    Split84: base64Image ? base64Image.part84 : "",
                    Split85: base64Image ? base64Image.part85 : "",
                    Split86: base64Image ? base64Image.part86 : "",
                    Split87: base64Image ? base64Image.part87 : "",
                    Split88: base64Image ? base64Image.part88 : "",
                    Split89: base64Image ? base64Image.part89 : "",
                    Split90: base64Image ? base64Image.part90 : "",
                    Split91: base64Image ? base64Image.part91 : "",
                    Split92: base64Image ? base64Image.part92 : "",
                    Split93: base64Image ? base64Image.part93 : "",
                    Split94: base64Image ? base64Image.part94 : "",
                    Split95: base64Image ? base64Image.part95 : "",
                    Split96: base64Image ? base64Image.part96 : "",
                    Split97: base64Image ? base64Image.part97 : "",
                    Split98: base64Image ? base64Image.part98 : "",
                    Split99: base64Image ? base64Image.part99 : "",
                    Split100: base64Image ? base64Image.part100 : "",
                    Split101: base64Image ? base64Image.part101 : "",
                    Split102: base64Image ? base64Image.part102 : "",
                    Split103: base64Image ? base64Image.part103 : "",
                    Split104: base64Image ? base64Image.part104 : "",
                    Split105: base64Image ? base64Image.part105 : "",
                    Split106: base64Image ? base64Image.part106 : "",
                    Split107: base64Image ? base64Image.part107 : "",
                    Split108: base64Image ? base64Image.part108 : "",
                    Split109: base64Image ? base64Image.part109 : "",
                    Split110: base64Image ? base64Image.part110 : "",
                    Split111: base64Image ? base64Image.part111 : "",
                    Split112: base64Image ? base64Image.part112 : "",
                    Split113: base64Image ? base64Image.part113 : "",
                    Split114: base64Image ? base64Image.part114 : "",
                    Split115: base64Image ? base64Image.part115 : "",
                    Split116: base64Image ? base64Image.part116 : "",
                    Split117: base64Image ? base64Image.part117 : "",
                    Split118: base64Image ? base64Image.part118 : "",
                    Split119: base64Image ? base64Image.part119 : "",
                    Split120: base64Image ? base64Image.part120 : "",
                    Split121: base64Image ? base64Image.part121 : "",
                    Split122: base64Image ? base64Image.part122 : "",
                    Split123: base64Image ? base64Image.part123 : "",
                    Split124: base64Image ? base64Image.part124 : "",
                    Split125: base64Image ? base64Image.part125 : "",
                    Split126: base64Image ? base64Image.part126 : "",
                    Split127: base64Image ? base64Image.part127 : "",
                    Split128: base64Image ? base64Image.part128 : "",
                    Split129: base64Image ? base64Image.part129 : "",
                    Split130: base64Image ? base64Image.part130 : "",
                    Split131: base64Image ? base64Image.part131 : "",
                    Split132: base64Image ? base64Image.part132 : "",
                    Split133: base64Image ? base64Image.part133 : "",
                    Split134: base64Image ? base64Image.part134 : "",
                    Split135: base64Image ? base64Image.part135 : "",
                    Split136: base64Image ? base64Image.part136 : "",
                    Split137: base64Image ? base64Image.part137 : "",
                    Split138: base64Image ? base64Image.part138 : "",
                    Split139: base64Image ? base64Image.part139 : "",
                    Split140: base64Image ? base64Image.part140 : "",
                    Split141: base64Image ? base64Image.part141 : "",
                    Split142: base64Image ? base64Image.part142 : "",
                    Split143: base64Image ? base64Image.part143 : "",
                    Split144: base64Image ? base64Image.part144 : "",
                    Split145: base64Image ? base64Image.part145 : "",
                    Split146: base64Image ? base64Image.part146 : "",
                    Split147: base64Image ? base64Image.part147 : "",
                    Split148: base64Image ? base64Image.part148 : "",
                    Split149: base64Image ? base64Image.part149 : "",
                    Split150: base64Image ? base64Image.part150 : "",
                    Split151: base64Image ? base64Image.part151 : "",
                    Split152: base64Image ? base64Image.part152 : "",
                    Split153: base64Image ? base64Image.part153 : "",
                    Split154: base64Image ? base64Image.part154 : "",
                    Split155: base64Image ? base64Image.part155 : "",
                    Split156: base64Image ? base64Image.part156 : "",
                    Split157: base64Image ? base64Image.part157 : "",
                    Split158: base64Image ? base64Image.part158 : "",
                    Split159: base64Image ? base64Image.part159 : "",
                    Split160: base64Image ? base64Image.part160 : "",
                    Split161: base64Image ? base64Image.part161 : "",
                    Split162: base64Image ? base64Image.part162 : "",
                    Split163: base64Image ? base64Image.part163 : "",
                    Split164: base64Image ? base64Image.part164 : "",
                    Split165: base64Image ? base64Image.part165 : "",
                    Split166: base64Image ? base64Image.part166 : "",
                    Split167: base64Image ? base64Image.part167 : "",
                    Split168: base64Image ? base64Image.part168 : "",
                    Split169: base64Image ? base64Image.part169 : "",
                    Split170: base64Image ? base64Image.part170 : "",
                    Split171: base64Image ? base64Image.part171 : "",
                    Split172: base64Image ? base64Image.part172 : "",
                    Split173: base64Image ? base64Image.part173 : "",
                    Split174: base64Image ? base64Image.part174 : "",
                    Split175: base64Image ? base64Image.part175 : "",
                    Split176: base64Image ? base64Image.part176 : "",
                    Split177: base64Image ? base64Image.part177 : "",
                    Split178: base64Image ? base64Image.part178 : "",
                    Split179: base64Image ? base64Image.part179 : "",
                    Split180: base64Image ? base64Image.part180 : "",
                    Split181: base64Image ? base64Image.part181 : "",
                    Split182: base64Image ? base64Image.part182 : "",
                    Split183: base64Image ? base64Image.part183 : "",
                    Split184: base64Image ? base64Image.part184 : "",
                    Split185: base64Image ? base64Image.part185 : "",
                    Split186: base64Image ? base64Image.part186 : "",
                    Split187: base64Image ? base64Image.part187 : "",
                    Split188: base64Image ? base64Image.part188 : "",
                    Split189: base64Image ? base64Image.part189 : "",
                    Split190: base64Image ? base64Image.part190 : "",
                    Split191: base64Image ? base64Image.part191 : "",
                    Split192: base64Image ? base64Image.part192 : "",
                    Split193: base64Image ? base64Image.part193 : "",
                    Split194: base64Image ? base64Image.part194 : "",
                    Split195: base64Image ? base64Image.part195 : "",
                    Split196: base64Image ? base64Image.part196 : "",
                    Split197: base64Image ? base64Image.part197 : "",
                    Split198: base64Image ? base64Image.part198 : "",
                    Split199: base64Image ? base64Image.part199 : "",
                    Split200: base64Image ? base64Image.part200 : "",
                UserData: [userId]
                },
         }),
      });

      if (!res.ok) {
         throw new Error("Failed to save image");
      }

        QuestionNumber.value = 4;
    };
    reader.onerror = () => alert('Fehler beim Lesen der Datei.');
    reader.readAsDataURL(file);
} catch (error) {
    console.error('Fehler beim Verarbeiten der Anfrage:', error.response?.data || error.message);
    alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
}
}


}

const splitBase64 = (base64String) => {
   const partLength = Math.floor(base64String.length / 14);
   const parts = [];
   for (let i = 0; i < 200; i++) {
      const start = i * partLength;
      const end = i === 199 ? base64String.length : (i + 1) * partLength;
      parts.push(base64String.slice(start, end));
   }
   return {
    part1: parts[0],
    part2: parts[1],
    part3: parts[2],
    part4: parts[3],
    part5: parts[4],
    part6: parts[5],
    part7: parts[6],
    part8: parts[7],
    part9: parts[8],
    part10: parts[9],
    part11: parts[10],
    part12: parts[11],
    part13: parts[12],
    part14: parts[13],
    part15: parts[14],
    part16: parts[15],
    part17: parts[16],
    part18: parts[17],
    part19: parts[18],
    part20: parts[19],
    part21: parts[20],
    part22: parts[21],
    part23: parts[22],
    part24: parts[23],
    part25: parts[24],
    part26: parts[25],
    part27: parts[26],
    part28: parts[27],
    part29: parts[28],
    part30: parts[29],
    part31: parts[30],
    part32: parts[31],
    part33: parts[32],
    part34: parts[33],
    part35: parts[34],
    part36: parts[35],
    part37: parts[36],
    part38: parts[37],
    part39: parts[38],
    part40: parts[39],
    part41: parts[40],
    part42: parts[41],
    part43: parts[42],
    part44: parts[43],
    part45: parts[44],
    part46: parts[45],
    part47: parts[46],
    part48: parts[47],
    part49: parts[48],
    part50: parts[49],
    part51: parts[50],
    part52: parts[51],
    part53: parts[52],
    part54: parts[53],
    part55: parts[54],
    part56: parts[55],
    part57: parts[56],
    part58: parts[57],
    part59: parts[58],
    part60: parts[59],
    part61: parts[60],
    part62: parts[61],
    part63: parts[62],
    part64: parts[63],
    part65: parts[64],
    part66: parts[65],
    part67: parts[66],
    part68: parts[67],
    part69: parts[68],
    part70: parts[69],
    part71: parts[70],
    part72: parts[71],
    part73: parts[72],
    part74: parts[73],
    part75: parts[74],
    part76: parts[75],
    part77: parts[76],
    part78: parts[77],
    part79: parts[78],
    part80: parts[79],
    part81: parts[80],
    part82: parts[81],
    part83: parts[82],
    part84: parts[83],
    part85: parts[84],
    part86: parts[85],
    part87: parts[86],
    part88: parts[87],
    part89: parts[88],
    part90: parts[89],
    part91: parts[90],
    part92: parts[91],
    part93: parts[92],
    part94: parts[93],
    part95: parts[94],
    part96: parts[95],
    part97: parts[96],
    part98: parts[97],
    part99: parts[98],
    part100: parts[99],
    part101: parts[100],
    part102: parts[101],
    part103: parts[102],
    part104: parts[103],
    part105: parts[104],
    part106: parts[105],
    part107: parts[106],
    part108: parts[107],
    part109: parts[108],
    part110: parts[109],
    part111: parts[110],
    part112: parts[111],
    part113: parts[112],
    part114: parts[113],
    part115: parts[114],
    part116: parts[115],
    part117: parts[116],
    part118: parts[117],
    part119: parts[118],
    part120: parts[119],
    part121: parts[120],
    part122: parts[121],
    part123: parts[122],
    part124: parts[123],
    part125: parts[124],
    part126: parts[125],
    part127: parts[126],
    part128: parts[127],
    part129: parts[128],
    part130: parts[129],
    part131: parts[130],
    part132: parts[131],
    part133: parts[132],
    part134: parts[133],
    part135: parts[134],
    part136: parts[135],
    part137: parts[136],
    part138: parts[137],
    part139: parts[138],
    part140: parts[139],
    part141: parts[140],
    part142: parts[141],
    part143: parts[142],
    part144: parts[143],
    part145: parts[144],
    part146: parts[145],
    part147: parts[146],
    part148: parts[147],
    part149: parts[148],
    part150: parts[149],
    part151: parts[150],
    part152: parts[151],
    part153: parts[152],
    part154: parts[153],
    part155: parts[154],
    part156: parts[155],
    part157: parts[156],
    part158: parts[157],
    part159: parts[158],
    part160: parts[159],
    part161: parts[160],
    part162: parts[161],
    part163: parts[162],
    part164: parts[163],
    part165: parts[164],
    part166: parts[165],
    part167: parts[166],
    part168: parts[167],
    part169: parts[168],
    part170: parts[169],
    part171: parts[170],
    part172: parts[171],
    part173: parts[172],
    part174: parts[173],
    part175: parts[174],
    part176: parts[175],
    part177: parts[176],
    part178: parts[177],
    part179: parts[178],
    part180: parts[179],
    part181: parts[180],
    part182: parts[181],
    part183: parts[182],
    part184: parts[183],
    part185: parts[184],
    part186: parts[185],
    part187: parts[186],
    part188: parts[187],
    part189: parts[188],
    part190: parts[189],
    part191: parts[190],
    part192: parts[191],
    part193: parts[192],
    part194: parts[193],
    part195: parts[194],
    part196: parts[195],
    part197: parts[196],
    part198: parts[197],
    part199: parts[198],
    part200: parts[199],
   };
};

</script>

<style scoped>
@import '../assets/css/styles.css';

</style>
