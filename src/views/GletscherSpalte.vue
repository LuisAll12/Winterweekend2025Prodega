<template>
        <div class="RegisterComponent">
            <Register v-if="ShowRegister"/>
        </div>
    <div class="container" :class="{ 'non-clickable': !ShowRegister == false }">
        <div class="header"> 
            <h2>Winterweekend 2025 Wettbewerb</h2>
        </div>

        <div class="image">
            <img src="../assets/Pictures/Gletscherspalte.jpg" alt="Winterweekend Location" />
            <div class="Image-OverlayTitleContainer">
            <div class="Image-OverlayTitle">
                Gletscherspalte
            </div>
        </div>
        </div>
        <div class="form">
            <div class="Question1" v-if="QuestionNumber == 1">
                <h2 class="Question-Title">
                    Wie viele Personen nehmen am Winterweekend 2025 teil?
                </h2>
                <div class="Answers">
                    <div class="Answer Answer1" @click="OnClickAsnwer1(1)" :class="{ 'SelectedAnswer': Q1_SelectedAnswer == 1 }">
                        <h3 class="Answer-Text">196</h3>
                    </div>
                    <div class="Answer Answer2" @click="OnClickAsnwer1(2)" :class="{ 'SelectedAnswer': Q1_SelectedAnswer == 2 }">
                        <h3 class="Answer-Text">212</h3>
                    </div>
                    <div class="Answer Answer3" @click="OnClickAsnwer1(3)" :class="{ 'SelectedAnswer': Q1_SelectedAnswer == 3 }">
                        <h3 class="Answer-Text">224</h3>
                    </div>
                    <div class="Answer Answer4" @click="OnClickAsnwer1(4)" :class="{ 'SelectedAnswer': Q1_SelectedAnswer == 4 }">
                        <h3 class="Answer-Text">248</h3>
                    </div>
                </div>
            </div>
            <div class="Question3" v-else-if="QuestionNumber == 2 && timerFinished" >
                <h2 class="Question-Title">
                    Teile deine persönliche Impression der Gletscherspalte
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
        <Map />
    </div>

</template>

<script setup>
import Register from '../components/Register.vue';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ref } from 'vue';
import { onMounted } from 'vue';
import Airtable from 'airtable';
import Map from '../components/Map.vue';

// Initialize Airtable with your API key and base ID

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
            Points.value += 10;
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
   for (let i = 0; i < 14; i++) {
      const start = i * partLength;
      const end = i === 13 ? base64String.length : (i + 1) * partLength;
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
   };
};



</script>

<style scoped>
 @import '../assets/css/styles.css';
</style>
