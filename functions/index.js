//import { firestore } from 'firebase-admin';

const functions = require('firebase-functions');
// const testvision    = require("./vision");

// exports.myvision = functions.https.onRequest((req,resp) => {
//     testvision.handler("gs://visiontest-fb8ef.appspot.com/images/vNXSW9fTfmfG05Nyp1GbRFWpvtM2/target.png",resp);
// })


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.sampleFunction = functions.https.onRequest((req,resp)=> {
    response.setHeader('Access-Control-Allow-Origin', config.authDomain);
    resp.status(200).send("<h1>Hello</h1>");
});

exports.myvision = functions.https.onRequest((request, response) => {
    // Imports the Google Cloud client library
     const vision = require('@google-cloud/vision');
     const client = new vision.ImageAnnotatorClient();
     const imageUri = request.body.url;
     client.labelDetection({image:{source:{ imageUri : imageUri} }}).then(function(results){
        
        const labels = results[0].labelAnnotations;
        var txt = "";
        labels.forEach(function(label){
            txt = txt + "</br>" + label.description;
            });
        response.setHeader('Access-Control-Allow-Origin', config.authDomain);
        response.send(txt);                
        }).catch((error)=>{txt=error});
    }) ;
