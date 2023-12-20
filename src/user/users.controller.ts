import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

// Indicamos qué ocurrirá al solicitar el end-point 'users'. En este caso no lo protegemos con la guardia porque hay endpoints como 'register' que no nos interesa proteger
@Controller('users')
// Creamos la clase que actuará como controlador del módulo
export default class UsersController {
  // El constructor automáticamente instancia un objeto de tipo UsersService para que podamos conectar con el servicio procedente
  constructor(private readonly usersService: UsersService) {}

  // Al hacer una solicitud HTTP POST a la ruta 'users/register': 1) Se ejecuta una función que obtiene como argumento un objeto de tipo CreateUserDto, del que se espera que contenga los valores necesarios (obtenidos del cuerpo de la solicitud) para el registro del usuario (username, email y password). 2) Llama a la función homónima del servicio pasándole el objeto con los valores, ésta se encargará de introducir el registro en la base de datos. 3) Devuelve el usuario creado
  @Post('register')
  createUser(@Body() newUser: CreateUserDto): Promise<User> {
    return this.usersService.createUser(newUser);
  }

  // Al hacer una solicitud HTTP GET a la ruta 'users/me': 1) Se ejecuta una función que obtiene como argumento la solicitud. 2) Llama a la función homónima del servicio pasándole como argumento el nombre de usuario, obtenido de la solicitud 3) Devuelve el usuario encontrado, que debería ser el usuario conectado en este momento. Aquí sí que protegemos el endpoint con una guardia dado que la operación pide datos a los que no debería poder acceder un usuario no registrado
  @UseGuards(AuthGuard)
  @Get('me')
  getUser(@Request() request: Request): Promise<User> {
    return this.usersService.getUser(request['user'].username);
  }
}

/*@Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }*/ //POSIBLEMENTE INNECESARIO
