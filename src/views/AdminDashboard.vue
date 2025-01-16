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
      const { Split1, Split2, Split3, Split4, Split5, Split6, Split7, Split8, Split9, Split10, 
              Split11, Split12, Split13, Split14, Split15, Split16, Split17, Split18, Split19, Split20, 
              Split21, Split22, Split23, Split24, Split25, Split26, Split27, Split28, Split29, Split30, 
              Split31, Split32, Split33, Split34, Split35, Split36, Split37, Split38, Split39, Split40, 
              Split41, Split42, Split43, Split44, Split45, Split46, Split47, Split48, Split49, Split50, 
              Split51, Split52, Split53, Split54, Split55, Split56, Split57, Split58, Split59, Split60, 
              Split61, Split62, Split63, Split64, Split65, Split66, Split67, Split68, Split69, Split70, 
              Split71, Split72, Split73, Split74, Split75, Split76, Split77, Split78, Split79, Split80, 
              Split81, Split82, Split83, Split84, Split85, Split86, Split87, Split88, Split89, Split90, 
              Split91, Split92, Split93, Split94, Split95, Split96, Split97, Split98, Split99, Split100, 
              Split101, Split102, Split103, Split104, Split105, Split106, Split107, Split108, Split109, Split110, 
              Split111, Split112, Split113, Split114, Split115, Split116, Split117, Split118, Split119, Split120, 
              Split121, Split122, Split123, Split124, Split125, Split126, Split127, Split128, Split129, Split130, 
              Split131, Split132, Split133, Split134, Split135, Split136, Split137, Split138, Split139, Split140, 
              Split141, Split142, Split143, Split144, Split145, Split146, Split147, Split148, Split149, Split150, 
              Split151, Split152, Split153, Split154, Split155, Split156, Split157, Split158, Split159, Split160, 
              Split161, Split162, Split163, Split164, Split165, Split166, Split167, Split168, Split169, Split170, 
              Split171, Split172, Split173, Split174, Split175, Split176, Split177, Split178, Split179, Split180, 
              Split181, Split182, Split183, Split184, Split185, Split186, Split187, Split188, Split189, Split190, 
              Split191, Split192, Split193, Split194, Split195, Split196, Split197, Split198, Split199, Split200
              } = element.fields

      const img = Split1+Split2+Split3+Split4+Split5+Split6+Split7+Split8+Split9+Split10+
                  Split11+Split12+Split13+Split14+Split15+Split16+Split17+Split18+Split19+Split20+
                  Split21+Split22+Split23+Split24+Split25+Split26+Split27+Split28+Split29+Split30+
                  Split31+Split32+Split33+Split34+Split35+Split36+Split37+Split38+Split39+Split40+
                  Split41+Split42+Split43+Split44+Split45+Split46+Split47+Split48+Split49+Split50+
                  Split51+Split52+Split53+Split54+Split55+Split56+Split57+Split58+Split59+Split60+
                  Split61+Split62+Split63+Split64+Split65+Split66+Split67+Split68+Split69+Split70+
                  Split71+Split72+Split73+Split74+Split75+Split76+Split77+Split78+Split79+Split80+
                  Split81+Split82+Split83+Split84+Split85+Split86+Split87+Split88+Split89+Split90+
                  Split91+Split92+Split93+Split94+Split95+Split96+Split97+Split98+Split99+Split100+
                  Split101+Split102+Split103+Split104+Split105+Split106+Split107+Split108+Split109+Split110+
                  Split111+Split112+Split113+Split114+Split115+Split116+Split117+Split118+Split119+Split120+
                  Split121+Split122+Split123+Split124+Split125+Split126+Split127+Split128+Split129+Split130+
                  Split131+Split132+Split133+Split134+Split135+Split136+Split137+Split138+Split139+Split140+
                  Split141+Split142+Split143+Split144+Split145+Split146+Split147+Split148+Split149+Split150+
                  Split151+Split152+Split153+Split154+Split155+Split156+Split157+Split158+Split159+Split160+
                  Split161+Split162+Split163+Split164+Split165+Split166+Split167+Split168+Split169+Split170+
                  Split171+Split172+Split173+Split174+Split175+Split176+Split177+Split178+Split179+Split180+
                  Split181+Split182+Split183+Split184+Split185+Split186+Split187+Split188+Split189+Split190+
                  Split191+Split192+Split193+Split194+Split195+Split196+Split197+Split198+Split199+Split200
                  ;
      
      const type = getMimeType(Split1)
      const typ = type.split('/')
      const ty = typ[typ.length - 1]
      
      Images.value.push({img: img, type: ty })
    });

    
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
  }
};
async function restoreToNormalBase64(compressedBase64Str) {
   const compressedBlob = base64ToBlob(compressedBase64Str);
   const compressedImage = await createImageBitmap(compressedBlob);

   const canvas = document.createElement("canvas")
   canvas.width = compressedImage.width
   canvas.height = compressedImage.height

   const ctx = canvas.getContext("2d")
   ctx.drawImage(compressedImage, 0, 0)

   return canvas.toDataURL("image/jpeg", 1.0)
}


async function downloadImage() {
            // Base64 image string (replace with your actual string)
            await fetchImages()
            
            Images.value.forEach( async (e) => {
              let base64String = await restoreToNormalBase64(e.img);
              // Create a temporary anchor element
              let link = document.createElement("a");
              link.href = base64String;
              link.download = Math.random().toString(2).substring()+"image." + e.type; // Set the filename
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link); // Clean up
            })
}
async function compressBase64Image(base64Str, maxFileSizeInBytes) {
   const imageBlob = base64ToBlob(base64Str)
   const imageBitmap = await createImageBitmap(imageBlob)

   const canvas = document.createElement("canvas");
   const ctx = canvas.getContext("2d")

   canvas.width = imageBitmap.width
   canvas.height = imageBitmap.height

   ctx.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height)

   let quality = 0.9;
   let compressedBase64;

   do {
      compressedBase64 = await canvasToBase64(canvas, "image/jpeg", quality)

      quality -= 0.1;
   } while (compressedBase64.length > maxFileSizeInBytes * 1.33 && quality > 0.1)

   return compressedBase64
}
function base64ToBlob(base64) {
   // Überprüfe, ob der Base64-String das "data:"-Präfix enthält
   const [header, data] = base64.split(",");
   const byteString = atob(data); // Extrahiert die Base64-codierte Zeichenkette
   const mimeString = header.split(":")[1].split(";")[0]; // Extrahiert den MIME-Typ

   const arrayBuffer = new Uint8Array(byteString.length);

   // Umwandlung der Base64-Zeichenkette in einen Uint8Array
   for (let i = 0; i < byteString.length; i++) {
      arrayBuffer[i] = byteString.charCodeAt(i);
   }

   // Rückgabe des Blobs mit dem korrekten MIME-Typ
   return new Blob([arrayBuffer], { type: mimeString });
}


function canvasToBase64(canvas, format, quality) {
   return new Promise((resolve) => {
      resolve(canvas.toDataURL(format, quality));
   });
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
