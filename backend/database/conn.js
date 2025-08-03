const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://kerlen:admin123@clusterjs.zgchwjs.mongodb.net/Projeto-WEB2?retryWrites=true&w=majority&appName=ClusterJS',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar no MongoDB:', error);
  }
};

module.exports = connectDB;
