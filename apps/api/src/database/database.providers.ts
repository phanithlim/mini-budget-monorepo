import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { DATA_SOURCE } from './constants';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('DB_HOST')!,
        port: configService.get<number>('DB_PORT')!,
        username: configService.get<string>('DB_USERNAME')!,
        password: configService.get<string>('DB_PASSWORD')!,
        database: configService.get<string>('DB_NAME')!,
        ssl: { rejectUnauthorized: false },
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: false,
        poolSize: 10,
      });

      return dataSource.initialize();
    },
  },
];
