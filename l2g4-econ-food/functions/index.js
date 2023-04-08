const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

exports.deleteListingWhenQuantityIsZero = functions.firestore.document('listings/{listingId}')
  .onUpdate(async (change, context) => {
    const newValue = change.after.data().quantity;

    if (newValue === 0) {
      const listingRef = db.collection('listings').doc(context.params.listingId);
      await listingRef.delete();
      console.log('Listing deleted successfully!');
    }
  });



// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
