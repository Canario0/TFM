import * as dotenv from 'dotenv';
import { mongoMigrateCli } from 'mongo-migrate-ts';

dotenv.config();

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DATABASE,
} = process.env;

const uri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/`;

mongoMigrateCli({
  uri,
  database: MONGO_DATABASE,
  migrationsDir: 'migrations',
  migrationsCollection: 'migrations_changelog',
});
