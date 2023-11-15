import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class AuthService {
  constructor(
    // instanciamos los objetos correspondientes para acceder a sus métodos
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUser(username);
    //el interrogante evita errores y en caso de no existir user o de no contener un password no rompe el programa
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    //id y username indican la información que JWT va a almacenar en el token
    const payload = { id: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
