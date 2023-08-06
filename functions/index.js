/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

const axios = require('axios')

initializeApp();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.searchNews = onRequest(async (req, res) => {
  const searchTerm = req.query.search;
  const response = await axios({
    method: 'get',
    url: 'https://newsapi.org/v2/everything?q='+searchTerm+'&from=2023-07-02&sortBy=popularity',
    headers: {
      Authorization: 'Bearer 07470b7a30394d0983d08463d2fe5e75',
    }
  })
  // Push the new message into Firestore using the Firebase Admin SDK.
//  const writeResult = await getFirestore()
//      .collection("messages")
//      .add({original: original});
  // Send back a message that we've successfully written the message
  res.json(response.data);
});
