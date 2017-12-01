//import { firestore } from 'firebase-admin';

const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.visionTest = functions.https.onRequest((req, resp) =>{
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // The name of the image file to annotate
    //const fileName = './resources/wakeupcat.jpg';

    // Prepare the request object
    const request = {
    image: {
        source: {
        filename: fileName,
        },
    },
    };

    // Performs label detection on the image file
    client
    //.labelDetection(request)
    .labelDetection(req)
    .then(results => {
        const labels = results[0].labelAnnotations;
        var txt="";
        //console.log('Labels:');
        labels.forEach(label => {
            //console.log(label.description)
            txt = txt + "</br>";
        });
        resp.send(txt);
    })
    .catch(err => {
        console.error('ERROR:', err);
    });
} )