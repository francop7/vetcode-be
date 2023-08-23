const mongoose = require('mongoose');
require('dotenv').config();

const database = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test5');
    console.log('Db connect');
  } catch (error) {
    console.error(error);
  }
}

database();

module.exports = database; 