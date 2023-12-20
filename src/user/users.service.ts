import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
  createUser(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  // Método para obtener todos los usuarios
  getUsers() {
    return this.userRepository.find();
  }

  //Método para obtener un usuario. Recibe un username.
  getUser(username: string) {
    // El método findOne recibe como parámetro un objeto con dos pares clave-valor (where y relations), donde 'where' funciona a modo de claúsula WHERE en SQL, buscando el usuario cuyo username coincide con el recibido, y relations funciona añadiendo al objeto que retorne (el usuario encontrado) todas las entidades de la tabla yunuki que posea
    return this.userRepository.findOne({
      where: {
        username,
      },
      relations: ['yunukis'],
    });
  }

  getUserWithRelations(username: string) {
    return this.userRepository.findOne({
      where: {
        username,
      },
      relations: ['deadyunukis', 'yunuki'],
    });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  updateUser(id: number, user: UpdateUserDto) {
    return this.userRepository.update({ id }, user);
  }

  private async populate() {
    const total = await this.userRepository.count();
    if (total === 0) {
      this.createUser({
        username: 'yunukiDemo',
        email: 'patata@patata.com',
        password: '1234',
      });
    }
  }
}
