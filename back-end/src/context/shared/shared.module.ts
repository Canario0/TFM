import { Module } from '@nestjs/common';
import { MongoDBConnectionFactory } from './infrastructure/mongoDB/connection.factory';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  providers: [
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
  exports: ['MONGO_CONNECTION'],
})
export class SharedModule {}
