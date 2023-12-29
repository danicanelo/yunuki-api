import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CreateYunukiDto } from './dto/create-yunuki.dto';
import { Yunuki } from './yunuki.entity';

// El decorador @Injectable permite que usemos la clase YunukisService como dependencia. Esto nos servirá para hacer uso de ella como servicio
@Injectable()
export class YunukisService {
  constructor(
    // Instanciamos dos objetos que actúen como repositorios de sus respectivos tipos (Yunuki y User). Para ello primero inyectamos sus clases
    @InjectRepository(Yunuki) private yunukiRepository: Repository<Yunuki>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // Método para crear yunukis. Recibe dos parámetros enviados por el controlador: un objeto de tipo CreateYunukiDto que debe contener los valores adecuados para la creación del yunuki (name y breed), y un string que contiene el username
  async createYunuki(yunuki: CreateYunukiDto, username: string) {
    try {
      // Haciendo uso del username buscamos con el método getAliveYunuki (establecido más abajo) si el usuario está cuidando de un yunuki ahora mismo. Si es así lo retornamos finalizando la función. (Esto es debido a que, para crear un yunuki, es necesario que no haya ninguno vivo en el momento de la creación. Por lo tanto, si lo hay, finalizamos la función sin llegar a crearlo)
      const aliveYunuki = await this.getAliveYunuki(username);
      return aliveYunuki;
      // En caso de que no se haya obtenido un yunuki vivo, capturamos el "error" y lo utilizamos para crear el nuevo yunuki
    } catch (e) {
      const newYunuki = this.yunukiRepository.create(yunuki);
      // Buscamos y almacenamos el usuario actualmente conectado, si no lo encontrase se lanza una excepción y la función finaliza
      const user = await this.userRepository.findOne({
        where: {
          username,
        },
      });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      // Si todo ha ido correctamente, se asigna el usuario encontrado al campo user del nuevo yunuki, esto es debido a que la tabla 'yunuki' de la base de datos es la que contiene las relaciones (las FK), tanto con 'user' como con 'breed'
      newYunuki.user = user;
      // Salvamos el yunuki creado en la base de datos y lo retornamos
      await this.yunukiRepository.save(newYunuki);
      return newYunuki;
    }
  }

  // La función getAliveYunuki nos servirá para obtener el yunuki actual asociado al usuario. Recibe un string con el username, enviado por el controlador
  async getAliveYunuki(username: string) {
    /// El método findOne recibe como parámetro un objeto con dos pares clave-valor (where y relations), donde 'where' funciona a modo de claúsula WHERE en SQL, buscando el usuario cuyo username coincide con el recibido, y relations funciona añadiendo al objeto que retorne (el usuario encontrado) todas las entidades de la tabla yunuki que éste posea. Almacenamos el resultado
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
      relations: ['yunukis', 'yunukis.breed'],
    });
    if (!user) {
      throw new NotFoundException('El usuario no ha sido encontrado');
    }

    // De entre todos los yunukis que posea el usuario, buscamos con el método find (que devolverá la primera coincidencia que encuentre) si hay alguno cuya propiedad 'dead' esté a null (lo que significará que aún no habrá muerto y que, por lo tanto, será el único yunuki vivo dado que un usuario solo puede cuidar a un yunuki a la vez)
    const aliveYunuki = user.yunukis.find((yunuki) => yunuki.dead === null);

    //Si no encuentra un yunuki vivo, lanzamos una excepción que informe de ello y la función finaliza
    if (!aliveYunuki) {
      throw new NotFoundException(
        'El usuario no está cuidando un yunuki ahora mismo',
      );
    }

