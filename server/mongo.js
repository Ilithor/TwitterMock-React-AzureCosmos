const mongoose = require('mongoose');
const env = require('./environment/environment');

mongoose.Promise = global.Promise;

const mongoUri = `mongodb://${env.dbName}:${env.key}@${env.dbName}.documents.azure.com:${env.cosmosPort}/${env.dbName}?ssl=true&replicaSet=globaldb`;
const localMongoUri = `mongodb+srv://${env.localUsername}:${env.localPassword}@gonkzonk-ytla5.azure.mongodb.net/test?retryWrites=true&w=majority`;

function connect() {
  return mongoose.connect(localMongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
}

module.exports = {
  connect,
  mongoose
};
