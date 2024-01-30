const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json')
/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */



// Connection URL to the local MongoDB instance
// Insert the item
// Import the required modules
const MongoClient = require('mongodb').MongoClient;
// Connection URL to the local MongoDB instance
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'rebootusers';
// Collection Name
const collectionName = 'user';
// Connect to the MongoDB server

function processGratitude(currentUser){
 MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.error('Error while connecting to the database:', err);
    return;
  }
  const db = client.db(dbName);
  const collection = db.collection(collectionName);


// Create the object to insert
  const name="ReBott";
	
  const found = false;
  found = collection.find({"name":currentUser}).limit(1).size();
  console.log("Found");
  console.log(found); 
// Insert the item
 // collection.insertOne(item, (err, result) => {
 //     console.error('Error while inserting item:', err);
 //   } else {
 //      console.log('Item inserted successfully.');
 //   }
// Close the connection
    client.close();
 
 });
}

processGratitude("ReBot");





/**
 * Load or request or authorization to call APIs.
 *
 */
/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function main(){
  const calendar = google.calendar({version: 'v3', auth:"AIzaSyBMJAv0f4nnCgOCOF7cc3B7BJyUzH7g-M0"});

  const res = await calendar.events.list({
    calendarId:encodeURIComponent('cc2e7635be11d7c590905b88a58b1aa586be0682c7a35df56a806f4712a9d111@group.calendar.google.com'),
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });

  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log('No upcoming events found.');
    return;
  }
  console.log('Upcoming 10 events:');
  events.map((event, i) => {
    const start = event.start.dateTime || event.start.date;
    console.log(`${start} - ${event.summary}`);
  });
}

main();
