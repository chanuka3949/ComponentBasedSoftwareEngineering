const mongoose = require('mongoose');
require('dotenv').config()

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connected to MongoDB Atlas: ${process.env.DB_NAME}`);
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
}

module.exports = connectToDatabase;