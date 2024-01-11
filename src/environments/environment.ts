import { Breed } from 'src/breed/breed.entity';
import { User } from 'src/user/user.entity';
import { Yunuki } from 'src/yunuki/yunuki.entity';
import { EnvironmentDto } from './environment.dto';

//Almacenamos el entorno en el que está siendo ejecutado el programa, nos servirá para indicarle dónde conectar
const env = process.env.NODE_ENV;

// Creamos un objeto de tipo EnvironmentDTO definido en nuestro environment.dto.ts en el que indicamos los datos de conexión:
export const environment: EnvironmentDto = {
  typeOrmModuleOptions: {
    // Tipo de nuestra DB
    type: 'mysql',
    // Si nuestro 'env' es igual a development conectamos con localhost, si no lo es conectamos con una ip remota (ficticia en nuestro caso actualmente)
    host: env === 'development' ? 'localhost' : 'xxx.xxx.xx.x',
    // Puerto de nuestra DB (MODIFICAR A CONVENIENCIA)
    port: 3306,
    // Usuario, password y database que correspondan a nuestra DB (MODIFICAR A CONVENIENCIA)
    username: 'root',
    password: '1234',
    database: 'yunuki_db',
    // Entidades que representan las tablas de nuestra DB
    entities: [Breed, Yunuki, User],
    // Establecemos synchronize a true para crear automáticamente las tablas y relaciones en la base de datos si no existen. Esto es útil para el proceso de desarrollo y testeo (motivo por el cual lo dejo activado, para que el testeo resulte cómodo). Una vez la aplicación fuese lanzada a producción sería conveniente establecerlo en false.
    synchronize: true,
  },
};
