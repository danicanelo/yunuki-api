import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

// El decorador @Injectable permite que podamos usar la clase UsersService como dependencia. Esto nos servirá para hacer uso de ella como servicio.
@Injectable()
export class UsersService {
  constructor(
    // Instanciamos un objeto que actúe como un repositorio de tipo User. Para ello inyectamos primero la clase Breed
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    // BORRAR AL FINAL
    this.populate();
  }

  // Método para crear un usuario. Recibe un objeto de tipo CreateUserDto. Devuelve el usuario creado.
  async createUser(user: CreateUserDto) {
    // Pasamos el objeto user a la función userExists establecida más abajo, nos devolverá true o false, indicando que el usuario introducido ya existe o, por el contrario, está disponible.
    const userExists = await this.userExists(user);
    // Si ha devuelto true, retornamos null al controlador.
    if (userExists) {
      return null;
    }
    // Si ha devuelto false, creamos al nuevo usuario haciendo uso del método correspondiente para ello y lo almacenamos en una variable que poder retornar al controlador.
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  // Esta función se encarga de determinar si un usuario existe en nuestra base de datos o no. Recibe un objeto de tipo CreateUserDto y devuelve true o false.
  private userExists(user: CreateUserDto) {
    // Haciendo uso de la función exist indicamos que busque en el repositorio de usuarios si existe algún registro cuyo username o cuyo email coincida con el del usuario que está tratando de registrarse (que es lo que contiene el objeto pasado por parámetro). Para esto pasamos por parámetro un objeto con un par clave-valor donde la clave es where (que funciona a modo de cláusula WHERE en SQL, buscando coincidencias) y el valor es un array que contiene dos objetos, que son las dos condiciones a valorar: el username y el email.
    return this.userRepository.exist({
      where: [
        {
          username: user.username,
        },
        {
          email: user.email,
        },
      ],
    });
  }

  //Método para obtener un usuario. Recibe un username.
  getUser(username: string) {
    // El método findOne funciona de manera similar a exist, pero en este caso le pasamos dos pares clave-valor, donde 'relations' cumple la función de agregar al objeto devuelto todos los yunukis que el usuario posea.
    return this.userRepository.findOne({
      where: {
        username,
      },
      relations: ['yunukis'],
    });
  }

  // Esta función tiene motivos de testing y pruebas, sirve para generar usuarios automáticamente cuando se crea la base de datos, permitiéndonos omitir el proceso de registro al probar la aplicación.
  private async populate() {
    const total = await this.userRepository.count();
    if (total === 0) {
      this.createUser({
        username: 'yunukiDemo',
        email: 'testing@testing.com',
        password: '123456',
      });
    }
  }
}
