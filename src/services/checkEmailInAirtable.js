import Airtable from 'airtable';
import { ref } from 'vue';

// Use `ref` for reactivity in Vue if needed, but not for constants
const UserData_Table = "tbleY98skJRVKtQr4"; 

const apiKey = "patLUiRUMaIogEY2E.80f46df93a37bd59c842db511bc1813571edfacab7bc0933f1988605096920b2";
const baseId = "appcAiz7ZeW6bn1um";

// Initialize Airtable base
const base = new Airtable({ apiKey }).base(baseId);

export async function checkEmailInAirtable(email) {
    try {
        const records = await base(UserData_Table).select({
            filterByFormula: `{Email} = "${email}"`,
        }).firstPage();

        return records.length > 0; // Returns true if the email exists
    } catch (error) {
        console.error('Error querying Airtable:', error);
        throw error;
    }
}
