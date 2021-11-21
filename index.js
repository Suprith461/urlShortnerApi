const express = require('express');

const firebase = require("firebase");
const cors = require('cors')

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZWWK-NppFUefV71CitgcyR_JlVNqbydQ",
  authDomain: "urlshortner-65dd0.firebaseapp.com",
  projectId: "urlshortner-65dd0",
  storageBucket: "urlshortner-65dd0.appspot.com",
  messagingSenderId: "1011945942150",
  appId: "1:1011945942150:web:1714e1a8437e747327f507",
  measurementId: "G-7BKNZ77T7K"
};

//Initializing firebase app if not initialized
!firebase.apps.length ? firebase.initializeApp( firebaseConfig) : firebase.app()
const app = express();

// // Connect to database
// connectDB();

app.use(express.json());
app.options('*',cors())
// Define Routes
app.use('/', require('./routes/index'));
app.use('/urlshortner/api/', require('./routes/url'));
app.use('/urlshortner/api/edit/', require('./routes/edit'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
