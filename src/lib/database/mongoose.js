const mongoose = require('mongoose');

const connection = {};

const connectToDatabase = async () => {
  const mongodbURI = process.env.MONGODB_URL;
  if (connection.isConnected) {
    console.log("Use existing connection");
    return;
  }
  console.log("Ready to connect in index.js");
  const db = await mongoose.connect(mongodbURI);
  connection.isConnected = db.connections[0].readyState;
  console.log("Connected with DB");
};

module.exports = connectToDatabase;
