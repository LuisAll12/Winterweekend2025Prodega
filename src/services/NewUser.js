import Airtable from 'airtable';
import { ref } from 'vue';
const apiKey = import.meta.env.VITE_APP_API_KEY;
const baseId = import.meta.env.VITE_APP_BASE_ID;

const UserData_Table = ref("tbleY98skJRVKtQr4");

const base = new Airtable({ apiKey }).base(baseId);

export const registerUser = async (formdata, sessionKey) => {
    try{
        const record = {
            EMail: formdata.email,
            FirstName: formdata.firstname,
            LastName: formdata.lastname,
            SessionKey: sessionKey,
        }
        await base(UserData_Table).create([{ fields: record }]);
    } catch (error) {
        console.error(error);
    }
};