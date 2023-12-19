import { Breed } from 'src/breed/breed.entity';
import { User } from 'src/user/user.entity';
import { Yunuki } from 'src/yunuki/yunuki.entity';
import { EnvironmentDto } from './environment.dto';

//Almacenamos el entorno en el que está siendo ejecutado el programa, nos servirá para indicarle dónde conectar
const env = process.env.NODE_ENV;

// PEND
export const environment: EnvironmentDto = {
  typeOrmModuleOptions: {
    // Tipo de nuestra DB
    type: 'mysql',
    // Si nuestro 'env' es igual a development conectamos con localhost, si no lo es conectamos con una ip remota (ficticia en nuestro caso actualmente)
    host: env === 'development' ? 'localhost' : '182.192.56.7',
    // Puerto de nuestra DB
    port: 3306,
    // Usuario, password y database que correspondan a nuestra DB
    username: 'root',
    password: '1234',
    database: 'yunuki_db',
    // Entidades que representan las tablas de nuestra DB
    entities: [Breed, Yunuki, User],
    // PEND
    synchronize: true,
  },
};
