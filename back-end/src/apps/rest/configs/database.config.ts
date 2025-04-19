import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
    host: process.env.MONGO_HOST,
    port: Number(process.env.MONGO_PORT) || 27017,
    database: process.env.MONGO_DATABASE,
    user: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
}));
