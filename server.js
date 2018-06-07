var admin = require("firebase-admin");

var serviceAccount = require("softsyncdev-1409c-firebase-adminsdk-zd32w-cc43c05703.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://softsyncdev-1409c.firebaseio.com"
});

var adminapp = admin.initializeApp();

module.exports = {adminapp}