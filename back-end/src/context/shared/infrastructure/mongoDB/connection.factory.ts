import { MongoClient } from 'mongodb';
import MongoConfig from './mongoConfig';

export class MongoDBConnectionFactory {
    private static instance: MongoClient;

    static async createConnection(config: MongoConfig) {
        let client = this.instance;
        if (!client) {
            client = await this.createClient(config);
            this.instance = client;
        }
        return client;
    }

    private static async createClient(config: MongoConfig) {
        const client = new MongoClient(config.uri, {
            authSource: 'admin',
        });
        await client.connect();
        return client;
    }
}
