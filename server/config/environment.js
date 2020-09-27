import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.SOCMON_DBNAME;
const key = process.env.SOCMON_KEY;
const cosmosPort = process.env.SOCMON_COSMOSPORT;
const localUsername = process.env.SOCMON_LOCALUSERNAME;
const localPassword = process.env.SOCMON_LOCALPASSWORD;
const jwt = process.env.SOCMON_JWT;

if (!dbName || !key || !jwt) {
  const requiredVariables = {
    SOCMON_DBNAME: dbName + '',
    SOCMON_JWT: jwt + '',
    SOCMON_KEY: key + '',
  };
  throw new Error(
    `Required env vars were missing: ${JSON.stringify(requiredVariables)}`
  );
}
export default {
  dbName,
  key,
  cosmosPort,
  localUsername,
  localPassword,
  jwt,
};
