const mongoose = require('mongoose');
require('dotenv').config();

const database = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.zwulmy5.mongodb.net/');
    console.log('Db connect');
  } catch (error) {
    console.error(error);
  }
}

database();

module.exports = database; 