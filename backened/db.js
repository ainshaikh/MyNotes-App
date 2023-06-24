const mongoose = require ('mongoose');
const mongoURI = 'mongodb://0.0.0.0:27017'; 

const connectToMongo = async () => {
    try {
      await mongoose.connect(mongoURI);
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
    }
  };

module.exports = connectToMongo;