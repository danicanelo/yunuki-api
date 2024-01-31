import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  // Nuestro servicio de autenticación ofrece un único método 'login' que recibe un nombre de usuario y una contraseña
  async login(username: string, pass: string): Promise<any> {
    // Almacenamos en un objeto el usuario que está tratando de hacer login haciendo uso del nombre de usuario recibido como primer parámetro de 'login' y enviándoselo a la función getUser del UsersService, servicio al que podemos acceder tras haber instanciado un objeto de su tipo automáticamente en el constructor. Indicamos await para que espere a obtener el usuario antes de proceder, ya que es imprescindible en los siguientes pasos
    const user = await this.usersService.getUser(username);
    // Si la contraseña que hemos recibido como segundo parámetro de 'login' no coincide con la del usuario obtenido se lanza una excepción de No Autorizado y la función detiene su ejecución. El interrogante tras 'user' evita que el programa se rompa si por la razón que fuese 'user' no dispusiera de una propiedad 'password' o ésta fuese nula o indefinida.
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    // Creamos un objeto que contendrá dos pares clave-valor con el id y el nombre de usuario del usuario obtenido. Estos serán los datos que "encapsularemos" en un token en el siguiente paso
    const payload = { id: user.id, username: user.username };
    // Con el método signAsync de JwtService "firmamos" los datos (id y usuario) generando el token que los contendrá (en forma cifrada) y que retornaremos al controlador
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
