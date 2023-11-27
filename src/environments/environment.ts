import { DeadYunuki } from 'src/dead-yunuki/dead-yunuki.entity';
import { User } from 'src/user/user.entity';
import { Yunuki } from 'src/yunuki/yunuki.entity';
import { EnvironmentDto } from './environment.dto';

const env = process.env.NODE_ENV;

export const environment: EnvironmentDto = {
  typeOrmModuleOptions: {
    type: 'mysql',
    host: env === 'development' ? 'localhost' : '182.192.56.7',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'yunuki_db',
    entities: [DeadYunuki, Yunuki, User],
    synchronize: true,
  },
};
