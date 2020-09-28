import mongoose from 'mongoose';
import env from '../config/environment';

mongoose.Promise = global.Promise;

// eslint-disable-next-line no-unused-vars
const mongoUri = `mongodb://${env.dbName}:${env.key}@${env.dbName}.documents.azure.com:${env.cosmosPort}/${env.dbName}?ssl=true&replicaSet=globaldb`;
const localMongoUri = `mongodb+srv://${env.localUsername}:${env.localPassword}@gonkzonk-ytla5.azure.mongodb.net/test?retryWrites=true&w=majority`;

export default () => {
  return mongoose
    .connect(localMongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .catch(reason => {
      throw new Error(reason);
    });
};
