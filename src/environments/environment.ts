import { DeadYunuki } from 'src/dead-yunukis/dead-yunuki.entity';
import { EnvironmentDto } from './environment.dto';

const env = process.env.NODE_ENV;

export const environment: EnvironmentDto = {
  typeOrmModuleOptions: {
    type: 'mysql',
    host: env === 'development' ? 'localhost' : '182.192.56.7',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'test',
    entities: [DeadYunuki],
    synchronize: true,
  },
};
