import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCKf2hdGHwB4AR8Kfmn4NG45B_E-y5GRac",
    authDomain: "chatapp-70fe7.firebaseapp.com",
    projectId: "chatapp-70fe7",
    storageBucket: "chatapp-70fe7.appspot.com",
    messagingSenderId: "122851464108",
    appId: "1:122851464108:web:83ffb8c5a499f5f7442009"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
