import { Module } from '@nestjs/common';
import { MongoDBConnectionFactory } from './infrastructure/mongoDB/connection.factory';
import { ConfigService } from '@nestjs/config';
import { LOGGER } from './domain/logger';
import PinoLogger from './infrastructure/pinoLogger';

@Module({
    imports: [],
    providers: [
        {
            provide: LOGGER,
            useClass: PinoLogger,
        },
        MongoDBConnectionFactory,
        {
            provide: 'MONGO_CONNECTION',
            useFactory: async (configService: ConfigService) => {
                const databaseConfig = configService.get('database');
                return await MongoDBConnectionFactory.createConnection({
                    uri: `mongodb://${databaseConfig.user}:${databaseConfig.password}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.database}
`,
                });
            },
            inject: [ConfigService],
        },
    ],
    exports: [LOGGER, 'MONGO_CONNECTION'],
})
export class SharedModule {}
