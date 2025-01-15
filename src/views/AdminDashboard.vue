<script setup>
import Airtable from 'airtable';
import { ref, onMounted } from 'vue';

// Airtable-Details
const apiKey = import.meta.env.VITE_APP_API_KEY;
const baseId = import.meta.env.VITE_APP_BASE_ID;
const base = new Airtable({ apiKey: apiKey }).base(baseId);
const TABLE_NAME = 'UserData';

// Daten-Referenz für die Benutzerliste
const users = ref([]);

// Funktion zum Laden der Daten aus Airtable
const fetchUsers = async () => {
  try {
    const records = await base("UserData").select().all();

    // Daten extrahieren und sortieren
    users.value = records
      .map(record => ({
        id: record.id,
        firstName: record.fields.FirstName || '',
        lastName: record.fields.LastName || '',
        email: record.fields.EMail || '',
        points: record.fields.Points || 0,
      }))
      .sort((a, b) => b.points - a.points); // Sortiere nach Punktzahl (absteigend)
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
  }
};

function getMimeType(dataUri) {
    // Den MIME-Typ extrahieren, indem der String mit Regex analysiert wird
    const match = dataUri.match(/^data:(.+?);/);
    return match ? match[1] : null;
}


const Images = ref([])
const fetchImages = async () => {
  try {
    const records = await fetch('https://api.airtable.com/v0/appcAiz7ZeW6bn1um/Pictures', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`,
        "Content-Type": "application/json",
      }
    })

    const data = await records.json()

    // Daten extrahieren und sortieren
    data.records.forEach(element => {
      const {Split1, Split2, Split3, Split4, Split5, Split6, Split7, Split8, Split9, Split10, Split11, Split12, Split13, Split14} = element.fields

      const img = Split1+Split2+Split3+Split4+Split5+Split6+Split7+Split8+Split9+Split10+Split11+Split12+Split13+Split14;
      
      const type = getMimeType(Split1)
      const typ = type.split('/')
      const ty = typ[typ.length - 1]
      
      Images.value.push({img: img, type: ty })
    });

    
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
  }
};



async function downloadImage() {
            // Base64 image string (replace with your actual string)
            await fetchImages()

            Images.value.forEach((e) => {
              let base64String = e.img;
              // Create a temporary anchor element
              let link = document.createElement("a");
              link.href = base64String;
              link.download = Math.random().toString(2).substring()+"image." + e.type; // Set the filename
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link); // Clean up
            })
}

// Lade die Daten bei der Initialisierung
onMounted(fetchUsers);
</script>

<template>
    <div class="container">
        <div class="header">
            <h2>Winterweekend 2025 Wettbewerb<br />Admin</h2>
        </div>
        <div class="Table">
            <div>
                <h1 class="table-title">Ergebnisse</h1>
                <table>
                    <thead>
                        <tr>
                        <th>Vorname</th>
                        <th>Nachname</th>
                        <th class="ResponsiveField">Email</th>
                        <th>Punkte</th>
                        </tr>
                    </thead>
                    <tbody v-if="users">
                        <tr v-for="user in users.slice(0, 15)" :key="user.id">
                            <td>{{ user.firstName }}</td>
                            <td>{{ user.lastName }}</td>
                            <td class="ResponsiveField">{{ user.email }}</td>
                            <td>{{ user.points }}</td>
                        </tr>
                    </tbody>
                    <div class="Table-loader" v-if="!users">
                        <div class="🤚">
                            <div class="👉"></div>
                            <div class="👉"></div>
                            <div class="👉"></div>
                            <div class="👉"></div>
                            <div class="🌴"></div>		
                            <div class="👍"></div>
                        </div>
                    </div>
                </table>
            </div>
            <div class="Download">
              <button @click="downloadImage()">Download Image</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import '../assets/css/styles.css';

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
}
.Table{
    text-align: center;
}
@media (max-width: 440px) {
    .ResponsiveField{
        display: none;
    }
}

.Table-loader{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
/* From Uiverse.io by Pradeepsaranbishnoi */ 
.🤚 {
  --skin-color: #E4C560;
  --tap-speed: 0.6s;
  --tap-stagger: 0.1s;
  position: relative;
  width: 80px;
  height: 60px;
  margin-left: 80px;
}

.🤚:before {
  content: '';
  display: block;
  width: 180%;
  height: 75%;
  position: absolute;
  top: 70%;
  right: 20%;
  background-color: black;
  border-radius: 40px 10px;
  filter: blur(10px);
  opacity: 0.3;
}

.🌴 {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--skin-color);
  border-radius: 10px 40px;
}

.👍 {
  position: absolute;
  width: 120%;
  height: 38px;
  background-color: var(--skin-color);
  bottom: -18%;
  right: 1%;
  transform-origin: calc(100% - 20px) 20px;
  transform: rotate(-20deg);
  border-radius: 30px 20px 20px 10px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  border-left: 2px solid rgba(0, 0, 0, 0.1);
}

.👍:after {
  width: 20%;
  height: 60%;
  content: '';
  background-color: rgba(255, 255, 255, 0.3);
  position: absolute;
  bottom: -8%;
  left: 5px;
  border-radius: 60% 10% 10% 30%;
  border-right: 2px solid rgba(0, 0, 0, 0.05);
}

.👉 {
  position: absolute;
  width: 80%;
  height: 35px;
  background-color: var(--skin-color);
  bottom: 32%;
  right: 64%;
  transform-origin: 100% 20px;
  animation-duration: calc(var(--tap-speed) * 2);
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  transform: rotate(10deg);
}

.👉:before {
  content: '';
  position: absolute;
  width: 140%;
  height: 30px;
  background-color: var(--skin-color);
  bottom: 8%;
  right: 65%;
  transform-origin: calc(100% - 20px) 20px;
  transform: rotate(-60deg);
  border-radius: 20px;
}

.👉:nth-child(1) {
  animation-delay: 0;
  filter: brightness(70%);
  animation-name: tap-upper-1;
}

.👉:nth-child(2) {
  animation-delay: var(--tap-stagger);
  filter: brightness(80%);
  animation-name: tap-upper-2;
}

.👉:nth-child(3) {
  animation-delay: calc(var(--tap-stagger) * 2);
  filter: brightness(90%);
  animation-name: tap-upper-3;
}

.👉:nth-child(4) {
  animation-delay: calc(var(--tap-stagger) * 3);
  filter: brightness(100%);
  animation-name: tap-upper-4;
}

@keyframes tap-upper-1 {
  0%, 50%, 100% {
    transform: rotate(10deg) scale(0.4);
  }

  40% {
    transform: rotate(50deg) scale(0.4);
  }
}

@keyframes tap-upper-2 {
  0%, 50%, 100% {
    transform: rotate(10deg) scale(0.6);
  }

  40% {
    transform: rotate(50deg) scale(0.6);
  }
}

@keyframes tap-upper-3 {
  0%, 50%, 100% {
    transform: rotate(10deg) scale(0.8);
  }

  40% {
    transform: rotate(50deg) scale(0.8);
  }
}

@keyframes tap-upper-4 {
  0%, 50%, 100% {
    transform: rotate(10deg) scale(1);
  }

  40% {
    transform: rotate(50deg) scale(1);
  }
}

</style>