    // Si todo va correctamente retornamos el yunuki vivo
    return aliveYunuki;
  }

  // La función getDeadYunukis nos servirá para obtener todos los yunukis fallecidos asociados al usuario. Recibe un string con el username enviado por el controlador. Su funcionamiento inicial, buscando y almacenando el usuario actual, es idéntico al de getAliveYunuki
  async getDeadYunukis(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
      relations: ['yunukis'],
    });
    if (!user) {
      throw new NotFoundException('El usuario no ha sido encontrado');
    }

    // El método filter crea un nuevo array con las coincidencias que encuentre, en nuestro caso le indicamos que busque y almacene los yunukis cuyo campo 'dead' esté definido (es decir, justamente lo contrario de lo que hacemos más arriba con el método find, en el que buscamos precisamente al único yunuki cuyo 'dead' sea null)
    const deadYunukis = user.yunukis.filter((yunuki) => yunuki.dead);

    // Retornamos el array de yunukis fallecidos
    return deadYunukis;
  }

  // Las tres funciones siguientes (feed, clean y sleep) hacen lo mismo (setear a 0 el valor de su campo correspondiente), por lo que describiremos simplemente la primera. Recibe el nombre de usuario que el controlador le ha enviado.
  async feed(username: string) {
    // Haciendo uso de la propia getAliveYunuki de esta misma clase buscamos y almacenamos el yunuki actual
    const yunuki = await this.getAliveYunuki(username);
    // Seteamos su propiedad hunger a 0
    yunuki.hunger = 0;
    // Guardamos los cambios en la base de datos
    await this.yunukiRepository.save(yunuki);
    // Devolvemos el yunuki actualizado
    return yunuki;
  }

  async clean(username: string) {
    const yunuki = await this.getAliveYunuki(username);
    yunuki.dirt = 0;
    await this.yunukiRepository.save(yunuki);
    return yunuki;
  }

  async sleep(username: string) {
    const yunuki = await this.getAliveYunuki(username);
    yunuki.tiredness = 0;
    await this.yunukiRepository.save(yunuki);
    return yunuki;
  }

  // Esta función se encargará de actualizar los valores del yunuki vivo haciendo que aumenten su hambre, suciedad y sueño con el paso del tiempo, así como de hacer que muera si su edad (o alguna de las dichas stats) ha llegado a su fin. Para ello hacemos uso del sistema automatizado 'cron' (command run on notice) gracias a la librería schedule de NestJS. Este decorador @Cron nos permite indicar un lapso temporal bajo el cual se ejecutará regularmente la función que contiene
  @Cron('*/60 * * * *') // Añadir un * para convertirlo en segundos en vez de minutos
  async updateYunukis() {
    // Almacenamos la fecha actual, nos servirá para compararla con la fecha de nacimiento de cada yunuki y así determinar su edad
    const actualDate = new Date();
    // Almacenamos un array con todos los yunukis existentes, de todos los usuarios. Indicamos que cada uno de ellos contenga también las propiedades de su raza asociada
    let yunukis = await this.yunukiRepository.find({ relations: ['breed'] });
    // Lo recorremos con la función map y le indicamos que, por cada elemento (yunuki) que encuentre, ejecute las siguiente instrucciones
    yunukis = yunukis.map((yunuki) => {
      // Llamamos a oldYunuki, establecida más abajo, pasándole como parámetros el yunuki y la fecha actual. La función se encargará de hacer que el yunuki muera si su edad ha llegado a su fin, se detalla su funcionamiento junto a ella.
      this.oldYunuki(yunuki, actualDate);
      // Actualiza los puntos de hambre del yunuki haciendo uso del método getNewValue establecido más abajo, en el que se explica su funcionamiento en detalle. Le pasamos dos valores: los puntos actuales y un valor de referencia que determina cuántos puntos puede subir dentro de un rango aleatorio. Hacemos lo mismo con la suciedad y el cansancio
      yunuki.hunger = this.getNewValue(
        yunuki.hunger,
        yunuki.breed.hunger_points,
      );
      yunuki.dirt = this.getNewValue(yunuki.dirt, yunuki.breed.dirt_points);
      yunuki.tiredness = this.getNewValue(
        yunuki.tiredness,
        yunuki.breed.tiredness_points,
      );
      // Con sus valores actualizados retornamos el yunuki
      return yunuki;
    });
    // Una vez actualizados los valores de todos los yunukis, actualizamos el repositorio con ellos
    this.yunukiRepository.save(yunukis);

    // Recorremos los yunukis con el fin de obtener y almacenar aquellos cuyo hambre, suciedad o cansancio haya superado el valor límite de 10, lo cual significará que deben morir. Para ello hacemos uso del método filter
    const deadYunukis = yunukis.filter((yunuki) => {
      return yunuki.hunger >= 10 || yunuki.dirt >= 10 || yunuki.tiredness >= 10;
    });
    // Recorremos los yunukis obtenidos y por cada uno de ellos ejecutamos el método ripYunuki establecido más abajo, que se encarga de "matar" al yunuki
    deadYunukis.map((yunuki) => {
      this.ripYunuki(yunuki);
    });
  }

  // Recibiendo un yunuki y la fecha actual, oldYunuki se encarga de restar la edad actual a la edad de nacimiento del yunuki
  private oldYunuki(yunuki: Yunuki, date: Date) {
    // Almacenamos la diferencia entre la fecha actual y la fecha de nacimiento del yunuki
    const diff = date.getTime() - yunuki.birth.getTime();
    // Convertimos el valor obtenido a días
    const days = diff / (1000 * 60 * 60 * 24);
    // Si se superan los 14 días, se llama a la función que mata al yunuki
    if (days > 14) {
      this.ripYunuki(yunuki);
    }
  }

  // Utilizamos este método para "matar" al yunuki recibido por parámetro. Para ello simplemente seteamos su propiedad 'dead', dado que es el hecho de asignarle la fecha de su muerte lo que lo diferencia de un yunuki vivo (si no tuviera fecha de muerte significaría que está vivo). Una vez hecha la operación, actualizamos el yunuki
  private ripYunuki(yunuki: Yunuki) {
    yunuki.dead = new Date();
    this.yunukiRepository.save(yunuki);
  }

  // Utilizamos este método para aumentar los puntos de hambre, suciedad y cansancio de los yunukis.
  private getNewValue(oldValue: number, maxValue: number) {
    // Utilizamos getIncrease, establecido más abajo, que se encargaŕa de obtener un valor aleatorio en base al maxValue recibido. Lo sumamos a oldValue y almacenamos el resultado
    const newValue = oldValue + this.getIncrease(maxValue);
    // Math.min devuelve el valor más pequeño entre newValue y 10, es una forma de asegurarnos de que el resultado nunca va a ser superior a 10, que es el límite máximo de puntos que queremos para las stats de los yunukis
    return Math.min(newValue, 10);
  }

  //Este método obtiene un valor aleatorio en base al maxValue recibido
  private getIncrease(maxValue: number) {
    // Dentro del paréntesis: Math.random genera un número aleatorio entre 0 y 1, a maxValue le restamos uno y lo multiplicamos por el random generado, tras lo que sumaremos 1 al resultado total. Lo hacemos así para que el rango siempre sea entre 1 y el maxValue recibido, de lo contrario el resultado sería un rango inmediatamente inferior (entre 0 y un número menos de maxValue). Retornamos el resultado
    return Math.floor(Math.random() * (maxValue - 1)) + 1;
  }
}
