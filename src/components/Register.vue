<script setup>
import { ref } from 'vue';
import Cookies from 'js-cookie';
import Airtable from 'airtable';


const EmailNotAvailable = ref(false)
// Airtable Konfiguration
const apiKey = "patLUiRUMaIogEY2E.80f46df93a37bd59c842db511bc1813571edfacab7bc0933f1988605096920b2";
const baseId = "appcAiz7ZeW6bn1um";
const tableId = "tbleY98skJRVKtQr4";

const base = new Airtable({ apiKey }).base(baseId);

// Lokale Variablen für die Eingabedaten
const ContentMessage = ref("Bitte geben Sie Ihre E-Mail-Adresse ein, um am Wettbewerb teilzunehmen.");
const TitleMessage = ref("Email eingeben")
const InputEmail = ref('');
const FirstName = ref('');
const LastName = ref('');
const ErrorMessage = ref('');
const SuccessMessage = ref('');

const LoginStep = ref(0);
console.log(LoginStep.value);
// Generiert einen zufälligen Session Key
function generateSessionKey() {
    return Array(20)
        .fill(0)
        .map(() => Math.random().toString(36).charAt(2))
        .join('');
}

// Prüft, ob eine Email in Airtable existiert
async function checkEmailInAirtable(email) {
    try {
        const records = await base(tableId).select({
            filterByFormula: `{Email} = "${email}"`,
        }).firstPage();

        return records.length > 0 ? records[0] : null; // Gibt den Datensatz zurück, falls vorhanden
    } catch (error) {
        console.error('Fehler beim Abrufen aus Airtable:', error);
        throw error;
    }
}

// Registriert den Benutzer in Airtable
async function registerUserInAirtable(email, firstname, lastname, sessionKey) {
    try {
        const record = await base(tableId).create({
            EMail: email,
            FirstName: firstname,
            LastName: lastname,
            Points: 0,
            SessionKey: sessionKey,
        });
        return record;
    } catch (error) {
        console.error('Fehler beim Registrieren in Airtable:', error);
        throw error;
    }
}

// Setzt den Session Key in Cookies und Airtable
async function setSessionKeyForUser(recordId, sessionKey) {
    try {
        await base(tableId).update(recordId, {
            SessionKey: sessionKey,
        });
        Cookies.set('sessionKey', sessionKey, { expires: 3, path: '/' });
    } catch (error) {
        console.error('Fehler beim Setzen des Session Keys:', error);
        throw error;
    }
}

// Wird bei Klick auf den Button aufgerufen
async function handleRegister() {
    ErrorMessage.value = '';
    SuccessMessage.value = '';

    if (!InputEmail.value) {
        ErrorMessage.value = "Bitte geben Sie eine E-Mail-Adresse ein.";
        return;
    }

    try {
        const existingRecord = await checkEmailInAirtable(InputEmail.value);

        if (existingRecord) {
            // Email existiert bereits -> Session Key setzen
            const sessionKey = generateSessionKey();
            await setSessionKeyForUser(existingRecord.id, sessionKey);
            SuccessMessage.value = "Willkommen zurück! Ihre Session wurde aktualisiert.";
            window.location.reload();
        } else {
            // Email existiert nicht -> Registrierung
            LoginStep.value = 1;
            ContentMessage.value = "Bitte geben Sie Ihren Vor- und Nachname ein.";
            TitleMessage.value = "Vor-Nachname eingeben"
            if (!FirstName.value || !LastName.value) {
                ErrorMessage.value = "";
                return;
            }

            const sessionKey = generateSessionKey();
            await registerUserInAirtable(InputEmail.value, FirstName.value, LastName.value, sessionKey);
            Cookies.set('sessionKey', sessionKey, { expires: 3, path: '/' });
            SuccessMessage.value = "Registrierung erfolgreich! Viel Spaß beim Wettbewerb.";
            window.location.reload();
        }
    } catch (error) {
        ErrorMessage.value = "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";
    }
}
</script>

<template>
    <div class="container">
        <!-- <div class="card">
            <h1>Email eingeben</h1>
            <p>Bitte geben Sie Ihre E-Mail-Adresse ein, um am Wettbewerb teilzunehmen.</p>
            
            <div>
                <input type="email" placeholder="Email" v-model="InputEmail" />
            </div>

            <div v-if="!SuccessMessage">
                <input type="text" placeholder="Vorname (nur für neue User)" v-model="FirstName" />
                <input type="text" placeholder="Nachname (nur für neue User)" v-model="LastName" />
            </div>

            <button @click="handleRegister">Absenden</button>

            <p v-if="ErrorMessage" class="error">{{ ErrorMessage }}</p>
            <p v-if="SuccessMessage" class="success">{{ SuccessMessage }}</p>
        </div> -->
        <div class="card">
            <span class="card__title">
                {{ TitleMessage }}
                </span>
            <p class="card__content">
                {{ ContentMessage }}
            </p>
            <div class="card__form" v-if="LoginStep == 0">
                <input type="text" placeholder="Your Email" v-model="InputEmail"/>
                <button title="SignUp" class="sign-up" @click="handleRegister">
                <svg
                    fill="#e8eaed"
                    width="24px"
                    viewBox="0 -960 960 960"
                    height="24px"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"></path>
                </svg>
                </button>
            </div>
            <div class="InputsFirstLastName" v-if="LoginStep == 1">
                <div class="lower_card__form">
                    <input type="text" placeholder="Vorname" v-model="FirstName"/>
                        <input type="text" placeholder="Nachname" v-model="LastName"/>
                        <button @click="handleRegister">Absenden</button>
                </div>
            </div>
            <p v-if="ErrorMessage" class="error">{{ ErrorMessage }}</p>
            <p v-if="SuccessMessage" class="success">{{ SuccessMessage }}</p>
        </div>

    </div>
</template>

<style scoped>
@import '../assets/css/register.css';
</style>
