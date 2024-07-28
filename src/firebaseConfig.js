// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAO4X9FU8o-eQHLelFyKVfXfr-tHZ8FNek",
  authDomain: "domo-ut-a50a6.firebaseapp.com",
  projectId: "domo-ut-a50a6",
  storageBucket: "domo-ut-a50a6.appspot.com",
  messagingSenderId: "602138230684",
  appId: "1:602138230684:web:d80eb70df6936cb28cd259"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };