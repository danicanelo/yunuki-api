import { EnvironmentDto } from './environment.dto';

export const environment: EnvironmentDto = {
  typeOrmModuleOptions: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    //synchronize: process.env.NODE_ENV === 'development',
    synchronize: true,
    ssl: true,
    extra: {
      ssl: true,
    },
  },
};
