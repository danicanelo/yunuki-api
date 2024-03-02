import { Breed } from 'src/breed/breed.entity';
import { User } from 'src/user/user.entity';
import { Yunuki } from 'src/yunuki/yunuki.entity';
import { EnvironmentDto } from './environment.dto';

const env = process.env.NODE_ENV;

export const environment: EnvironmentDto = {
  typeOrmModuleOptions: {
    type: 'mysql',
    host: env === 'development' ? 'localhost' : 'xxx.xxx.xx.x',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'yunuki_db',
    entities: [Breed, Yunuki, User],
    synchronize: true,
  },
};
