// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
// imported already
const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

//addMessage example
// This example takes the text parameter passed to this HTTP endpoint and inserts it into 
// Cloud Firestore under the path /messages/:documentId/original
// further doc description: "The addMessage() function is an HTTP endpoint. Any request to
// the endpoint results in ExpressJS-style Request and Response objects passed to the onRequest() callback."
exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into Cloud Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('messages').add({original: original});
    // Send back a message that we've succesfully written the message
    res.json({result: `Message with ID: ${writeResult.id} added.`});
  });